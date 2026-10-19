import fs from "node:fs";

const path = new URL("../app/lib/anatomy-data.ts", import.meta.url);
let s = fs.readFileSync(path, "utf8");
const ids = ["stomach", "spleen", "thyroid", "bladder", "gallbladder", "ear"];

for (const id of ids) {
  const re = new RegExp(`(id: "${id}"[\\s\\S]*?)illustrated: false,\\s*hasModel: false,`);
  if (!re.test(s)) {
    console.log("miss", id);
    continue;
  }
  s = s.replace(re, `$1illustrated: true,\n    imageExt: "jpg",\n    hasModel: false,`);
  console.log("fixed", id);
}

fs.writeFileSync(path, s);
