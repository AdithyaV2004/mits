const fs = require("fs/promises");

async function totalLength(files) {
  let total = 0;
  files.forEach(async (file) => {
    const data = await fs.readFile(file, "utf-8");
    total += data.length;
  });
  return total;
}

totalLength(["a.txt", "b.txt", "c.txt"]).then(console.log); // 0 ???