const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("profiles")
    .setDescription("Show your profiles with canvas"),
  async execute(interaction) {
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");

    //font
    context.font = "40px 맑은 고딕";
    context.fillStyle = "#ffffff";
    context.fillText("Profile", canvas.width / 2.5, canvas.height / 3.5);

    context.fillStyle = "#ffffff";
    context.fillText(
      `${interaction.member.displayName}#${interaction.user.discriminator}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(
      interaction.user.displayAvatarURL({ format: "jpg" })
    );
    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "profile-image.png"
    );

    interaction.reply({ files: [attachment] });
  },
};
