import * as fs from "fs";

export default abstract class IConfiguration {
    token: string;
    admins: string[];

    constructor(token: string, admins: string[]) {
        this.token = token;
        this.admins = admins;
    }

    getToken(): string {
        return this.token;
    }

    setAdmins(admins: string[]) {
        this.admins = admins;
    }
    getAdmins(): string[] {
        return this.admins;
    }

    addAdmin(admin: string) {
        if (this.admins.includes(admin)) throw new Error("admins already includes " + admin);
        this.admins.push(admin);
    }
    removeAdmin(admin: string) {
        if (!this.admins.includes(admin)) throw new Error("admins doesn't include " + admin);
        this.admins.splice(this.admins.indexOf(admin));
    }

    static fromFile(fileName: string): Configuration {
        const config = JSON.parse(fs.readFileSync(fileName, "utf8"));
        return new Configuration(config.token, config.admins);
    }
    static fromObject(obj): Configuration {
        const config = obj;
        return new Configuration(config.token, config.admins);
    }
}

class Configuration extends IConfiguration {}
