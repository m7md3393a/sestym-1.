const Discord = require("discord.js");
const myid = ["749904594334777435"];////// ايدي 
exports.run = async (client, message, args) => {
  const Embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor("Pest-Bot", client.user.avatarURL)
    .setColor("BLUE")
    .setTitle("Pest Bot 🍓 اضغت")// link bot
    .setURL(
      "https://discord.com/api/oauth2/authorize?client_id=749904594334777435&permissions=8&scope=bot"
    )
    .setDescription(`**ذا رابط البوت بشكرك انك هديفو لي سيرفرك**`)

    .addField("**افضل بوت سيستم من بعد بروبوت و ما تخاف علي سيرفرك رتبت البوت مفاهة Administrator**", 
     "" + "<@" + myid + ">")

    .setFooter("© Mcadventuretime.com", client.user.avatarURL);
  message.channel.send(Embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "link",
  description: "1 Et.",
  usage: "link"

};
