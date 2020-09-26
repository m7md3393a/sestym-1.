const Moment = require('moment')
const Discord = require('discord.js')
module.exports = client => {
  const R3LEASEDURUM = ['!!help | 👑', 'Me bot link | !!link', 'Music 🎵 !!play', 'System ️️🛡️',]
  client.user.setStatus('idle')
  
  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (R3LEASEDURUM.length - 0))
    client.user.setActivity(R3LEASEDURUM[Aktivite])
  }, 8000)
}