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
              color: "#8A0808",
              title: "**GLOBAL COVID-19 PROGRESS**",
              thumbnail: {
                url: "https://dalkora.com/data/file/town/214317732_VpsOgZ9T_302cb21456b2b88a76a27eac6cedcb5c474fd3f4.jpg",
              },
              fields: [
                {
                  name: "_**Infected Peoples - 확진판정 :**_",
                  value: data.Infected,
                },
                {
                  name: "_**Died Peoples - 사망 :**_",
                  value: data.Deaths,
                },
                {
                  name: "_**Recovered Peoples - 완치 :**_",
                  value: data.Recovered,
                },
                {
                  name: "Resource Site",
                  value:
                    "[Click Here!](https://www.worldometers.info/coronavirus/)",
                },
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
