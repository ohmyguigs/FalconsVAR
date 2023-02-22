require('dotenv').config();
const tmi = require('tmi.js');
const fetch = require('node-fetch');

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    'ohmyguigs',
  ],
  identity: {
    username: `FalconsVAR`,
    password: `${process.env.TWITCH_TOKEN}`
  }
});

client.connect().catch(err => console.log(err));

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

client.on('message', async (channel, context, message) => {
  // const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();
  const isNotBot = context.username.toLowerCase() !== "falconsvar";
  if ( !isNotBot ) return;

  console.log('MENSAGEM:', {
    channel,
    user: context.username,
    message
  });

  const matches = message.match(regexpCommand);
  if (matches) {
    const [raw, command, argument] = matches;
    if ( command ) {
      // client.say(channel, `Command "${command}" found with argument "${argument}"`);
      console.log('COMANDO: ', command, ' ARGUMENTS: ', argument)
      if (command === 'discord' ) {
        client.say(channel,
          `Respondendo ${context.username}, aqui o discord: https://discord.gg/wQj4SfDh`
        );
      } else if (command === 'salve') {
        client.say(channel, `@${context.username}, salve!`);
      } else if (command === 'lindo') {
        client.say(channel, `@lelemochila é o mais lindo!`);
      } else if (command === 'var') {
        const respostas = ['tava claramente impedido!', 'claramente não tava impedido nada não!']
        client.say(channel, respostas[Math.floor(Math.random() * respostas.length)]);
      } else if (
        command === 'song' ||
        command === 'musica'
      ) {
        const response = await fetch('https://spotify-widget.vercel.app/api/now/ohmyguigs');
        const current = await response.text();
        console.log('MUSICA: ', current);
        client.say(channel, `@${
          context.username
        }, a música é: ${
          current
        }`);
      }
    }
  }

  if (message.includes('impedido')) {
    client.say(channel, `Tava impedido nada não!`);
  } else if (
    message.includes('qual a musica') ||
    message.includes('qual é a musica') ||
    message.includes('nome da musica')
  ) {
    const response = await fetch('https://spotify-widget.vercel.app/api/now/ohmyguigs');
    const current = await response.text();
    console.log('current song: ', current);
    client.say(channel, `@${
      context.username
    }, a música é: ${
      current
    }`);
  }

});