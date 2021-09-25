const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Ping Pong!"),
  async execute(i) {
    await i.reply("Pong!");
  },
};
