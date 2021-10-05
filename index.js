const Discord = require("discord.js");
const fs = require("fs");
const { registCommands } = require("./registCommands.js");
const config = require("./settings.json");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS],
});

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

//log "Bot Ready!" when bot ready once

client.once("ready", () => {
  console.log("Bot Ready!");
  registCommands(config.applicationId);
});

// slash command interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  // if interaction doesn't have in command list or not command do nothing
  try {
    console.log(
      `${interaction.createdAt} "${interaction.commandName}" by ${interaction.user.tag} Server: ${interaction.guild.name}/${interaction.guild.id} Channel: ${interaction.channel.name}/${interaction.channelId}`
    );
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply("not command found!");
  }
});
client.login(config.token);