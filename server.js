const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const prefix = ayarlar.prefix;//1  
const db = require("quick.db");
require("./util/eventLoader.js")(client);
const request = require("request");
const snekfetch = require("snekfetch");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
//////////////////////////////////////////////////////////////////////////////////////////
client.on("message", function(message) {
  var prefix = "!!";
  if (message.content.startsWith(prefix + "help")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
      .addField("| عامه", "👥", true)
      .addField("| ادمنيه", "👑", true)
      .addField("| ميوزك", "🎶", true)
      .addField("| العاب", "🎮", true);
    message.channel.send(RpsEmbed).then(msg => {
      msg.react("👥");
      msg.react("👑");
      msg.react("🎶");
      msg
        .react("🎮")
        .then(() => msg.react("👥"))
        .then(() => msg.react("👑"))
        .then(() => msg.react("🎶"))
        .then(() => msg.react("🎮"));
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "👥" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "👑" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🎶" && user.id === message.author.id;
      let reaction5Filter = (reaction, user) =>
        reaction.emoji.name === "🎮" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 20000
      });
      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 19000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 18000
      });
      let reaction5 = msg.createReactionCollector(reaction5Filter, {
        time: 16000
      });
      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      reaction1.on("collect", r => {
        const embed = new Discord.RichEmbed()
          .setThumbnail(
            "https://images-ext-2.discordapp.net/external/JD7xvknBVacXHoC2re78AtJN4PUY5IjUZy1uWIqzObI/https/s3.amazonaws.com/eclincher.wp.upload/wp-content/uploads/2015/08/25155834/people-icon.png"
          )
          .setColor("#000000").setDescription(`
          **اوامر عامة** :loudspeaker: 
  **
   > ${prefix}user لعرض معلومات عنك
   > ${prefix}id بتشوف صورت الشخص من عن طريق الايدي بتاعو
   > ${prefix}pest bot معومات عن البوت
   > ${prefix}avatar لعرض صورتك أو صورة الي تمنشنه 
   > ${prefix}avatar لعرض صورتك او الصورة التي تريدها
   > ${prefix}quran اكتب ذا الامر علشان تشوف ايات القورأ
   > ${prefix}a server دا الامر علشان تشوف صورت السيرفر
   > ${prefix}reply دا الامر علشان تعمل رد تلقائي لنفسك انت بس [${prefix}رد تلقائي]
   > ${prefix}server دا الامر علشان تشوف بي معلومات السيرفر
   > ${prefix}color امر اختيار لون {+لون}
   > ${prefix}colors امر رؤيا قايمت الالوان {+الوان}
   > ${prefix}Ping : سرعة استجابة البوت 
   > ${prefix}kiss اتتوب و شوف [${prefix}بوسة]
   > ${prefix}cat اكتوب و شوف
   > ${prefix}slap اكتوب و شوف [${prefix}قلم]
**
  `);

        message.delete(1000);
        let e = " جاري الارســال .. :envelope_with_arrow: ";
        message.reply(e).then(m => m.delete(1000));
        message.author
          .send(embed)
          .catch(error =>
            message.reply(" لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :x:")
          );
      });

      reaction2.on("collect", r => {
        const embed = new Discord.RichEmbed()
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/553862087382925313/556036868492230667/logo-admin-png-4.png"
          )
          .setColor("#000000").setDescription(`
          **اوامر ادارية** :crown: 
  **
  > ${prefix}rank تمر تعريف كم واحد مع الرتبة اكتب الامر ثما منشن الرتبة
  > ${prefix}bot off منع دخول بوتات
  > ${prefix}bot on السماح للبوتات بالدخول
  > ${prefix}ban لحظر شخص ما من الخادم
  > ${prefix}kick لطرد شخص ما من الخادم
  > ${prefix}unlock لفتح الدردشة [${prefix}فتح]
  > ${prefix}lock لقفل الدردشة الخاصة بك [${prefix}قل]
  > ${prefix}mute لإسكات أي شخص [${prefix}ميوت]
  > ${prefix}unmute لإعادة صوت لشخص [${prefix}تكلم]
  > ${prefix}move لسحب الشخص إلى غرفتك [${prefix}اسحب]
  > ${prefix}ls  لإظهار جميع بوتات الخادم
  > ${prefix}talk دا الامر تخلي البوت يبعت رسالة لي اي روم انت عاوزية [${prefix}رسالة]
  > ${prefix}created ينشاء رومات و رتب
  > ${prefix}ccolors امر انشأ الوان
  > ${prefix}room1  لعمل روم التقديمات
  > ${prefix}room2  لعمل روم القبول والرفض
  لقبول تقديم عضو : +قبول
  مثال: +قبول @منشن عضو 
  لرفض عضو : +رفض
  مثال: +رفض @منشن عضو لست متفاعل بشكل كافِ
**
  `);

        message.delete(1000);
        let e = " جاري الارســال .. :envelope_with_arrow: ";
        message.reply(e).then(m => m.delete(1000));
        message.author
          .send(embed)
          .catch(error =>
            message.reply(" لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :x:")
          );
      });
      reaction3.on("collect", r => {
        const embed = new Discord.RichEmbed()
          .setThumbnail(
            "https://cdn.glitch.com/50aafec4-897f-48dc-9ce5-ef09b9cd399b%2Fc74447fc-99a4-4ec6-863e-8c4276b94b52.image.png?v=1599394703644"
          )
          .setColor("#000000").setDescription(`
          **اوامر ميوزك** :notes:
   **       
> ${prefix}Play : تشغيل الاغنية او اضافتها للقائمة او اكمال الاغنية [${prefix}p]  [شغل]  [ش] 
> ${prefix}Pause : ايقاف مؤقت الاغنية [${prefix}pe1] 
> ${prefix}Resume : اكمال الاغنية [${prefix}pe2]  [${prefix}r] 
> ${prefix}stop : لأيقاف الأغنية وخروج البوت من الروم [قف] 
> ${prefix}Queue : عرض القائمة [${prefix}q] 
> ${prefix}skipto : لتخطي الأغنية الى الأغنية القادمة في طابور الموسيقى القادمة [${prefix}st] 
> ${prefix}Skip : تخطي للاغنية التالية [${prefix}s] 
> ${prefix}Volume : تغيير الصوت [${prefix}v]  [${prefix}vol] 
> ${prefix}Nowplaying : عرض مايتم تشغيله الان [${prefix}np] 
> ${prefix}Ping : سرعة استجابة البوت 
> ${prefix}loop : تكرار الاغنية [l${prefix}] [${prefix}lp] 
> ${prefix}Leave : الخروج من الروم الصوتي  
  **
`);

        message.delete(1000);
        let e = " جاري الارســال .. :envelope_with_arrow: ";
        message.reply(e).then(m => m.delete(1000));
        message.author
          .send(embed)
          .catch(error =>
            message.reply(" لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :x:")
          );
      });

      reaction5.on("collect", r => {
        const embed = new Discord.RichEmbed()
          .setThumbnail(
            "https://cdn.glitch.com/50aafec4-897f-48dc-9ce5-ef09b9cd399b%2Ficon-games.png?v=1599395673850"
          )
          .setColor("#000000").setDescription(`
         :video_game: **اوامر العاب** 
  **
   > ${prefix}boom اكتب دا الامر و منشن صحبك
   > ${prefix}hug اكتب دا الامر و منشين صحبتك [${prefix}عناق]
   > ${prefix}slap اكتب دا الامر و منشين صحبك [${prefix}قلم]
   > ${prefix}kiss اكتوب و شوف [${prefix}بوسة]
   > ${prefix}صراحة
  **
  `);

        message.delete(1000);
        let e = " جاري الارســال .. :envelope_with_arrow: ";
        message.reply(e).then(m => m.delete(1000));
        message.author
          .send(embed)
          .catch(error =>
            message.reply(" لم اتمكن من الارسال الاوامر لك , يرجي فتح خاصك :x:")
          );
      });
    });
  }
});

///////////////////////////////////////////////////////////////////////////////
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

