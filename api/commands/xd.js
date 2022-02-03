/** @format */
import { Interaction, Message } from "discord.js";
import Command from "../command.js";
export default new Command("xd", null, null, (origin) => {
    if (origin instanceof Message) {
        origin.react("<:XD:608046107037270018>");
    }
    if (origin instanceof Interaction) {
        origin.reply("<:XD:608046107037270018>");
    }
});
