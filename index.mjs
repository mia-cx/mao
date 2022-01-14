import fs from "fs";

const config = JSON.parse(fs.readFileSync("./config.json"));

console.log(config);
