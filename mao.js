const Discord = require('discord.js');
const { DiscordInteractions } = require("slash-commands");
const propertiesReader = require('properties-reader');

const properties = propertiesReader('./mao.conf');
var token = properties.get('token');

const client = new Discord.Client();
const interactions = new DiscordInteractions({
  applicationId: "484459581897179146",
  authToken: token,
  publicKey: "44260852dec7b07cd8d1fd6d3a8c444d08aef6237b4f646459f5a8b48887d102",
});

/**
 * create moveCommand
 */
const moveCommand = {
  name: 'move',
  description: 'move all users in your voice channel to another one.',
  options: [
    {
      name: 'channel',
      description: 'the channel to move the users to',
      type: 7,
      requied: true,
    }
  ]
};

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //register moveCommand to Volant server
  await interactions
    .createApplicationCommand(moveCommand, '559448354199699458')
    .catch(console.error);

});

/**
 * SlashCommand Handler
 */
client.ws.on('INTERACTION_CREATE', async interaction => {

  // moveCommand Handler
  if (interaction.data.name === 'move') {

    let origin;
    let channel;

    //define origin (commandsender)
    await client.guilds
      .fetch(interaction.guild_id)
      .then(guild => {
        guild.members
          .fetch(interaction.member.user.id)
          .then(user => origin = user)
          .catch(console.error)
      })
      .catch(console.error);

    //define specified channel (target)
    await client.channels
      .fetch(interaction.data.options[0].value)
      .then(chnl => channel = chnl)
      .catch(console.error);

    //let origin know mao is busy :3
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 5,
      }
    });

    //move all origin voiceChannel members to target channel
    origin.voice.channel.members.forEach(member => {
      member.voice.setChannel(channel);
    });

    //let origin know mao is done :3
    client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
      data: {
        type: 4,
        content: 'moved all users from your old channel to `' + channel.name + '` <:mao:676486372055580682>'
      }
    });
  }

})

client.login(token);