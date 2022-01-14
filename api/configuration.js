"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs = require("fs");
var IConfiguration = /** @class */ (function () {
    function IConfiguration(token, admins) {
        this.token = token;
        this.admins = admins;
    }
    IConfiguration.prototype.getToken = function () {
        return this.token;
    };
    IConfiguration.prototype.setAdmins = function (admins) {
        this.admins = admins;
    };
    IConfiguration.prototype.getAdmins = function () {
        return this.admins;
    };
    IConfiguration.prototype.addAdmin = function (admin) {
        if (this.admins.includes(admin))
            throw new Error("admins already includes " + admin);
        this.admins.push(admin);
    };
    IConfiguration.prototype.removeAdmin = function (admin) {
        if (!this.admins.includes(admin))
            throw new Error("admins doesn't include " + admin);
        this.admins.splice(this.admins.indexOf(admin));
    };
    IConfiguration.fromFile = function (fileName) {
        var config = JSON.parse(fs.readFileSync(fileName, "utf8"));
        return new Configuration(config.token, config.admins);
    };
    IConfiguration.fromObject = function (obj) {
        var config = obj;
        return new Configuration(config.token, config.admins);
    };
    return IConfiguration;
}());
exports["default"] = IConfiguration;
var Configuration = /** @class */ (function (_super) {
    __extends(Configuration, _super);
    function Configuration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Configuration;
}(IConfiguration));