//-------------------------------------------\\
client.on("message", msg => {
  if (client.ping > 500) {
    let bölgeler = [
      "singapore",
      "eu-central",
      "india",
      "us-central",
      "london",
      "eu-west",
      "amsterdam",
      "brazil",
      "us-west",
      "hongkong",
      "us-south",
      "southafrica",
      "us-east",
      "sydney",
      "frankfurt",
      "russia"
    ];
    let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)];
    let sChannel = client.channel.get(db.fetch(`ddos_${msg.guild.id}`));

    sChannel.send(
      `Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :` +
        client.ping
    );
    msg.guild
      .setRegion(yenibölge)
      .then(g => console.log(" Bölge:" + g.region))
      .then(g => msg.channel.send("Bölge **" + g.region + " Olarak Değişti"))
      .catch(console.error);
  }
});
//--------BOT SUNUCUYA EKLENİNCE EKLENDİĞİ SUNUCUYA MESAJ YAZMASI--------\\
client.on("guildCreate", guild => {
  let r3lease = guild.channels.filter(c => c.type === "text").random();
  r3lease.send("");
});
//--------------------------------------------||
require("events").EventEmitter.defaultMaxListeners = 25;
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(ayarlar.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "created") {
    if (
      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send(" تم بالفعل إعداد لوحة البوت.");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        " هذا القانون `مدير` يمكن للشخص المرخص استخدامه."
      );
    message.channel.send(`بدأ إعداد الخادم..`);
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })

      .then(collected => {
        message.guild.createChannel("|📌قنوات مهمة|", "category", [
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);





        message.guild
          .createChannel("「✍️」قواعد", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|📌قنوات مهمة|"
              )
            )
          );
        message.guild
          .createChannel("「🚪」الوارد الصادر", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|📌قنوات مهمة|"
              )
            )
          );
        message.guild
          .createChannel("「🌀」عداد", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|📌قنوات مهمة|"
              )
            )
          );
        message.guild
          .createChannel("「🔨」قناة الدخول", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|📌قنوات مهمة|"
              )
            )
          );
        message.guild
          .createChannel("「📣」إعلان", "text", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ])
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|📌قنوات مهمة|"
              )
            )
          );
      })
      .then(collected => {
        message.guild.createChannel("|💬|GENEL KANALLAR|💬|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`「⁉️」شكوى و اقتراح`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|💬|GENEL KANALLAR|💬|"
              )
            )
          );
        message.guild
          .createChannel(`「📷」photo`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|💬|GENEL KANALLAR|💬|"
              )
            )
          );
        message.guild
          .createChannel(`「🖥️」cmd`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|💬|GENEL KANALLAR|💬|"
              )
            )
          );
        message.guild
          .createChannel(`「💬」chat`, "text")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|💬|GENEL KANALLAR|💬|"
              )
            )
          );

        message.guild
          .createChannel(`️️️🎗️》vip`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|🔊|SES KANALLARI|🔊|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "💎 | Sunucu Sahip");

            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
          });
        ///////////////////////////////////////////////////////////////////////////////////
        message.guild.createChannel("|🔊Audio channels🔊|", "category", [
          {
            id: message.guild.id
          }
        ]);

        message.guild
          .createChannel(`🔱》Management`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|🔊Audio channels🔊|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            let role2 = message.guild.roles.find("name", "💎 | owner | ✥");
            let role3 = message.guild.roles.find("name", "💮 |  ADMIN | ✥");
            let role4 = message.guild.roles.find("name", "🌺 | CO owner | ✥");
            c.overwritePermissions(role, {
              CONNECT: false
            });
            c.overwritePermissions(role2, {
              CONNECT: true
            });
            c.overwritePermissions(role3, {
              CONNECT: true
            });
            c.overwritePermissions(role4, {
              CONNECT: true
            });
          });
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        message.guild
          .createChannel(`💬》Sohbet Odası`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|🔊Audio channels🔊|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`🎶》Music room 1`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|🔊Audio channels🔊|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`🎶》Music room 2`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|🔊Audio channels🔊|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        message.guild
          .createChannel(`🎶》Music room 3`, "voice")
          .then(channel =>
            channel.setParent(
              message.guild.channels.find(
                channel => channel.name === "|🔊Audio channels🔊|"
              )
            )
          )
          .then(c => {
            let role = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
              CONNECT: true
            });
          });

        /////////////////////////// roles
        message.guild.createRole({
          name: "💎 | owner | ✥",
          color: "292922",
          permissions: ["ADMINISTRATOR"]
        });

        message.guild.createRole({
          name: "🌺 | CO owner | ✥",
          color: "ad1d00",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
          ]
        });

        message.guild.createRole({
          name: "💮 | ADMIN | ✥",
          color: "ffb400",
          permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
          ]
        });

        message.guild.createRole({
          name: "🔨 | co ADMIN | ✥",
          color: "#FF4D00"
        });

        message.guild.createRole({
          name: "💸 | Server Booster",
          color: "#FF77FF"
        });

        message.guild.createRole({
          name: "🎑 | Developer",
          color: "#FFCC00"
        });

        message.guild.createRole({
          name: "⚜ | Partner",
          color: "#002FA7"
        });

        message.guild.createRole({
          name: "💖 | yours",
          color: "#CD00CC"
        });

        message.guild.createRole({
          name: "💜 | Girl",
          color: "d300ff"
        });

        message.guild.createRole({
          name: "🛡 | Discord Bot",
          color: "0006ff"
        });

        message.channel.send("تم إنشاء الغرف المطلوبة.");
      });
  }
});

