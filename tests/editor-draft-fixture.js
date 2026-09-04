const fs = require("fs");
const path = require("path");

// HTTP editor tests autosave even when they never press Apply. Preserve the
// user's optional drafts and close the page before restoring disk fixtures.
function preserveEditorDrafts(test, root) {
  const capture = () => {
    const files = fs.readdirSync(path.join(root, "Levels"), { withFileTypes: true })
      .filter(entry => entry.isDirectory() && /^LVL-\d+$/.test(entry.name))
      .flatMap(entry => [
        path.join(root, "Levels", entry.name, "level.js"),
        path.join(root, "Levels", entry.name, "editor.draft.json")
      ]);
    return files.map(file => [file, fs.existsSync(file) ? fs.readFileSync(file) : null]);
  };
  const restore = entries => {
    for (const [file, original] of entries) {
      if (original === null) {
        if (fs.existsSync(file)) fs.unlinkSync(file);
      } else if (!fs.existsSync(file) || !fs.readFileSync(file).equals(original)) {
        fs.writeFileSync(file, original);
      }
    }
  };
  const suiteSnapshot = capture();
  const snapshots = new Map();
  test.beforeEach(async ({ page }) => {
    snapshots.set(page, capture());
  });
  test.afterEach(async ({ page }) => {
    await page.close();
    restore(snapshots.get(page) || []);
    snapshots.delete(page);
  });
  test.afterAll(() => restore(suiteSnapshot));
}
module.exports = { preserveEditorDrafts };
