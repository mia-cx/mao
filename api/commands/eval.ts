/** @format */

import {
  CommandInteraction,
  Interaction,
  Message,
  TextChannel,
} from "discord.js";
import Command from "../command.js";

export default new Command(
  "eval",
  null,
  null,
  async (origin: CommandInteraction | Message, args?: string[]) => {
    if (origin instanceof Message) {
      if (origin.author.id !== "209048057441026049") return;
      if (!args) return;

      let returnValue: string = "";

      try {
        returnValue += eval(args.join(" "));
      } catch (e) {
        returnValue = (e as Error).message;
      }

      if (returnValue.includes(origin.client.token!)) {
        origin
          .reply(
            "⚠️ **WARNING** ⚠️\nYour `eval` return value contained your bot's private token. I've prevented it from showing up. Please be more careful next time :3"
          )
          .then(reply => {
            setTimeout(() => {
              reply.delete();
              origin.delete();
            }, 2500);
          });
        return;
      }

      origin.reply(`\`\`\`js\n${returnValue}\n\`\`\``);
    }
    if (origin instanceof Interaction) {
      if (origin.user.id !== "209048057441026049") return;
      origin.reply("<:XD:608046107037270018>");
    }
  }
);
