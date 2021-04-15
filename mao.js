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

let progressMessages = [
  "playing with yarn... <:maam:602511344134127616>", 
  "groovin to music... <a:volantsway:585372770481864714>", 
  "kicking gum and chewing butt... <:tinymao:659180240282714112>",
  "thinking real hard... <:dacyrgnuh:576886472762851338>",
  "<:oma:642126674024071169>",
  "dropped the ball... <a:uhoh:583764964326506528>"
]

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  //register moveCommand to Volant server
  await interactions
    .createApplicationCommand(moveCommand)
    .then(command => console.log(command))
    .catch(console.error);

});

/**
 * SlashCommand Handler
 */
client.ws.on('INTERACTION_CREATE', async interaction => {

  let message = progressMessages[Math.floor(Math.random() * progressMessages.length)];

  // moveCommand Handler
  if (interaction.data.name === 'move') {

    //define origin (commandsender)
    let guild = await client.guilds
      .fetch(interaction.guild_id)
      .catch(console.error);

    let origin = await guild.members
      .fetch(interaction.member.user.id)
      .catch(console.error);

    //define specified channel (target)
    let channel = await client.channels
      .fetch(interaction.data.options[0].value)
      .catch(console.error);

    //let origin know mao is busy :3
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: message
        }
      }
    });

    //permission check
    if (!origin.hasPermission('MOVE_MEMBERS')) {
      client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
        data: {
          type: 4,
          content: 'sorry, you must have the `MOVE_MEMBERS` permission to use this command <:no:565663114394075186>'
        }
      });
      return;
    }

    //voicestate check
    if (origin.voice.channel == null) {
      client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
        data: {
          type: 4,
          content: 'sorry, you have to be connected to a voice channel to use this command <:omegamao:569482246000476172>'
        }
      });
      return;
    }

    if (channel.isText()) {
      client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
        data: {
          type: 4,
          content: 'sorry, you can\'t move people to a text channel <:mao:676486372055580682>'
        }
      });
      return;
    }

    //move all origin voiceChannel members to target channel
    await origin.voice.channel.members.forEach(member => {
      await member.voice.setChannel(channel);
    });

    //let origin know mao is done :3
    client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
      data: {
        type: 4,
        content: 'moved all users from your old channel to `' + channel.name + '` <:coolmao:572166311321534484>'
      }
    });
  }
})

client.login(token);