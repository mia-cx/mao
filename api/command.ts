/** @format */

import { CacheType, CommandInteraction, Message } from "discord.js";
import Mao from "../index.js";
import Server from "./server.js";

export let commands: Record<string, Command> = {};

export default class Command {
  name: string;
  description: string | undefined | null;
  aliases: string | string[] | undefined | null;
  execute: (origin: CommandInteraction | Message, args?: string[]) => void;

  constructor(
    name: string,
    description: string | undefined | null,
    aliases: string | string[] | undefined | null,
    executor: (origin: CommandInteraction | Message, args?: string[]) => void
  ) {
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
export function isCommand(message: Message): string | undefined {
  let prefix: string = message.guild
    ? Server.servers[message.guildId!]
      ? Server.servers[message.guildId!].prefix
      : Mao.PREFIX
    : Mao.PREFIX;
  let command = message.content.substring(prefix.length).split(" ")[0];
  if (!commands[command]) return;
  return command;
}

export function hasPrefix(message: Message): boolean {
  let prefix: string = message.guild
    ? Server.servers[message.guildId!]
      ? Server.servers[message.guildId!].prefix
      : Mao.PREFIX
    : Mao.PREFIX;
  if (!message.content.startsWith(prefix)) return false;
  return true;
}