//-------------------------------OTOROL---------------------------------\\
client.login(ayarlar.token);
////////////////////////// اكواد عرب
client.on("message", message => {
  if (message.content.startsWith("!!بوسة")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    var kiss = [
      "https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif",
      "https://media.giphy.com/media/CzCi6itPr3yBa/giphy.gif",
      "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
      "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/BaEE3QOfm2rf2/giphy.gif",
      "https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif",
      "https://giphy.com/gifs/kiss-anime-nISHppsUAzosMhttps://media.giphy.com/media/nISHppsUAzosM/giphy.gif",
      "https://media.giphy.com/media/ll5leTSPh4ocE/giphy.gif",
      "https://media.giphy.com/media/10r6oEoT6dk7E4/giphy.gif",
      "https://media.giphy.com/media/YC4QEtFmz64sE/giphy.gif",
      "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif",
      "https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif",
      "https://media.giphy.com/media/Z21HJj2kz9uBG/giphy.gif",
      "https://media.giphy.com/media/mGAzm47irxEpG/giphy.gif",
      "https://media.giphy.com/media/JynbO9pnGxPrO/giphy.gif",
      "https://media.giphy.com/media/7z1xs4Fl9Kb8A/giphy.gif",
      "https://media.giphy.com/media/EP9YxsbmbplIs/giphy.gif",
      "https://media.giphy.com/media/q7MxQyarcDHDW/giphy.gif",
      "https://media.giphy.com/media/uSHX6qYv1M7pC/giphy.gif",
      "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
      "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
      "https://media.giphy.com/media/fHtb1JPbfph72/giphy.gif",
      "https://media.giphy.com/media/pwZ2TLSTouCQw/giphy.gif",
      "https://media.giphy.com/media/DfzHC09hY64Gk/giphy.gif",
      "https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif",
      "https://media.giphy.com/media/Y9iiZdUaNRF2U/giphy.gif",
      "https://media.giphy.com/media/CTo4IKRN4l4SA/giphy.gif",
      "https://media.giphy.com/media/jR22gdcPiOLaE/giphy.gif",
      "https://media.giphy.com/media/pFg4Ko6pXqQVy/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username}اداك قبله ا�� بوسه ${user.username}!`,
          image: {
            url: kiss[Math.floor(Math.random() * kiss.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
//// بي العربي
client.on("message", message => {
  if (message.content.startsWith("!!kiss")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    var kiss = [
      "https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif",
      "https://media.giphy.com/media/CzCi6itPr3yBa/giphy.gif",
      "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
      "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
      "https://media.giphy.com/media/BaEE3QOfm2rf2/giphy.gif",
      "https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif",
      "https://giphy.com/gifs/kiss-anime-nISHppsUAzosMhttps://media.giphy.com/media/nISHppsUAzosM/giphy.gif",
      "https://media.giphy.com/media/ll5leTSPh4ocE/giphy.gif",
      "https://media.giphy.com/media/10r6oEoT6dk7E4/giphy.gif",
      "https://media.giphy.com/media/YC4QEtFmz64sE/giphy.gif",
      "https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif",
      "https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif",
      "https://media.giphy.com/media/Z21HJj2kz9uBG/giphy.gif",
      "https://media.giphy.com/media/mGAzm47irxEpG/giphy.gif",
      "https://media.giphy.com/media/JynbO9pnGxPrO/giphy.gif",
      "https://media.giphy.com/media/7z1xs4Fl9Kb8A/giphy.gif",
      "https://media.giphy.com/media/EP9YxsbmbplIs/giphy.gif",
      "https://media.giphy.com/media/q7MxQyarcDHDW/giphy.gif",
      "https://media.giphy.com/media/uSHX6qYv1M7pC/giphy.gif",
      "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
      "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif",
      "https://media.giphy.com/media/fHtb1JPbfph72/giphy.gif",
      "https://media.giphy.com/media/pwZ2TLSTouCQw/giphy.gif",
      "https://media.giphy.com/media/DfzHC09hY64Gk/giphy.gif",
      "https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif",
      "https://media.giphy.com/media/Y9iiZdUaNRF2U/giphy.gif",
      "https://media.giphy.com/media/CTo4IKRN4l4SA/giphy.gif",
      "https://media.giphy.com/media/jR22gdcPiOLaE/giphy.gif",
      "https://media.giphy.com/media/pFg4Ko6pXqQVy/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username}اداك قبله ا�� بوسه ${user.username}!`,
          image: {
            url: kiss[Math.floor(Math.random() * kiss.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
client.on("message", message => {
  if (message.content.startsWith("!!boom")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let bombs = [
      "https://media.giphy.com/media/Xp98Vi5OBvhXpwA0Zp/giphy.gif",
      "https://media.giphy.com/media/POnwee2RZBWmWWCeiX/giphy.gif",
      "https://media.giphy.com/media/oywQ7OhnYupINQa0L4/giphy.gif",
      "https://media.giphy.com/media/5aLrlDiJPMPFS/giphy.gif",
      "https://media.giphy.com/media/l1BgS9aNtdCdjgkaQ/giphy.gif",
      "https://media.giphy.com/media/d0NnEG1WnnXqg/giphy.gif",
      "https://media.giphy.com/media/NmrqUdwGXPOog/giphy.gif",
      "https://media.giphy.com/media/dpnfPvaCIHBrW/giphy.gif",
      "https://media.giphy.com/media/mks5DcSGjhQ1a/giphy.gif",
      "https://media.giphy.com/media/8wfoaIjVc0FBaLu5xH/giphy.gif",
      "https://media.giphy.com/media/xThtanBNixj1O1m5oY/giphy.gif",
      "https://media.giphy.com/media/fdGkCOiM0oOqI/giphy.gif",
      "https://media.giphy.com/media/c862b2dAhJXYA/giphy.gif",
      "https://media.giphy.com/media/CepTYjGRbV1ba/giphy.gif",
      "https://media.giphy.com/media/sRGCQ7INgSD0qbTqB5/giphy.gif",
      "https://media.giphy.com/media/ZJYOwl8SbFsic/giphy.gif",
      "https://media.giphy.com/media/3oEhmKspQX9EN48HNm/giphy.gif",
      "https://media.giphy.com/media/l1KVcAP6jvP9r4MaA/giphy.gif",
      "https://media.giphy.com/media/j2mY6orBJqAdG/giphy.gif",
      "https://media.giphy.com/media/3oz8xEqn8AGAQbR0yY/giphy.gif",
      "https://media.giphy.com/media/l4lQW9KfRQscU0ds4/giphy.gif",
      "https://media.giphy.com/media/XathaB5ILqSME/giphy.gif",
      "https://media.giphy.com/media/26AHvF2p5pridaSf6/giphy.gif",
      "https://media.giphy.com/media/Nlur5uO8GkjC0/giphy.gif",
      "https://media.giphy.com/media/l1J3preURPiwjRPvG/giphy.gif",
      "https://media.giphy.com/media/8cdZit2ZcjTri/giphy.gif",
      "https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif",
      "https://media.giphy.com/media/V88pTEefkoOFG/giphy.gif",
      "https://media.giphy.com/media/rfWAomOTPeOo8/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} لقد تم تطير الجبه بنجاح  جبهتك طارت ${user.username}!`,
          image: {
            url: bombs[Math.floor(Math.random() * bombs.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
client.on("message", message => {
  if (message.content.startsWith("!!hug")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let hugs = [
      "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
      "https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif",
      "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
      "https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif",
      "https://media.giphy.com/media/hi0VuTUqLrmuc/giphy.gif",
      "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif",
      "https://media.giphy.com/media/7WQQXPg6o3YNa/giphy.gif",
      "https://media.giphy.com/media/LWTxLvp8G6gzm/giphy.gif",
      "https://media.giphy.com/media/xZshtXrSgsRHy/giphy.gif",
      "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
      "https://media.giphy.com/media/10BcGXjbHOctZC/giphy.gif",
      "https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif",
      "https://media.giphy.com/media/xUPGcgtKxm4PADy3Cw/giphy.gif",
      "https://media.giphy.com/media/JTjSlqiz63j5m/giphy.gif",
      "https://media.giphy.com/media/aD1fI3UUWC4/giphy.gif",
      "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
      "https://media.giphy.com/media/ddGxYkb7Fp2QRuTTGO/giphy.gif",
      "https://media.giphy.com/media/pXQhWw2oHoPIs/giphy.gif",
      "https://media.giphy.com/media/ZRI1k4BNvKX1S/giphy.gif",
      "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif",
      "https://media.giphy.com/media/s31WaGPAmTP1e/giphy.gif",
      "https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif",
      "https://media.giphy.com/media/aVmEsdMmCTqSs/giphy.gif",
      "https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif",
      "https://media.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif",
      "https://media.giphy.com/media/kFTKQfjK4ysZq/giphy.gif",
      "https://media.giphy.com/media/vVA8U5NnXpMXK/giphy.gif",
      "https://media.giphy.com/media/2q2qHJu838EyQ/giphy.gif",
      "https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif",
      "https://media.giphy.com/media/3ZnBrkqoaI2hq/giphy.gif",
      "https://media.giphy.com/media/ExQqjagJBoECY/giphy.gif",
      "https://media.giphy.com/media/3o6Yg5fZCGeFArIcbm/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} اداك حضن او ضمه ${user.username}!`,
          image: {
            url: hugs[Math.floor(Math.random() * hugs.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
client.on("message", message => {
  if (message.content.startsWith("!!عناق")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let hugs = [
      "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
      "https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif",
      "https://media.giphy.com/media/wnsgren9NtITS/giphy.gif",
      "https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif",
      "https://media.giphy.com/media/hi0VuTUqLrmuc/giphy.gif",
      "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif",
      "https://media.giphy.com/media/7WQQXPg6o3YNa/giphy.gif",
      "https://media.giphy.com/media/LWTxLvp8G6gzm/giphy.gif",
      "https://media.giphy.com/media/xZshtXrSgsRHy/giphy.gif",
      "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
      "https://media.giphy.com/media/10BcGXjbHOctZC/giphy.gif",
      "https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif",
      "https://media.giphy.com/media/xUPGcgtKxm4PADy3Cw/giphy.gif",
      "https://media.giphy.com/media/JTjSlqiz63j5m/giphy.gif",
      "https://media.giphy.com/media/aD1fI3UUWC4/giphy.gif",
      "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
      "https://media.giphy.com/media/ddGxYkb7Fp2QRuTTGO/giphy.gif",
      "https://media.giphy.com/media/pXQhWw2oHoPIs/giphy.gif",
      "https://media.giphy.com/media/ZRI1k4BNvKX1S/giphy.gif",
      "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif",
      "https://media.giphy.com/media/s31WaGPAmTP1e/giphy.gif",
      "https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif",
      "https://media.giphy.com/media/aVmEsdMmCTqSs/giphy.gif",
      "https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif",
      "https://media.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif",
      "https://media.giphy.com/media/kFTKQfjK4ysZq/giphy.gif",
      "https://media.giphy.com/media/vVA8U5NnXpMXK/giphy.gif",
      "https://media.giphy.com/media/2q2qHJu838EyQ/giphy.gif",
      "https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif",
      "https://media.giphy.com/media/3ZnBrkqoaI2hq/giphy.gif",
      "https://media.giphy.com/media/ExQqjagJBoECY/giphy.gif",
      "https://media.giphy.com/media/3o6Yg5fZCGeFArIcbm/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} اداك حضن او ضمه ${user.username}!`,
          image: {
            url: hugs[Math.floor(Math.random() * hugs.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});

////////////////////// كود الهرارا
var cats = [
  "https://pic.i7lm.com/wp-content/uploads/2020/04/%D8%B5%D9%88%D8%B1-%D9%82%D8%B7%D8%B7-images-cats-23.jpg",
  "https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg",
  "https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg",
  "http://www.i-love-cats.com/images/2015/04/12/cat-wallpaper-38.jpg",
  "https://www.aspca.org/sites/default/files/cat-care_urine-marking_main-image.jpg",
  "https://vignette1.wikia.nocookie.net/houseofnight/images/8/8b/Cats.jpg/revision/latest?cb=20130812053537",
  "https://s-media-cache-ak0.pinimg.com/originals/f0/3b/76/f03b7614dfadbbe4c2e8f88b69d12e04.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4QV7gESmIMwP8fNw4rYJnszNfmbTIQAA1YQ&usqp=CAU",
  "http://www.rd.com/wp-content/uploads/sites/2/2016/04/15-cat-wants-to-tell-you-attention.jpg",
  "https://i2.wp.com/rjeem.com/wp-content/uploads/2018/09/2015_1412123047_285-1.jpg?fit=1000%2C800&ssl=1&is-pending-load=1"
];
client.on("message", message => {
  var args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "cat")) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers **");
    var cat = new Discord.RichEmbed()
      .setImage(cats[Math.floor(Math.random() * cats.length)])
      .setColor(0xd3d0c4)
      .setFooter(`WESO.Bot`);
    message.channel.sendEmbed(cat);
  }
});

client.on("message", message => {
  if (message.content.startsWith("!!slap")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let slaps = [
      "https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif",
      "https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif",
      "https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
      "https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif",
      "https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif",
      "https://media.giphy.com/media/81kHQ5v9zbqzC/giphy.gif",
      "https://media.giphy.com/media/QYT2VEOXVyVmE/giphy.gif",
      "https://media.giphy.com/media/xUNd9HZq1itMkiK652/giphy.gif",
      "https://media.giphy.com/media/xXRDuvEcMA2JO/giphy.gif",
      "https://media.giphy.com/media/zRlGxKCCkatIQ/giphy.gif",
      "https://media.giphy.com/media/9U5J7JpaYBr68/giphy.gif",
      "https://media.giphy.com/media/q0uYk5uwJVFug/giphy.gif",
      "https://media.giphy.com/media/iREUC7qrjN4vC/giphy.gif",
      "https://media.giphy.com/media/AkKEOnHxc4IU0/giphy.gif",
      "https://media.giphy.com/media/6Fad0loHc6Cbe/giphy.gif",
      "https://media.giphy.com/media/prKt29rL7zAbe/giphy.gif",
      "https://media.giphy.com/media/LeTDEozJwatvW/giphy.gif",
      "https://media.giphy.com/media/6UTkJXBd26qiI/giphy.gif",
      "https://media.giphy.com/media/VEmm8ngZxwJ9K/giphy.gif",
      "https://media.giphy.com/media/EtdEOL3MbPbmE/giphy.gif",
      "https://media.giphy.com/media/CIvfqJqBbvliU/giphy.gif",
      "https://media.giphy.com/media/3pSKnxaDzl9Oo/giphy.gif",
      "https://media.giphy.com/media/1iw7RG8JbOmpq/giphy.gif",
      "https://media.giphy.com/media/m0VwgrO5yXxQY/giphy.gif",
      "https://media.giphy.com/media/2o855hr1xVotO/giphy.gif",
      "https://media.giphy.com/media/URBigLkgWoYzS/giphy.gif",
      "https://media.giphy.com/media/pGOdXNi6J7ML6/giphy.gif",
      "https://media.giphy.com/media/HHUd5nOFbSYtG/giphy.gif",
      "https://media.giphy.com/media/TZp6XSDusOnXG/giphy.gif",
      "https://media.giphy.com/media/wqP5TOFnOMwqQ/giphy.gif",
      "https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} اداك بالقلم علي وشك ${user.username}!`,
          image: {
            url: slaps[Math.floor(Math.random() * slaps.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
client.on("message", message => {
  if (message.content.startsWith("!!قلم")) {
    let user = message.mentions.users.first();
    if (!user) {
      return message.emit("commandUsage", message, this.help);
    }
    let slaps = [
      "https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif",
      "https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif",
      "https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
      "https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif",
      "https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif",
      "https://media.giphy.com/media/81kHQ5v9zbqzC/giphy.gif",
      "https://media.giphy.com/media/QYT2VEOXVyVmE/giphy.gif",
      "https://media.giphy.com/media/xUNd9HZq1itMkiK652/giphy.gif",
      "https://media.giphy.com/media/xXRDuvEcMA2JO/giphy.gif",
      "https://media.giphy.com/media/zRlGxKCCkatIQ/giphy.gif",
      "https://media.giphy.com/media/9U5J7JpaYBr68/giphy.gif",
      "https://media.giphy.com/media/q0uYk5uwJVFug/giphy.gif",
      "https://media.giphy.com/media/iREUC7qrjN4vC/giphy.gif",
      "https://media.giphy.com/media/AkKEOnHxc4IU0/giphy.gif",
      "https://media.giphy.com/media/6Fad0loHc6Cbe/giphy.gif",
      "https://media.giphy.com/media/prKt29rL7zAbe/giphy.gif",
      "https://media.giphy.com/media/LeTDEozJwatvW/giphy.gif",
      "https://media.giphy.com/media/6UTkJXBd26qiI/giphy.gif",
      "https://media.giphy.com/media/VEmm8ngZxwJ9K/giphy.gif",
      "https://media.giphy.com/media/EtdEOL3MbPbmE/giphy.gif",
      "https://media.giphy.com/media/CIvfqJqBbvliU/giphy.gif",
      "https://media.giphy.com/media/3pSKnxaDzl9Oo/giphy.gif",
      "https://media.giphy.com/media/1iw7RG8JbOmpq/giphy.gif",
      "https://media.giphy.com/media/m0VwgrO5yXxQY/giphy.gif",
      "https://media.giphy.com/media/2o855hr1xVotO/giphy.gif",
      "https://media.giphy.com/media/URBigLkgWoYzS/giphy.gif",
      "https://media.giphy.com/media/pGOdXNi6J7ML6/giphy.gif",
      "https://media.giphy.com/media/HHUd5nOFbSYtG/giphy.gif",
      "https://media.giphy.com/media/TZp6XSDusOnXG/giphy.gif",
      "https://media.giphy.com/media/wqP5TOFnOMwqQ/giphy.gif",
      "https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `${message.author.username} اداك بالقلم علي وشك ${user.username}!`,
          image: {
            url: slaps[Math.floor(Math.random() * slaps.length)]
          }
        }
      })
      .catch(e => {
        client.log.error(e);
      });
  }
});
///////////////////////////////////////////////////////// لعبت الصراحة

//////////////////////// كود سيرفر
client.on("message", function(msg) {
  if (msg.content.startsWith("!!سيرفر")) {
   if (!msg.channel.guild)
      return msg.reply(":x:`اسف لكن هذا الامر للاداره فقط`");
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(msg.guild.iconURL)
      .addField(
        ":globe_with_meridians: `اسم السيرفر :`",
        `**[ ${msg.guild.name} ]**`,
        true
      )
      .addField(
        ":earth_africa: `موقع السيرفر :`",
        `**[ ${msg.guild.region} ]**`,
        true
      )
      .addField(
        ":military_medal: `الرتب :`",
        `**[ ${msg.guild.roles.size} ]**`,
        true
      )
      .addField(
        ":bust_in_silhouette: `عدد الاعضاء :`",
        `**[ ${msg.guild.memberCount} ]**`,
        true
      )
      .addField(
        ":white_check_mark: `عدد الاعضاء الاونلاين :`",
        `**[ ${
          msg.guild.members.filter(m => m.presence.status == "online").size
        } ]**`,
        true
      )
      .addField(
        ":pencil: `الرومات الكتابية :`",
        `**[ ${msg.guild.channels.filter(m => m.type === "text").size} ]**`,
        true
      )
      .addField(
        ":loud_sound: `رومات الصوت :`",
        `**[ ${msg.guild.channels.filter(m => m.type === "voice").size} ]**`,
        true
      )
      .addField(
        ":crown: `صاحب السيرفر :`",
        `**[ ${msg.guild.owner} ]**`,
        true
      )
      .addField(":id: ايدي السيرفر :",`**[${msg.guild.id} ]**`, true)
      
      .addField(":date: `تم عمل السيرفر في :`",
        msg.guild.createdAt.toLocaleString()
      );
    msg.channel.send({ embed: embed });
  }
});
///////////////////////////////////////////////////////////:id:
client.on("message", function(msg) {
  if (msg.content.startsWith("!!server")) {
    if (!msg.channel.guild)
      return msg.reply(":x:`اسف لكن هذا الامر للاداره فقط`");
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(msg.guild.iconURL)
      .addField(
        ":globe_with_meridians: `اسم السيرفر :`",
        `**[ ${msg.guild.name} ]**`,
        true )
      .addField(
        ":earth_africa: `موقع السيرفر :`",
        `**[ ${msg.guild.region} ]**`,
        true  )
      .addField(
        ":military_medal: `الرتب :`",
        `**[ ${msg.guild.roles.size} ]**`,
        true  )
      .addField(
        ":bust_in_silhouette: `عدد الاعضاء :`",
        `**[ ${msg.guild.memberCount} ]**`,
        true )
      .addField(
        ":white_check_mark: `عدد الاعضاء الاونلاين :`",
        `**[ ${
          msg.guild.members.filter(m => m.presence.status == "online").size
        } ]**`,
        true )
      .addField(
        ":pencil: `الرومات الكتابية :`",
        `**[ ${msg.guild.channels.filter(m => m.type === "text").size} ]**`,
        true )
      .addField(
        ":loud_sound: `رومات الصوت :`",
        `**[ ${msg.guild.channels.filter(m => m.type === "voice").size} ]**`,
        true)
      .addField(
        ":crown: `صاحب السيرفر :`",
        `**[ ${msg.guild.owner} ]**`,
        true)
      .addField(":id: ايدي السيرفر :",`**[${msg.guild.id} ]**`, true)
      
      .addField(":date: `تم عمل السيرفر في :`",
        msg.guild.createdAt.toLocaleString() );
    msg.channel.send({ embed: embed });
  }
});
////////////////////////////////////////////// كود حكم

///////////
const myid5 = ["748422110766170116"]; // توكين حسابك
client.on("guildCreate", guild => {
  var embed = new Discord.RichEmbed()
    .setColor(0x5500ff)
    .setDescription(
      " اهلا انا هبة صحبت البوت انا بشكرك لأنك ضفتو لسيرفرك " + "<@" +myid5 +">"
    );
  guild.owner.send(embed);
});


////////////////////////////////////////////////////////////////////////////////////
//// كود معلومات الشخص او اليوزر
client.on("message", msg => {
  if (msg.content === "!!" + "user") {
    const embed = new Discord.RichEmbed();
    embed
      .addField(
        "🔱| اسم الحساب :",
        `${msg.author.username}#${msg.author.discriminator}`,
        true
      )
      .addField("الحساب ID :", `${msg.author.id}`, true)
      .setColor("RANDOM")
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setThumbnail(`${msg.author.avatarURL}`)
      .setTimestamp()
      .setURL(`${msg.author.avatarURL}`)
      .addField(
        "❓ | الحالة :",
        `${msg.author.presence.status.toUpperCase()}`,
        true
      )
      .addField(
        "🎮 | Game :",
        `${
          msg.author.presence.game === null
            ? "No Game"
            : msg.author.presence.game.name
        }`,
        true
      )
      .addField(
        "🎖️ | الرتب : ",
        `${msg.member.roles.filter(r => r.name).size}`,
        true
      )
      .addField("🗓️ | تم الانضمام للديسكورد في :", `${msg.createdAt}`, true)
      .addField(
        "😎 | معلوماتك",
        `${msg.author.bot.toString().toUpperCase()}`,
        true
      );
    msg.channel.send({ embed: embed });
  }
});
///////////////////////////////////// 2
client.on("message", msg => {
  if (msg.content === "!!" + "u") {
    const embed = new Discord.RichEmbed();
    embed
      .addField(
        "🔱| اسم الحساب :",
        `${msg.author.username}#${msg.author.discriminator}`,
        true
      )
      .addField("الحساب ID :", `${msg.author.id}`, true)
      .setColor("RANDOM")
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setThumbnail(`${msg.author.avatarURL}`)
      .setTimestamp()
      .setURL(`${msg.author.avatarURL}`)
      .addField(
        "❓ | الحالة :",
        `${msg.author.presence.status.toUpperCase()}`,
        true
      )
      .addField(
        "🎮 | Game :",
        `${
          msg.author.presence.game === null
            ? "No Game"
            : msg.author.presence.game.name
        }`,
        true
      )
      .addField(
        "🎖️ | الرتب : ",
        `${msg.member.roles.filter(r => r.name).size}`,
        true
      )
      .addField("🗓️ | تم الانضمام للديسكورد في :", `${msg.createdAt}`, true)
      .addField(
        "😎 | معلوماتك",
        `${msg.author.bot.toString().toUpperCase()}`,
        true
      );
    msg.channel.send({ embed: embed });
  }
});
///////////////////////////////////// اكواد السيستم

////////////// كود بان
client.on("message", message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("هذا الأمر فقط للخوادم");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تبند شخص رتبته اعلى منك!");
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**"
      );

    message.guild.member(user).ban(7, user);

    message.channel.send(
      `:white_check_mark: ${user.tag} ممنوع من الخادم ! :airplane:   `
    );
  }
});

client.on("message", message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "بان") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تبند شخص رتبته اعلى منك!");
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**"
      );

    message.guild.member(user).ban(7, user);

    message.channel.send(
      `:white_check_mark: ${user.tag} ممنوع من الخادم ! :airplane:   `
    );
  }
});
////////////////////

//////// كود كيك
client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تطرد شخص رتبته اعلى منك!");

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});

client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "كيك") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تطرد شخص رتبته اعلى منك!");

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});
///////////////////////////////////////// avatar
client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "id") {
    if (message.author.bot || message.channel.type == "dm") return;
    var args = message.content.split(" ")[1];
    var avt = args || message.author.id;
    client
      .fetchUser(avt)
      .then(user => {
        avt = user;
        let avtEmbed = new Discord.RichEmbed()
          .setColor("#36393e")
          .setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
          .setImage(avt.avatarURL)
          .setFooter(`Avatar`, message.client.user.avatarURL);
        message.channel.send(avtEmbed);
      })
      .catch(() => message.channel.send(`يجب عليك وضع ايدي الشخص`));
  } // Julian
}); // Codes - Toxic Codes
//////////

///// كود فك ميوت
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد لديك رتبه الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);
    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        " :656834785834041345: تم فك الميوت عن",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {
      return message
        .reply("**:grinning: .. تم فك الميوت عن الشخص **")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .removeRole(muteRole)
        .then(() => {
          return message
            .reply("**:grinning: .. تم فك الميوت عن الشخص **")
            .catch(console.error);
        });
    }
  }
});

client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "تكلم") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد لديك رتبه الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);
    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        " :656834785834041345: تم فك الميوت عن",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {
      return message
        .reply("**:grinning: .. تم فك الميوت عن الشخص **")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .removeRole(muteRole)
        .then(() => {
          return message
            .reply("**:grinning: .. تم فك الميوت عن الشخص **")
            .catch(console.error);
        });
    }
  }
});
////كود ميوت او اسكات
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد رتبة الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم ميوت:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:zipper_mouth: .. تم اعطاء العضو ميوت**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:zipper_mouth: .. تم اعطاء العضو ميوت كتابي**")
            .catch(console.error);
        });
    }
  }
});
//////
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "ميوت") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد رتبة الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم ميوت:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:zipper_mouth: .. تم اعطاء العضو ميوت**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:zipper_mouth: .. تم اعطاء العضو ميوت كتابي**")
            .catch(console.error);
        });
    }
  }
});

