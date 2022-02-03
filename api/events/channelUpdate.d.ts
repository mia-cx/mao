/** @format */
import { DMChannel, GuildChannel } from "discord.js";
declare const _default: {
    name: string;
    execute(oldChannel: DMChannel | GuildChannel, newChannel: DMChannel | GuildChannel): Promise<void>;
};
export default _default;
