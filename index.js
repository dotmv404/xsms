const { textcoffe } = require("./textacoffee");
const TelegramBot = require("node-telegram-bot-api");
const token = "5214920125:AAHaRYCvu4wbgZDslHCip-GxZOEmk-1sDS0";
// const token = "7393849192:AAHMwQvNN6GMW2B7QgX0ebYthyoPvU03ar8";


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



bot.sendMessage(chatId, "Started Attacking");
  textcoffe(message[0],message[1]);



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
const port = 3000; // Choose any port you prefer

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
