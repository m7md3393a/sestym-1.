const { ShardingManager } = require ('discord.js')
const ayarlar = require ('./ayarlar.json')
const Discord = require ('discord.js')

const shards = new ShardingManager ('./oyuncraft.js', {

token : ayarlar.token,
totalShards : 2,
});

    const webhook = new Discord.WebhookClient("WEBHOOK İD","WEBHOOK TOKEN")
shards.on('launch', shard => {
    webhook.send(`🟡 [Oyun Craft Kral Başlatılıyor] Oyun Craft Kral PROJESİ - <@389770386528534528> \n${shard.id +1} IDli Başlatılıyor Lütfen Bekleyin.`)
    setTimeout(() => {
  webhook.send(`🟢  [Oyun Craft Kral Başlatıldı] Oyun Craft Kral PROJESİ - <@389770386528534528> \n${shard.id +1} IDli Başlatıldı Ve Bot Kullanıma Hazır.`)
  }, 5000)
})

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});
shards.spawn()