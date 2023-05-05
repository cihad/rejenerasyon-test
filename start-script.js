import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const astroFile = path.resolve("node_modules/astro/astro.js");

const scriptContents = fs.readFileSync(astroFile).toString();

const importStr =  `import "${__dirname}/override-fs.js";`;

if (process.argv[2] == "remove") {
  if (scriptContents.includes(importStr)) {
    const sliceIndex = scriptContents.indexOf(importStr);
    const overridedAstro = [
      scriptContents.slice(0, sliceIndex),
      scriptContents.slice(sliceIndex + importStr.length)
    ].join("\n");
    fs.writeFileSync(astroFile, overridedAstro);
  }

  fs.readdirSync(path.resolve("src/assets")).forEach(file => {
    if (file.startsWith("_") && [".jpg", ".png", ".jpeg"].includes(path.extname(file))) {
      fs.renameSync(path.resolve("src/assets", file), path.resolve("src/assets", file.slice(1)))
    }
  })

} else {
  
  const searchQuery = "'use strict';\n";
  const sliceIndex = scriptContents.indexOf(searchQuery) + searchQuery.length;
  
  
  if (!scriptContents.includes(importStr)) {
    const overridedAstro = [
      scriptContents.slice(0, sliceIndex),
      importStr,
      scriptContents.slice(sliceIndex)
    ].join("\n");
    
    fs.writeFileSync(astroFile, overridedAstro);
  }

  fs.readdirSync(path.resolve("src/assets")).forEach(file => {
    if (!file.startsWith("_") && [".jpg", ".png", ".jpeg"].includes(path.extname(file))) {
      fs.renameSync(path.resolve("src/assets", file), path.resolve("src/assets", "_" + file))
    }
  })
}
