/** @format */
import { TextChannel } from "discord.js";
import { commands, hasPrefix, isCommand } from "../command.js";
export default {
    name: "messageCreate",
    execute(message) {
        let logMessage = "";
        if (message.channel instanceof TextChannel)
            logMessage +=
                message.guild?.name +
                    " >> " +
                    message.guild?.channels.cache.get(message.channelId)?.name +
                    " >> ";
        logMessage +=
            message.author.tag +
                ": " +
                message.cleanContent +
                (message.stickers.size > 0 ? "sticker" : "") +
                (message.attachments.size > 0
                    ? " [" + message.attachments.size + "]"
                    : "");
        console.debug(logMessage);
        if (hasPrefix(message)) {
            let command = isCommand(message);
            if (!command) {
                message
                    .reply("sorry i dont know that command <a:uhoh:583764964326506528>")
                    .then(reply => {
                    setTimeout(() => {
                        reply.delete();
                    }, 2500);
                });
                return;
            }
            let args = message.content.split(" ");
            args.shift();
            commands[command].execute(message, args);
        }
    },
};
