// import fs from "fs";

import Configuration from "./api/configuration";

const config = Configuration.fromFile("./config.json");

console.log(config);
