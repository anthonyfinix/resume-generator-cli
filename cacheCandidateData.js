const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "cache", "cache.json");
exports.saveCache = (data) => {
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("cache saved");
    }
  });
};
exports.getCache = async () => {
  let cache = await fs.promises.readFile(filePath);
  if (cache) return JSON.parse(cache);
  if (!cache) return {};
};