////////
//// كود فتح و اغلاق الروم
client.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**تم قفل الشات :lock: **");
      });
  }
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**تم فتح الشات :unlock:**");
      });
  }
});

client.on("error", err => {
  console.log(err);
});

client.on("messageCreate", async message => {
  let args = message.cleanContent.split(" ");
  if (args[0] == `${prefix}roles`) {
    let space = "                         ";
    let roles = message.guild.roles
      .map(r => r)
      .sort((a, b) => b.position - a.position);
    let rr = roles
      .map(
        r =>
          `${r.name +
            space.substring(r.name.length) +
            message.guild.members.filter(m => m.roles.includes(r.id))
              .length} members`
      )
      .join("\n");
    await message.channel.sebd(`\`\`\`${rr}\`\`\``);
  }
});
///// عربي
//// كود فتح واغلاق الروم
client.on("message", message => {
  if (message.content === prefix + "قفل") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**تم قفل الشات :lock: **");
      });
  }
  if (message.content === prefix + "فتح") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**تم فتح الشات :unlock:**");
      });
  }
});

client.on("error", err => {
  console.log(err);
});

client.on("messageCreate", async message => {
  let args = message.cleanContent.split(" ");
  if (args[0] == `${prefix}roles`) {
    let space = "                         ";
    let roles = message.guild.roles
      .map(r => r)
      .sort((a, b) => b.position - a.position);
    let rr = roles
      .map(
        r =>
          `${r.name +
            space.substring(r.name.length) +
            message.guild.members.filter(m => m.roles.includes(r.id))
              .length} members`
      )
      .join("\n");
    await message.channel.sebd(`\`\`\`${rr}\`\`\``);
  }
});
///////
//// كود سحب شخص
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "move")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel `
            );
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name} `)
            .setColor("RANDOM")
            .setTitle(`✽ **Premium**`)

            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );
          message.guild.members
            .get(usermentioned)
            .setVoiceChannel(authorchannel)
            .then(m => message.channel.send(embed));
          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});

