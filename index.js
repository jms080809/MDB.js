const Discord = require("discord.js");
const fs = require("fs");
const { registCommands } = require("./registCommands.js");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS],
});
const config = require("./settings.json");

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

//log "Bot Ready!" when bot ready once
registCommands(config.applicationId);

client.once("ready", () => {
  console.log("Bot Ready!");
});

// slash command interaction
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  // if interaction doesn't have in command list or not command do nothing
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply("not command found!");
  }
});

client.login(config.token);
