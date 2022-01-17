import { Message } from "discord.js";
import Mao from "./mao.js";
import StorageHandler from "./storage.js";
declare type CommandContext = {
    mao: Mao;
    storage: StorageHandler | undefined;
};
declare type CommandExecutor = (context: CommandContext, args: string[]) => any | void;
export default interface Command {
    name: string;
    description: string;
    aliases: string[];
    executor: CommandExecutor;
    slashExecutor: CommandExecutor;
}
export declare function defineCommand(command: Command): Command;
export declare function isCommand(event: Message<boolean>): string | void;
export {};
