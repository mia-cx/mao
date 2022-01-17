import Mao from "./mao.js";
export default class Server {
    id;
    prefix;
    constructor(id, prefix) {
        this.id = id;
        this.prefix = prefix ?? Mao.defaultPrefix;
    }
    static servers = {};
    static getPrefix(id) {
        this.servers[id].prefix;
    }
}
