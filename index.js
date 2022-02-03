/** @format */
import fs from "fs";
import { REST } from "@discordjs/rest";
import { Client, Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { commands } from "./api/command.js";
export default class Mao extends Client {
    static instance;
    static PREFIX = "m.";
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
                Intents.FLAGS.GUILD_PRESENCES,
            ],
            partials: [
                "CHANNEL", // Required to receive DMs
            ],
        });
        Mao.instance = this;
        console.log("logging in...");
        this.once("ready", async (client) => {
            console.log(`Logged in as ${client.user?.tag}!`);
            client.user?.setStatus("idle");
            client.user?.setPresence({ activities: [{ name: "with yarn..." }] });
            console.log("registering events");
            const eventFiles = fs
                .readdirSync("./api/events")
                .filter(file => file.endsWith(".js"));
            for (const file of eventFiles) {
                console.log(file);
                let e = await import(`./api/events/${file}`);
                let event = e.default;
                console.log(event);
                console.log(event.name);
                if (event.once) {
                    console.log(`registering event ./api/events/${file}`);
                    this.once(event.name, (...args) => event.execute(...args));
                }
                else {
                    console.log(`registering event ./api/events/${file}`);
                    this.on(event.name, (...args) => event.execute(...args));
                }
            }
            console.log("registering commands");
            const commandFiles = fs
                .readdirSync("./api/commands")
                .filter(file => file.endsWith(".js"));
            for (const file of commandFiles) {
                console.log(file);
                let c = await import(`./api/commands/${file}`);
                let command = c.default;
                console.log(command);
                console.log(`command name: ${command.name}`);
                console.log(`registering command ./api/events/${file}`);
                commands[command.name] = command;
            }
        });
    }
}
const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);
let mao = new Mao();
mao.login(process.env.DISCORD_BOT_TOKEN);
