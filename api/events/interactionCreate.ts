/** @format */

import { Interaction } from "discord.js";

export default {
  name: "interactionCreate",
  execute(interaction: Interaction) {
    if (interaction.isCommand()) {
    }
  },
};
