"use strict";
// import fs from "fs";
exports.__esModule = true;
var configuration_1 = require("./api/configuration");
var config = configuration_1["default"].fromFile("./config.json");
console.log(config);
