const { errorReturn, returnNull, formatId } = require("../../utils/functions.js");
const ms = require("ms");

module.exports.run = (bot, message, args, lang) => {
    try{
        let typeMsg = args[0];
        let time = args[1];
        let channel = message.guild.channels.cache.get(formatId(args[2]))
        time = ms(time);

        if(returnNull(typeMsg) || returnNull(time)) return message.reply(lang.helpReturn);
        if(!isNaN(time) && !isNaN(args[1].charAt(args[1].length-1))) return message.reply(lang.invalidTime)

        let text = undefined;
        if(typeMsg === "msg"){
            if(!returnNull(channel)){
                text = args.join(" ").slice(args[0].length + args[1].length + 1 + args[2].length)
                if(returnNull(text)) return message.reply(lang.returnNull)
            }
            else{
                text = args.join(" ").slice(args[0].length + args[1].length + 1)
                if(returnNull(text)) return message.reply(lang.returnNull)
            }    
        }
        else if(typeMsg === "embed"){
            if(!returnNull(channel)){
                let msgSplit = args.join(" ").slice(args[0].length + args[1].length + 1 + args[2].length).split("||");

                text = new MessageEmbed()
                .setTitle(msgSplit[0])
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
            }
            else{
                let msgSplit = args.join(" ").slice(args[0].length + args[1].length + 1).split("||");

                let text = new MessageEmbed()
                .setTitle(msgSplit[0])
                .setDescription(msgSplit[1])
                .setColor(bot.baseColor)
            }
        }else return message.reply(lang.helpReturn);

        setTimeout(function(){
            if(!returnNull(channel)) channel.send(text);
            else message.channel.send(text)
        }, time);

        let thisDate = new Date();
        thisDate = Math.abs((thisDate / 1000) + (time / 1000))
        thisDate = new Date(thisDate * 1000);

        return message.reply(`${returnTime} \`${thisDate}\``)
    }catch(e){
        errorReturn(e, message, this.help.name)
    }
}

module.exports.help = {
    name: "notice", //anuncio
    type: "adm"
}

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["ADMINISTRATOR"],
    ownerOnly: false
}