import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true
})

function startTelegramBot(){
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const username = msg.from.username;
    
        const message = `Hola ${username}! Soy tu bot de Telegram. Estoy para brindarte informacion sobre la premier league`;
        bot.sendMessage(chatId, message);
      });
}

export default startTelegramBot