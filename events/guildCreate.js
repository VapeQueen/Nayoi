const {errorReturn} = require("../functions.js");
var colors = require('colors');

module.exports = (bot, guild) => {
    try{
        bot.database;

        const guildNew = new bot.Guild({
            _id: mongoose.Types.ObjectId(),
            name: guild.name,
            guildId: guild.id,
            memberCount: guild.memberCount,
            createdAt: guild.joinedAt,
            channel: "none",
            welcome: "off",
            welcomeMsg: "Bem-vindo {member}!!",
            welcomeChannel: "Bem-vindo",
            welcomeCanvas: "off",
            log: "off",
            logChannel: "",
            autorole: "off",
            autoroleRole: "",
            nsfw: "off"
        });
        console.log(`Novo servidor !! Nome:${guild.name} id:${guild.id}`.magenta)
        guildNew.save()
    }catch(e){
        errorReturn(e, null, "guildCreate")
    }
}