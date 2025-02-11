const { formatId, returnNull } = require("../../utils/functions.js");

module.exports.run = (bot, message, args, lang) => {
    try{
        let channel = message.guild.channels.cache.get(formatId(args[0]))
        let msg;

        if(channel){
            msg = args.join(" ").slice(args[0].length);
        }
        else{
            channel = message.channel;
            msg = args.join(" ").slice(0);
        }
        if(returnNull(msg)) return message.reply(lang.helpReturn);

        return channel.send(msg);
    }catch(e){
        bot.error.errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "say",
    type: "utility"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}