const Telegraf = require('telegraf')
const express = require('express')
const https = require('https')
const hmtai = require("hmtai");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const expressApp = express()

const bot = new Telegraf.Telegraf('1886185298:AAFU9BVoIh93_h0HlnZDVo5pmCTUYnd8E_8');
expressApp.use(bot.webhookCallback('/ruta-bot'))
//lt --port 3000
bot.telegram.setWebhook('https://shy-wasp-63.loca.lt/ruta-bot');

bot.command('/test',ctx=>{
    ctx.reply('Hola Mundo')
})

bot.command('/foto',ctx=>{
    ctx.replyWithHTML('https://thispersondoesnotexist.com/image');
})

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

bot.command('/nekobot',ctx=>{
    var search=ctx.message.text+"";
    search=search.substring(9,search.length)
    console.log(search);
    var res=JSON.parse(httpGet('https://nekobot.xyz/api/image?type='+search));
    if(res.success){
        console.log(JSON.stringify(res));
        ctx.replyWithPhoto(res.message)
    }
    else
        ctx.reply('No encontrado');
})



bot.command('/wikipedia',ctx=>{
    var search=ctx.message.text+"";
    search=search.substring(11,search.length)
    search=search.replace(" ","+")
    var res=httpGet('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&titles='+search+'&format=json')
    var resJSON=JSON.parse(res);
    // console.log('resJSON:'+JSON.stringify(resJSON.query.pages));
    var msj='';
    for(var p in resJSON.query.pages) {
        console.log(resJSON.query.pages[p]);
        msj+=resJSON.query.pages[p].extract;
    }
    if(msj.length>0)
        ctx.reply(msj.replace(/<[^>]+>/g, ''))
    else
        ctx.reply('No encontrado');
    
})

bot.command('/help',ctx=>{
    console.log(ctx.message);
})

bot.command('/hmtai',ctx=>{
    ctx.replyWithPhoto(hmtai.nsfw.femdom());
})

expressApp.post('ruta-bot',(req,res)=>{
    res.send('Llamada a la ruta del bot');
})

expressApp.listen(3000,()=>{
    console.log('Escuchando');
})

bot.command('/google',ctx=>{
    var search=ctx.message.text+"";
    search=search.substring(11,search.length)
})