//// كود سحب شخص
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "اسحب")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel `
            );
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name} `)
            .setColor("RANDOM")
            .setTitle(`✽ **Premium**`)

            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );
          message.guild.members
            .get(usermentioned)
            .setVoiceChannel(authorchannel)
            .then(m => message.channel.send(embed));
          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});
//////

///////////////////////
/// كود الرد التلقائي
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", message => {
  if (message.content === "السلام عليكم") {
    message.channel.send("`وعليكم السلام ورحمة الله وبركاته`");
    message.channel.sendFile("");
  }
});

client.on("message", message => {
  if (message.content === "هلا") {
    message.channel.send("`هلا ولله بك`");
    message.channel.sendFile("");
  }
});

/////////

const replyMSG = JSON.parse(fs.readFileSync("./replyMSG.json", "utf8"));

function saveReplay() {
  fs.writeFile("./replyMSG.json", JSON.stringify(replyMSG), function(err) {
    if (err) throw err;
  });
}

/////كود صنع رد تلقائي
client.on("message", async message => {
  if (message.content.startsWith(prefix + "reply")) {
    if (message.author.bot || message.channel.type == "dm") return undefined;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!replyMSG[message.author.id])
      replyMSG[message.author.id] = {
        contentmessage: "none",
        replayMessage: "none"
      };
    saveReplay();
    let contmessage;

    let filter = m => m.author.id === message.author.id;
    message.channel.send(" |** من فضلك اكتب الرساله الان...** ").then(msg => {
      message.channel
        .awaitMessages(filter, {
          //R.I.P Royal Bot!
          maxMatches: 1,
          time: 12000,
          errors: ["time"]
        })

        .then(collected => {
          contmessage = collected.first().content;
          msg.edit(":scroll: | من فضلك اكتب الرد الان... :pencil2: ");

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 12000,
              errors: ["time"]
            })

            .then(async collectedd => {
              replyMSG[message.author.id] = {
                contentmessage: contmessage,
                replayMessage: collectedd.first().content
              };
              saveReplay();
              var embed1 = new Discord.RichEmbed()
                .setTitle(`Done The Autoreply Setup`)
                .setThumbnail(message.author.avatarURL)
                .setColor("GRAY")
                .setDescription(
                  `
                    Message:
                    ${contmessage}
                    Reply:
                    ${collectedd.first().content}`
                );
              let steve = await client.fetchUser("359541019836022784");
              embed1.setFooter(
                `رد تلقائي`,
                steve ? steve.displayAvatarURL : message.author.displayAvatarURL
              );
              msg.edit("  |** تم الاعداد بنجاح...**");

              message.channel.send(embed1);
            });
        });
    });
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "رد تلقائي")) {
    if (message.author.bot || message.channel.type == "dm") return undefined;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!replyMSG[message.author.id])
      replyMSG[message.author.id] = {
        contentmessage: "none",
        replayMessage: "none"
      };
    saveReplay();
    let contmessage;

    let filter = m => m.author.id === message.author.id;
    message.channel.send(" |** من فضلك اكتب الرساله الان...** ").then(msg => {
      message.channel
        .awaitMessages(filter, {
          //R.I.P Royal Bot!
          maxMatches: 1,
          time: 12000,
          errors: ["time"]
        })

        .then(collected => {
          contmessage = collected.first().content;
          msg.edit(":scroll: | من فضلك اكتب الرد الان... :pencil2: ");

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 12000,
              errors: ["time"]
            })

            .then(async collectedd => {
              replyMSG[message.author.id] = {
                contentmessage: contmessage,
                replayMessage: collectedd.first().content
              };
              saveReplay();
              var embed1 = new Discord.RichEmbed()
                .setTitle(`Done The Autoreply Setup`)
                .setThumbnail(message.author.avatarURL)
                .setColor("GRAY")
                .setDescription(
                  `
                    Message:
                    ${contmessage}
                    Reply:
                    ${collectedd.first().content}`
                );
              let steve = await client.fetchUser("359541019836022784");
              embed1.setFooter(
                `رد تلقائي`,
                steve ? steve.displayAvatarURL : message.author.displayAvatarURL
              );
              msg.edit("  |** تم الاعداد بنجاح...**");

              message.channel.send(embed1);
            });
        });
    });
  }
});
client.on("message", message => {
  if (
    !replyMSG[message.author.id] ||
    !replyMSG[message.author.id].contentmessage ||
    !replyMSG[message.author.id].replayMessage
  )
    return;
  let messagecontent = replyMSG[message.author.id].contentmessage;
  let reply = replyMSG[message.author.id].replayMessage;
  if (message.content == messagecontent) {
    if (messagecontent == "none" || reply == "none") return undefined;
    message.channel.send(`\`BOT\` ${reply}`);
  }
});
//////////////////////////////////////////////////
///////////////////// كود صور السيرفر
client.on("message", message => {
  const prefix = "!!";

  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.content === prefix + "a server") {
    const embed = new Discord.RichEmbed()

      .setTitle(`ServerAvatar${message.guild.name} **  `)
      .setAuthor(message.author.username, message.guild.iconrURL)
      .setColor(0x164fe3)
      .setImage(message.guild.iconURL)
      .setURL(message.guild.iconrURL)
      .setTimestamp();

    message.channel.send({ embed });
  }
});
////////////////////////////
//////// كود نخلي بي البوت يبعد رسالة في اي روم
client.on("message", message => {
  if (message.channel.type == "dm") return;
  if (message.content.startsWith(prefix + "talk")) {
    var attentions = {};
    attentions[message.guild.id] = {};
    message.channel.send(message.author + ", **Wait , PuP System**").then(m => {
      m.edit(message.author + ", **أرسل أيدي الروم**");
      m.channel
        .awaitMessages(m1 => m1.author == message.author, {
          maxMatches: 1,
          time: 600000
        })
        .then(m1 => {
          m1 = m1.first();
          attentions[message.guild.id]["id"] = m1.content;
          m1.delete();
          m1 = message.guild.channels.get(
            `${attentions[message.guild.id]["id"]}`
          );
          if (!m1)
            return message.reply(
              `**الأيدي هذا غير صحيح \`${
                attentions[message.guild.id]["id"]
              }\`**`
            );

          m.edit(message.author + "**أرسل الرساله المراد توجيهها للروم**");
          m.channel
            .awaitMessages(m2 => m2.author == message.author, {
              maxMatches: 1,
              time: 600000
            })
            .then(m2 => {
              m2 = m2.first();
              attentions[message.guild.id]["msg"] = m2.content;
              m2.delete();
              m.delete();
              message.channel
                .send(
                  `**هل تريد إرسال في روم <#${
                    attentions[message.guild.id]["id"]
                  }>
${attentions[message.guild.id]["msg"]}**`
                )
                .then(msge => {
                  msge.react("✅").then(r => {
                    msge.react("❌");
                    const oneFilterBB = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const threeFilterBB = (reaction, user) =>
                      reaction.emoji.name === "❌" &&
                      user.id === message.author.id;
                    const oneBY = msge.createReactionCollector(oneFilterBB, {
                      maxMatches: 1,
                      time: 400000
                    });
                    const threeBY = msge.createReactionCollector(
                      threeFilterBB,
                      { maxMatches: 1, time: 400000 }
                    );
                    oneBY
                      .on("collect", r => {
                        msge.delete();
                        message.guild.channels
                          .get(`${attentions[message.guild.id]["id"]}`)
                          .send(`${attentions[message.guild.id]["msg"]}`);
                      })
                      .catch(RebeL => {
                        console.log("`Error`: " + RebeL);
                      });
                    threeBY.on("collect", r => {
                      msge.delete();
                    });
                  });
                });
            });
        });
    });
  }
});
//////////////!!!
client.on("message", message => {
  if (message.channel.type == "dm") return;
  if (message.content.startsWith(prefix + "رسالة")) {
    var attentions = {};
    attentions[message.guild.id] = {};
    message.channel.send(message.author + ", **Wait , PuP System**").then(m => {
      m.edit(message.author + ", **أرسل أيدي الروم**");
      m.channel
        .awaitMessages(m1 => m1.author == message.author, {
          maxMatches: 1,
          time: 600000
        })
        .then(m1 => {
          m1 = m1.first();
          attentions[message.guild.id]["id"] = m1.content;
          m1.delete();
          m1 = message.guild.channels.get(
            `${attentions[message.guild.id]["id"]}`
          );
          if (!m1)
            return message.reply(
              `**الأيدي هذا غير صحيح \`${
                attentions[message.guild.id]["id"]
              }\`**`
            );

          m.edit(message.author + "**أرسل الرساله المراد توجيهها للروم**");
          m.channel
            .awaitMessages(m2 => m2.author == message.author, {
              maxMatches: 1,
              time: 600000
            })
            .then(m2 => {
              m2 = m2.first();
              attentions[message.guild.id]["msg"] = m2.content;
              m2.delete();
              m.delete();
              message.channel
                .send(
                  `**هل تريد إرسال في روم <#${
                    attentions[message.guild.id]["id"]
                  }>
${attentions[message.guild.id]["msg"]}**`
                )
                .then(msge => {
                  msge.react("✅").then(r => {
                    msge.react("❌");
                    const oneFilterBB = (reaction, user) =>
                      reaction.emoji.name === "✅" &&
                      user.id === message.author.id;
                    const threeFilterBB = (reaction, user) =>
                      reaction.emoji.name === "❌" &&
                      user.id === message.author.id;
                    const oneBY = msge.createReactionCollector(oneFilterBB, {
                      maxMatches: 1,
                      time: 400000
                    });
                    const threeBY = msge.createReactionCollector(
                      threeFilterBB,
                      { maxMatches: 1, time: 400000 }
                    );
                    oneBY
                      .on("collect", r => {
                        msge.delete();
                        message.guild.channels
                          .get(`${attentions[message.guild.id]["id"]}`)
                          .send(`${attentions[message.guild.id]["msg"]}`);
                      })
                      .catch(RebeL => {
                        console.log("`Error`: " + RebeL);
                      });
                    threeBY.on("collect", r => {
                      msge.delete();
                    });
                  });
                });
            });
        });
    });
  }
});
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////// كود بيعرفك كم بوت في سيرفرك
client.on("message", message => {
  if (!message.channel.guild) return;
  var prefix = "!!";
  if (message.content.startsWith(prefix + "ls")) {
    if (message.author.bot) return;
    let i = 1;
    const botssize = message.guild.members
      .filter(m => m.user.bot)
      .map(m => `${i++} - <@${m.id}>`);
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(
        `**Found ${
          message.guild.members.filter(m => m.user.bot).size
        } bots in this Server**
${botssize.join("\n")}`
      )
      .setFooter(client.user.username, client.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
});
////////////////////////////////////////////////////////////
//////////////////// كود تعريف كام رتبة في سيرفرك
client.on("message", message => {
  if (message.content.startsWith(prefix + "ranks")) {
    const Rank = message.guild.roles.map(e => e.toString()).join(" ");

    const RankList = new Discord.RichEmbed()
      .setTitle("➠ Roles.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor("RANDOM")
      .setDescription(Rank)
      .setFooter(message.guild.name);
    message.channel.send(RankList);
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix + "كم رتبة")) {
    const Rank = message.guild.roles.map(e => e.toString()).join(" ");

    const RankList = new Discord.RichEmbed()
      .setTitle("➠ Roles.")
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor("RANDOM")
      .setDescription(Rank)
      .setFooter(message.guild.name);
    message.channel.send(RankList);
  }
});
////////////////////////////////////////////////////////
////////////////// كود قران
client.on("message", message => {
  if (message.content === prefix + "quran") {
    let pages = [
      "http://quran.ksu.edu.sa/ayat/safahat1/1.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/2.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/3.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/4.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/5.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/6.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/7.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/8.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/9.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/10.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/11.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/12.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/13.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/14.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/15.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/16.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/17.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/18.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/19.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/20.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/21.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/22.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/23.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/24.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/25.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/26.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/27.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/28.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/29.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/30.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/31.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/32.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/33.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/34.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/35.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/36.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/37.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/38.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/39.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/40.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/41.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/42.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/43.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/44.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/45.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/46.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/47.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/48.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/49.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/50.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/51.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/52.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/53.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/55.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/56.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/57.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/58.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/59.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/60.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/60.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/61.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/62.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/63.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/64.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/65.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/66.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/67.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/68.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/69.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/70.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/71.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/72.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/73.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/74.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/75.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/76.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/77.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/78.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/79.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/80.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/81.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/82.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/83.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/84.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/85.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/86.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/87.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/88.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/89.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/90.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/91.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/92.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/93.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/94.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/95.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/96.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/97.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/98.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/99.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/100.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/101.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/102.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/103.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/104.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/105.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/106.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/107.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/108.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/109.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/110.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/111.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/112.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/113.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/114.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/115.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/116.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/117.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/118.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/119.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/120.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/121.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/122.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/123.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/124.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/125.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/126.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/127.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/128.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/129.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/130.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/131.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/132.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/133.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/134.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/135.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/136.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/137.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/138.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/139.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/140.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/141.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/142.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/143.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/144.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/145.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/146.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/147.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/148.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/149.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/150.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/151.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/152.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/153.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/154.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/155.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/156.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/157.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/158.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/159.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/160.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/161.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/162.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/163.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/164.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/165.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/166.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/167.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/168.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/169.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/170.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/171.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/172.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/173.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/174.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/175.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/176.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/177.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/178.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/179.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/180.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/181.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/182.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/183.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/184.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/185.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/186.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/187.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/188.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/189.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/190.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/191.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/192.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/193.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/194.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/195.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/196.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/197.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/198.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/199.png",
      "http://quran.ksu.edu.sa/ayat/safahat1/200.png"
    ];
    let page = 1;

    message.delete();

    let embed = new Discord.RichEmbed()
      .setColor("#264d00")
      .setFooter(
        `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
        "https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png"
      )
      .setImage(pages[page - 1]);

    message.channel.sendEmbed(embed).then(msg => {
      msg.react("⏮").then(r => {
        msg
          .react("⬅")
          .then(() => msg.react("⏹"))
          .then(() => msg.react("➡"))
          .then(() => msg.react("⏭"));

        let backwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⬅" && user.id === message.author.id;
        let forwardsFilter = (reaction, user) =>
          reaction.emoji.name === "➡" && user.id === message.author.id;

        let sbackwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⏮" && user.id === message.author.id;
        let sforwardsFilter = (reaction, user) =>
          reaction.emoji.name === "⏭" && user.id === message.author.id;

        let cancelFilter = (reaction, user) =>
          reaction.emoji.name === "⏹" && user.id === message.author.id;

        let backwards = msg.createReactionCollector(backwardsFilter, {
          time: 0
        });
        let forwards = msg.createReactionCollector(forwardsFilter, { time: 0 });

        let sbackwards = msg.createReactionCollector(sbackwardsFilter, {
          time: 0
        });
        let sforwards = msg.createReactionCollector(sforwardsFilter, {
          time: 0
        });

        let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });

        backwards.on("collect", r => {
          if (page === 1) return;
          page--;
          embed.setImage(pages[page - 1]);
          embed.setFooter(
            `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
            "https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png"
          );
          msg.edit(embed);
        });
        forwards.on("collect", r => {
          if (page === pages.length) return;
          page++;
          embed.setImage(pages[page - 1]);
          embed.setFooter(
            `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
            "https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png"
          );
          msg.edit(embed);
        });
        sbackwards.on("collect", r => {
          if (page === 1) return;
          page = 1;
          embed.setImage(pages[page - 1]);
          embed.setFooter(
            `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
            "https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png"
          );
          msg.edit(embed);
        });
        sforwards.on("collect", r => {
          if (page === pages.length) return;
          page = 200;
          embed.setImage(pages[page - 1]);
          embed.setFooter(
            `القراآن الكريم | صفحة رقم ${page} من اصل ${pages.length} صفحة`,
            "https://cdn.discordapp.com/attachments/404332408075190282/412722171325054996/NS1.png"
          );
          msg.edit(embed);
        });
        cancel.on("collect", r => {
          embed.setDescription(`**سوف يتم إغلاق القائمة**`);
          embed.setImage("");
          embed.setFooter(
            `Menu will close after 3sec`,
            "https://cdn.discordapp.com/attachments/637330727301808138/644512999285063706/4701771_1.jpg"
          );
          msg.edit(embed).then(msg.delete(3000));
        });
      });
    });
  }
});
///////////////////////////////////////////////////////////
//////////////////// اكواد الالعاب
const kingmas = [
  "** منشن الجميع وقل انا اكرهكم. **",
  "** اتصل على امك و قول لها انك تحبها :heart:. **",
  "**     تصل على الوالده  و تقول لها  احب وحده.**",
  "** تتصل على شرطي تقول له عندكم مطافي.**",
  "** صور اي شيء يطلبه منك الاعبين.**",
  "** اكتب في الشات اي شيء يطلبه منك الاعبين في الخاص. **",
  "** اتصل على احد من اخوياك  خوياتك , و اطلب منهم مبلغ على اساس انك صدمت بسيارتك.**",
  "** اعطي اي احد جنبك كف اذا مافيه احد جنبك اعطي نفسك و نبي نسمع صوت الكف.**",
  "**  تروح عند شخص تقول له احبك. **",
  "**روح عند اي احد بالخاص و قول له انك تحبه و الخ.**",
  "** اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه. **",
  "** روح الى اي قروب عندك في الواتس اب و اكتب اي شيء يطلبه منك الاعبين  الحد الاقصى 3 رسائل. **",
  "** اذا انت ولد اكسر اغلى او احسن عطور عندك اذا انتي بنت اكسري الروج حقك او الميك اب حقك. **",
  "** ذي المرة لك لا تعيدها.**",
  "** ارمي جوالك على الارض بقوة و اذا انكسر صور الجوال و ارسله في الشات العام.**",
  "** اتصل على ابوك و قول له انك رحت مع بنت و احين هي حامل..... **",
  "*** تكلم باللهجة السودانية الين يجي دورك مرة ثانية.***",
  "**سو مشهد تمثيلي عن مصرية بتولد.**",
  "** قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية. **",
  "** قول نكتة اذا و لازم احد الاعبين يضحك اذا محد ضحك يعطونك ميوت الى ان يجي دورك مرة ثانية.**",
  "** سامحتك خلاص مافيه عقاب لك :slight_smile:. **",
  "** اذهب الى واحد ماتعرفه وقل له انا كيوت وابي بوسه.**",
  "** تتصل على الوالده  و تقول لها خطفت شخص. **",
  "** روح اكل ملح + ليمون اذا مافيه اكل اي شيء من اختيار الي معك.  **"
];
client.on("message", message => {
  var prefix = "!!";
  if (message.content.startsWith(prefix + "حكم")) {
    var mariam = new Discord.RichEmbed()
      .setTitle("لعبة حكم .")
      .setColor("RANDOM")
      .setDescription(`${kingmas[Math.floor(Math.random() * kingmas.length)]}`);
    message.channel.sendEmbed(mariam);
    message.react(":thinking:");
  }
});
///// لعبت الصراحة
const صراحة = [
  "صراحه  |  صوتك حلوة؟",
  "صراحه  |  التقيت الناس مع وجوهين؟",
  "صراحه  |  شيء وكنت تحقق اللسان؟",
  "صراحه  |  أنا شخص ضعيف عندما؟",
  "صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟",
  "صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟",
  "صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟",
  "صراحه  |  كيفية الكشف عن من يكمن عليك؟",
  "صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟",
  "صراحه  |  أشجع شيء حلو في حياتك؟",
  'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
  "صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟",
  "صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟",
  "صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟",
  "صراحه  |  نظرة و يفسد الصداقة؟",
  "صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟",
  "صراحه  |  شخص معك بالحلوه والمُره؟",
  "صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟",
  "صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟",
  "صراحه  |  وش تتمنى الناس تعرف عليك؟",
  "صراحه  |  ابيع المجرة عشان؟",
  "صراحه  |  أحيانا احس ان الناس ، كمل؟",
  "صراحه  |  مع مين ودك تنام اليوم؟",
  "صراحه  |  صدفة العمر الحلوة هي اني؟",
  'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
  "صراحه  |  صفة تحبها في نفسك؟",
  'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
  "صراحه  |  تصلي صلواتك الخمس كلها؟",
  "صراحه  |  ‏تجامل أحد على راحتك؟",
  "صراحه  |  انت بتحب اي بنت؟",
  "صراحه  |  اشجع شيء سويتة بحياتك؟",
  "صراحه  |  وش ناوي تسوي اليوم؟",
  "صراحه  |  وش شعورك لما تشوف المطر؟",
  "صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟",
  "صراحه  |  ما اكثر شي ندمن عليه؟",
  "صراحه  |  اي الدول تتمنى ان تزورها؟",
  "صراحه  |  متى اخر مره بكيت؟",
  "صراحه  |  تقيم حظك ؟ من عشره؟",
  "صراحه  |  هل تعتقد ان حظك سيئ؟",
  "صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟",
  "صراحه  |  كلمة تود سماعها كل يوم؟",
  "صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟",
  "صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟",
  "صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟",
  "صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟",
  "‏صراحه | هل جرحت شخص تحبه من قبل ؟",
  "صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟",
  "‏صراحه | هل تحب عائلتك ام تكرههم؟",
  "‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟",
  "‏صراحه  |  هل خجلت من نفسك من قبل؟",
  "‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟",
  "‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟",
  "‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟",
  "‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟",
  "‏صراحه  |  ماذا تختار حبيبك أم صديقك؟",
  "‏صراحه  | هل حياتك سعيدة أم حزينة؟",
  "صراحه  |  ما هي أجمل سنة عشتها بحياتك؟",
  "‏صراحه  |  ما هو عمرك الحقيقي؟",
  "‏صراحه  |  ما اكثر شي ندمن عليه؟",
  "صراحه  |  ما هي أمنياتك المُستقبلية؟‏",
  "صراحه | نفسك فـ ايه ؟",
  "صراحه | هل تحب فتاه او احببت من قبل ؟",
  "صراحه | هل شكلك حلو او جيد او متوسط او سئ ؟",
  "صراحه | ما هي الماده الدراسيه التي تحبها اكثر وتفضلها؟",
  "صراحه | هل تحب مدرستك ؟",
  "صراحه | ما الشئ الذي تتمني ان يحصل ؟",
  "صراحه | هل تحب عائلتك ؟"
];
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith("!!صراحة")) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers **");
    var client = new Discord.RichEmbed()
      .setTitle("لعبة صراحة ..")
      .setColor("RANDOM")
      .setDescription(`${صراحة[Math.floor(Math.random() * صراحة.length)]}`)
      .setImage(
        "https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png"
      )
      .setTimestamp();

    message.channel.sendEmbed(client);
    message.react("??");
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////// كود الالوان
client.on("message", hiuu => {
  let args = hiuu.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (hiuu.content.startsWith(prefix + "ccolors")) {
    if (!args) return hiuu.channel.send("`يرجي اختيار كم لون`");
    if (!hiuu.member.hasPermission("MANGE_ROLES"))
      return hiuu.chanel.send("`**⚠️ | `[MANGE_ROLES]`لا يوجد لديك صلاحية **`");
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < parseInt(args) + 1; x++) {
      hiuu.guild.createRole({ name: x, color: "RANDOM" });
    }
    return hiuu.channel.send("`💡خلقت " + args + " الألوان`");
  }
});
////////////////////////
//كود تغيير اللون
client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == prefix + "color") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`لا يوجد لون بهذا الرقم :x: `)
      .setColor(`ff0000`);
    if (!args[0]) return message.channel.sendEmbed(embedd);
    if (isNaN(args[0]))
      return message.channel.sendEmbed(
        embedd.setDescription("`الرجاء تحديد رقم اللون` :x:")
      );
    if (!message.guild.roles.find("name", `${args[0]}`))
      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);
    if (!a) return;
    if (a.hasPermission(8))
      return message.channel.send(
        embedd.setDescription("`هذا اللون له مسؤول`:bulb:")
      );
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args[0]) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));
  }
});
client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == prefix + "لون") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`لا يوجد لون بهذا الرقم :x: `)
      .setColor(`ff0000`);
    if (!args[0]) return message.channel.sendEmbed(embedd);
    if (isNaN(args[0]))
      return message.channel.sendEmbed(
        embedd.setDescription("`الرجاء تحديد رقم اللون`:x:")
      );
    if (!message.guild.roles.find("name", `${args[0]}`))
      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);
    if (!a) return;
    if (a.hasPermission(8))
      return message.channel.send(
        embedd.setDescription("`هذا اللون له مسؤول`:bulb:")
      );
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription("`تم تغيير اللون بنجاح`:white_check_mark:")

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args[0]) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));
  }
});
/////////////////////////////////////////////////////////
/////////////// كود لينك
/*
const myid = ["749904594334777435"];////// ايدي 
client.on("message", message => {
  if (message.content === prefix + "link") {
    message.channel.send(
      "https://discord.com/api/oauth2/authorize?client_id=749904594334777435&permissions=0&scope=bot"
    );
    message.channel.send(
      "دا رابط البوت لو حبب تدخلو لي سيرفرك " + "<@" + myid + ">"
    );
    message.channel.sendFile("");
  }
});
*/
/////////////////////////////
/*
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// كود الرنبو او الالوان
client.on("guildCreate", guild => {
  let r3lease = guild.channels.filter(c => c.type === "text").random();
  r3lease.send("");
});
//--------------------------------------------||
require("events").EventEmitter.defaultMaxListeners = 25;
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(ayarlar.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "rainbow") {
    if (

      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send("`💡..تم انشأ رتبت الوان منجاح`");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "`💡...هذا القانون مدير يمكن للشخص المرخص استخدامه`"
      );
    message.channel.send("`💡..بدأ إعداد الخادم`");
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        ( 
          {
           
          }
        );
        /////////////////////////// roles
        message.guild.createRole({
          name: "Colors",/// اسم الرتبة الذي هتعمل الرنبو
        });
        message.channel.send("`💡..تم إنشاء الغرف المطلوبة`");
      });
  }
});
require("events").EventEmitter.defaultMaxListeners = 25;
client.on("message", async message => {
  const ms = require("ms");
  const args = message.content
    .slice(ayarlar.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "rw") {
    if (

      message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
    )
      return message.channel.send("`💡..تم انشأ رتبت الوان منجاح`");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "`💡...هذا القانون مدير يمكن للشخص المرخص استخدامه`"
      );
    message.channel.send("`💡..بدأ إعداد الخادم`");
    message.channel
      .awaitMessages(response => response.content === "evet", {
        max: 1,
        time: 10000,
        errors: ["time"]
      })
      .then(collected => {
        ( 
          {
           
          }
        );
        /////////////////////////// roles
        message.guild.createRole({
          name: "Colors",/// اسم الرتبة الذي هتعمل الرنبو
        });
        message.channel.send("`💡..تم إنشاء الغرف المطلوبة`");
      });
  }
});

//-------------------------------OTOROL---------------------------------\\
*/