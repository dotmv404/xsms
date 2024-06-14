const { textcoffe } = require("./textacoffee");
const TelegramBot = require("node-telegram-bot-api");
const token = "5214920125:AAHaRYCvu4wbgZDslHCip-GxZOEmk-1sDS0";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
let message = msg['text'].split(" ")
if (message[0].length < 5) return


async function runLoop(lmsg,lnumber) {
    for (let i = 1; i <= lnumber; i++) {
textcoffe(lmsg);
  bot.sendMessage(chatId, i+" sent...");
    
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  bot.sendMessage(chatId, "Attacking in progress....");

  runLoop(message[0],message[1])


});
function checkIfNumber(value) {
    if (typeof value === 'number') {
        return true;
    } else {
        return false;
    }
}







const express = require('express');
const app = express();
const port = 80; 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});