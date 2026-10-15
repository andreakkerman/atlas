(function (global) {
  "use strict";
  const clamp = value => Math.max(0, Math.min(1, value));
  function sample(depth, world, x, y) {
    const px = Math.max(0, Math.min(depth.width - 1, Math.round(x / world.width * (depth.width - 1))));
    const py = Math.max(0, Math.min(depth.height - 1, Math.round(y / world.height * (depth.height - 1))));
    return depth.data[(py * depth.width + px) * 4] / 255;
  }
  function visibility(actor, scene) { return clamp(1 + (actor - scene) / 0.01); }
  // Owned by the decoded asset cache. Consumers share the readback and release
  // their references; invalidating the image also invalidates this WeakMap key.
  const prepared = new WeakMap();
  function prepare(image) {
    if (prepared.has(image)) return prepared.get(image);
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d', {willReadFrequently:true});
    ctx.drawImage(image, 0, 0);
    const result = {width:canvas.width, height:canvas.height, data:ctx.getImageData(0,0,canvas.width,canvas.height).data};
    canvas.width = canvas.height = 0;
    prepared.set(image, result);
    return result;
  }
  global.AtlasSpriteDepth = {sample, visibility, prepare};
})(window);
