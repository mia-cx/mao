/** @format */

import { DMChannel, GuildChannel, Permissions, User } from "discord.js";

export default {
  name: "channelUpdate",
  async execute(
    oldChannel: DMChannel | GuildChannel,
    newChannel: DMChannel | GuildChannel
  ) {
    let oldObject: DMChannel | GuildChannel = oldChannel;
    let newObject: DMChannel | GuildChannel = newChannel;

    if (oldObject.messages) delete oldObject.messages;
    if (oldObject.threads) delete oldObject.threads;

    if (newObject.messages) delete newObject.messages;
    if (newObject.threads) delete newObject.threads;

    let oldJSON = JSON.stringify(oldObject, null, 2);
    let newJSON = JSON.stringify(newObject, null, 2);

    await (oldChannel as GuildChannel).guild.members.fetch();
    let suspects = (oldChannel as GuildChannel).guild.members.cache
      .filter(member =>
        member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
      )
      .map(member => member.user.tag);

    let suspectFormat = "";
    suspects.forEach(suspect => {
      suspectFormat += `${suspect},\n`;
    });

    function logSuspects(target: User) {
      newChannel = newChannel;
      target.send(
        `A channel has been updated...\nOld: \`\`\`json\n${oldJSON}\`\`\`\nNew: \`\`\`json\n${newJSON}\`\`\``
      );
      target.send(
        `All users with permission \`MANAGE_CHANNELS\`:\n\`\`\`\n${suspectFormat}\`\`\` `
      );
    }
    newChannel.client.users.fetch("209048057441026049").then(logSuspects);
  },
};
