import dotenv from "dotenv";
dotenv.config();
import Mao from "./api/mao.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { SlashCommandBuilder } from "@discordjs/builders";
const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);
(async () => {
    let mao = new Mao();
    await mao.login(process.env.DISCORD_BOT_TOKEN);
    rest.put(Routes.applicationGuildCommands(mao.application.id, "903524630097178664"), {
        body: [new SlashCommandBuilder().setName("ping").setDescription("pong!").toJSON()],
    })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
})();
