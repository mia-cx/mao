import { Guild } from "discord.js";
import Mao from "./mao.js";

export default class Server {
    id: string | number;
    prefix: string;

    constructor(id: string | number, prefix?: string) {
        this.id = id;
        this.prefix = prefix ?? Mao.defaultPrefix;
    }

    static servers: Record<string, Server> = {};

    static getPrefix(id: string | number) {
        this.servers[id].prefix;
    }
}
