/** @format */
import Mao from "../index.js";
// { sort-end }
export default class Server {
    id;
    prefix;
    constructor(id, prefix) {
        this.id = id;
        this.prefix = prefix ?? Mao.PREFIX;
    }
    static servers = {};
    static getPrefix(id) {
        this.servers[id].prefix;
    }
}
