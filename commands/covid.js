const { SlashCommandBuilder } = require("@discordjs/builders");
const htmlParser = require("node-html-parser");
const axios = require("axios").default;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("covid")
    .setDescription("Covid-19 info"),
  async execute(interaction) {
    try {
      // https://www.worldometers.info/coronavirus/
      axios.get("https://www.worldometers.info/coronavirus/").then((x) => {
        const html = htmlParser.parse(x.data, {
          lowerCaseTagName: false,
          comment: false,
          blockTextElements: {
            script: true,
            noscript: true,
            style: true,
            pre: true,
          },
        });
        const data = {
          Infected: html
            .querySelectorAll("div#maincounter-wrap")[0]
            .querySelector("span").childNodes[0].rawText,

          Deaths: html
            .querySelectorAll("div#maincounter-wrap")[1]
            .querySelector("span").childNodes[0].rawText,

          Recovered: html
            .querySelectorAll("div#maincounter-wrap")[2]
            .querySelector("span").childNodes[0].rawText,
        };
        interaction.reply({
          embeds: [
            {
              title: "COVID-19 PROGRESS",
              image: {
                url: "https://dalkora.com/data/file/town/214317732_VpsOgZ9T_302cb21456b2b88a76a27eac6cedcb5c474fd3f4.jpg",
              },
              fields: [
                { name: "Infected Peoples - 감염된 사람들 :", value: data.Infected },
                { name: "Died Peoples - 죽은 사람들 :", value: data.Deaths },
                { name: "Recovered Peoples - 치료된 사람들 :", value: data.Recovered },
              ],
            },
          ],
        });
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("Error Has been Planted!!");
    }
  },
};
