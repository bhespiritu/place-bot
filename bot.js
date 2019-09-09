const Discord = require('discord.js');
var Jimp = require('jimp');
var auth = require('./auth.json');
const client = new Discord.Client();
const fileOutput = './place.png';
const scaleOutput = './scale.png';
const { Client, MessageAttachment } = require('discord.js');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.author.bot) return;
	var args = msg.content.split(/\s+/);
	console.log(args);
	if(args.length >= 5)
	{
		var x = parseFloat(args[0]);
		var y = parseFloat(args[1]);
		var r = parseInt(args[2]);
		var g = parseInt(args[3]);
		var b = parseInt(args[4]);
		if(x != NaN && y != NaN && r != NaN && g != NaN && b != NaN)
		{
			if(x >= 0 && x <100 && y >= 0 && y < 100)
			{
				
				console.log({x,y,r,g,b});
				var hex = Jimp.rgbaToInt(r, g, b, 255);
				Jimp.read(fileOutput)
				  .then(image => {
					image.setPixelColor(hex, x, y);
					image.write(fileOutput);
					image.scale(2,Jimp.RESIZE_NEAREST_NEIGHBOR);
					image.write(scaleOutput);
				  }).then().then(()=>(msg.channel.send(``, {file: scaleOutput}))).catch(err => {
					console.error(err)
				  });
				  
			
					
				
			}
		}
	}
});

client.login(auth.token);