/** @format */
import Mao from "../index.js";
import Server from "./server.js";
export let commands = {};
export default class Command {
    name;
    description;
    aliases;
    execute;
    constructor(name, description, aliases, executor) {
        this.name = name;
        this.description = description;
        this.aliases = aliases;
        this.execute = executor;
    }
}
/**
 * checks whether a certain event is a command or not
 * @param message event to check whether it is a command
 * @returns command prefix if true, void if false
 */
export function isCommand(message) {
    let prefix = message.guild
        ? Server.servers[message.guildId]
            ? Server.servers[message.guildId].prefix
            : Mao.PREFIX
        : Mao.PREFIX;
    let command = message.content.substring(prefix.length).split(" ")[0];
    if (!commands[command])
        return;
    return command;
}
export function hasPrefix(message) {
    let prefix = message.guild
        ? Server.servers[message.guildId]
            ? Server.servers[message.guildId].prefix
            : Mao.PREFIX
        : Mao.PREFIX;
    if (!message.content.startsWith(prefix))
        return false;
    return true;
}
