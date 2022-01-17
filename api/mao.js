import { Client, Intents } from "discord.js";
import { isCommand } from "./command.js";
/**
 * mao's Client wrapper that contains defaults, and mappings.
 */
export default class Mao extends Client {
    static instance;
    static defaultPrefix = "m.";
    commands = {};
    constructor(options) {
        if (Mao.instance)
            throw new Error("can't instantiate more than 1 Mao");
        super(options ?? {
            intents: [
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_WEBHOOKS,
            ],
        });
        Mao.instance = this;
        console.log("logging in...");
        this.once("ready", () => {
            console.log(`Logged in as ${this.user?.tag}!`);
            this.user?.setStatus("idle");
            this.user?.setPresence({ activities: [{ name: "with yarn..." }] });
        });
        this.on("messageCreate", async (event) => {
            let prefix = isCommand(event);
            if (!prefix)
                return;
            let args = event.content.split(" ");
            let command = args.shift().substring(prefix.length);
            try {
                this.commands[command].executor({ mao: this, storage: undefined }, args);
            }
            catch {
                event.reply("sorry i don't know that command <a:uhoh:583764964326506528>");
            }
        });
        this.on("interactionCreate", async (event) => {
            if (event.isCommand())
                this.handleSlashCommand(event);
        });
        // DEBUG LOGGING
        if (process.env.DEBUG) {
            this.on("debug", (event) => {
                console.debug(event);
            });
            this.on("messageCreate", (event) => {
                console.debug(event.guild?.name +
                    " >> " +
                    event.guild?.channels.cache.get(event.channelId)?.name +
                    " >> " +
                    event.author.tag +
                    ": " +
                    event.cleanContent +
                    (event.stickers.size > 0 ? "sticker" : "") +
                    (event.attachments.size > 0 ? " [" + event.attachments.size + "]" : ""));
            });
        }
    }
    // registerCommand(command: Command) {
    //     this.on("command." + command.name, async (event) => {
    //         command.executor(event);
    //     });
    // }
    async handleSlashCommand(command) {
        await command.deferReply({ ephemeral: true });
        try {
            this.commands[command.commandName].executor({ mao: this, storage: undefined }, args);
        }
        catch {
            command.editReply({
                content: "sorry i don't know that command <a:uhoh:583764964326506528>",
            });
        }
    }
    /**
     * Mao acts as a Singleton, and this is its getter.
     * @returns Singleton instance of {@link Mao}
     */
    static getInstance() {
        return this.instance;
    }
}
