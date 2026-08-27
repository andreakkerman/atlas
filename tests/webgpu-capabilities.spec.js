// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();

test.describe("shared WebGPU capability state", () => {
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
