const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "cache","cache.json");
exports.saveCache = (data) => {
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("cache saved");
    }
  });
};
exports.getCache = () => {
  return fs.promises.readFile(filePath);
};
