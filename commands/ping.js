const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Ping Pong!"),
  async execute(interaction) {
    const ping = Date.now() - interaction.createdTimestamp;
    ping >= 0
      ? await interaction.reply(`Pong! ${ping}ms`)
      : await interaction.reply(`Pong! ${ping * -1}ms`);
  },
};
