// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();

test.describe("shared WebGPU capability state", () => {
  test('a cancelled handoff cannot destroy a device reclaimed by a shared renderer',async({page})=>{
    await page.goto(gameUrl);
    const result=await page.evaluate(async()=>{
      let finish,lose,destroyed=0,requested=false,releaseAllowed=true;
      const device={lost:new Promise(r=>lose=r),destroy(){destroyed++;lose({reason:'destroyed'});}};
      Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:()=>{requested=true;return new Promise(r=>finish=r);}})}});
      const broker=AtlasWebGPUCapabilities,pending=broker.requestDevice('cinematic');
      while(!requested)await new Promise(r=>setTimeout(r,0));
      const release=broker.releaseDevice(()=>releaseAllowed);releaseAllowed=false;finish(device);await pending;await release;
      const retained=destroyed===0&&broker.snapshot().deviceReady;
      await broker.releaseDevice();return {retained,destroyed};
    });
    expect(result).toEqual({retained:true,destroyed:1});
  });
  test('release waits for a pending device and clears the consumed adapter',async({page})=>{
    await page.goto(gameUrl);
    const result=await page.evaluate(async()=>{
      let finish,lose,destroyed=0,requested=false;
      const device={lost:new Promise(r=>lose=r),destroy(){destroyed++;lose({reason:'destroyed'});}};
      Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:()=>{requested=true;return new Promise(r=>finish=r);}})}});
      const broker=AtlasWebGPUCapabilities,pending=broker.requestDevice('test');
      while(!requested)await new Promise(r=>setTimeout(r,0));
      const release=broker.releaseDevice();finish(device);await pending;await release;
      return {destroyed,snapshot:broker.snapshot()};
    });
    expect(result.destroyed).toBe(1);expect(result.snapshot.deviceReady).toBe(false);expect(result.snapshot.adapterReady).toBe(false);
  });
  test("falls back from high-performance to a default adapter and reuses an Illustrated device", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      const requests = [];
      const device = { lost: new Promise(() => {}), addEventListener() {} };
      const adapter = { requestDevice: async () => device };
      Object.defineProperty(navigator, "gpu", { configurable: true, value: {
        requestAdapter: async (options) => { requests.push(options?.powerPreference || "default"); return options ? null : adapter; },
        getPreferredCanvasFormat: () => "bgra8unorm"
      } });
      window.__ATLAS_WEBGPU_SESSION__.adapter = null;
      window.__ATLAS_WEBGPU_SESSION__.device = null;
      window.__ATLAS_WEBGPU_SESSION__.attempts = [];
      const acquired = await window.AtlasWebGPUCapabilities.requestDevice("illustrated");
      const reused = await window.AtlasWebGPUCapabilities.requestDevice("voxel");
      return { requests, same: acquired === reused, snapshot: window.AtlasWebGPUCapabilities.snapshot() };
    });
    expect(result.requests).toEqual(["high-performance", "default"]);
    expect(result.same).toBe(true);
    expect(result.snapshot).toMatchObject({ deviceReady: true, initializedBy: "illustrated" });
  });

  test("distinguishes API, adapter, device, renderer capability, and pipeline failures", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      const api = window.AtlasWebGPUCapabilities.capabilityError("api-unavailable", "api");
      const adapter = window.AtlasWebGPUCapabilities.capabilityError("adapter-unavailable", "adapter");
      const device = window.AtlasWebGPUCapabilities.capabilityError("device-initialization-failed", "device");
      const capability = window.AtlasWebGPUCapabilities.capabilityError("renderer-capability-unavailable", "capability");
      const renderer = window.AtlasWebGPUCapabilities.capabilityError("renderer-initialization-failed", "renderer");
      let rejectedRequirement = null;
      try {
        window.AtlasWebGPUCapabilities.validateRendererRequirements(
          { features: new Set(), limits: {} },
          { requiredFeatures: ["texture-compression-bc"] },
          "voxel"
        );
      } catch (error) {
        rejectedRequirement = error.atlasWebGPUCategory;
      }
      return {
        categories: [api, adapter, device, capability, renderer].map((error) => error.atlasWebGPUCategory),
        rejectedRequirement
      };
    });
    expect(result.categories).toEqual(["api-unavailable", "adapter-unavailable", "device-initialization-failed", "renderer-capability-unavailable", "renderer-initialization-failed"]);
    expect(result.rejectedRequirement).toBe("renderer-capability-unavailable");
  });
});
