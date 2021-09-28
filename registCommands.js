const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("./settings.json");
const fs = require("fs");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

module.exports = {
  async registCommands(clientId) {
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "9" }).setToken(config.token);

    (async () => {
      try {
        await rest.put(Routes.applicationCommands(clientId), {
          body: commands,
        });
        console.log("Slash(/) Commands successfully registed!");
      } catch (error) {
        console.error(error);
      }
    })();
  },
};
