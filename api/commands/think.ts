/** @format */

import {
  CommandInteraction,
  Interaction,
  Message,
  Permissions,
  Team,
  TextChannel,
} from "discord.js";
import Command from "../command.js";

export default new Command(
  "think",
  null,
  null,
  async (origin: CommandInteraction | Message) => {
    if (origin instanceof Message) {
      // if (
      //   !((await origin.client.application?.fetch())?.owner as Team).members
      //     .map(member => member.user)
      //     .includes(origin.author)
      // ) {
      //   origin
      //     .reply(
      //       "you don't have permission to use this command <:no:565663114394075186>"
      //     )
      //     .then(reply => {
      //       setTimeout(() => {
      //         reply.delete();
      //         origin.delete();
      //       }, 2500);
      //     });
      //   return;
      // }
      (origin.channel as TextChannel).messages
        .fetch({ limit: 2 })
        .then(messages => {
          messages.at(1)?.react("<:hungrycad:575765010244960271> ");
          origin.delete();
        });
    }
    if (origin instanceof Interaction) {
      origin.reply("<:hungrycad:575765010244960271> ");
    }
  }
);
