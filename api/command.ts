import { Message } from "discord.js";
import Mao from "./mao.js";
import Server from "./server.js";
import StorageHandler from "./storage.js";

type CommandContext = { mao: Mao; storage: StorageHandler | undefined };
type CommandExecutor = (context: CommandContext, args: string[]) => any | void;

export default interface Command {
    name: string;
    description: string;
    aliases: string[];
    executor: CommandExecutor;
    slashExecutor: CommandExecutor;
}

export function defineCommand(command: Command) {
    return command;
}

export function isCommand(event: Message<boolean>): string | void {
    let prefix: string = event.guild
        ? Server.servers[event.guildId!]
            ? Server.servers[event.guildId!].prefix
            : Mao.defaultPrefix
        : Mao.defaultPrefix;
    if (!event.content.startsWith(prefix)) return;
    return prefix;
}
