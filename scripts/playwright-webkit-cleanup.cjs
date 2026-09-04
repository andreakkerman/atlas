// Windows WebKit subprocesses can inherit browser pipes. After Playwright.exe
// exits, those handles can keep Node's `close` event pending indefinitely even
// though the browser and all tests have finished. Release only the exited
// browser's local pipe streams; never terminate a live browser or subprocess.
if (process.platform === "win32") {
  const childProcess = require("node:child_process");
  const marker = Symbol.for("atlas.webkitExitPipeCleanup");
  if (!childProcess[marker]) {
    childProcess[marker] = true;
    const spawn = childProcess.spawn;
    childProcess.spawn = function (command, ...args) {
      const child = spawn.call(this, command, ...args);
      if (/[/\\]webkit-[^/\\]+[/\\]Playwright\.exe$/i.test(String(command))) {
        child.once("exit", () => {
          for (const stream of child.stdio || []) stream?.destroy?.();
        });
      }
      return child;
    };
  }
}
