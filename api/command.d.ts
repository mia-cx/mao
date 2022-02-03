/** @format */
import { CommandInteraction, Message } from "discord.js";
export declare let commands: Record<string, Command>;
export default class Command {
    name: string;
    description: string | undefined | null;
    aliases: string | string[] | undefined | null;
    execute: (origin: CommandInteraction | Message, args?: string[]) => void;
    constructor(name: string, description: string | undefined | null, aliases: string | string[] | undefined | null, executor: (origin: CommandInteraction | Message, args?: string[]) => void);
}
/**
 * checks whether a certain event is a command or not
 * @param message event to check whether it is a command
 * @returns command prefix if true, void if false
 */
export declare function isCommand(message: Message): string | undefined;
export declare function hasPrefix(message: Message): boolean;
