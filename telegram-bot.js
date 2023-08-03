import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import premierLeagueMatches from "./premier.js";

dotenv.config();

let selectedDate = null;

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

function startTelegramBot() {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;

    const message = `Hola ${username}! Soy tu bot de Telegram. Estoy para brindarte información sobre la Premier League. Escribe /premier para obtener las fechas de los partidos.`;
    bot.sendMessage(chatId, message);
  });

  bot.onText(/\/premier/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Ingresa el número de la jornada que quieres consultar:");
    selectedDate = null;
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    if (selectedDate === null) {
      selectedDate = parseInt(message);
      if (isNaN(selectedDate)) {
        bot.sendMessage(chatId, "Por favor, ingresa un número válido de jornada.");
        selectedDate = null;
      } else {
        premierLeagueMatches(selectedDate)
          .then((matches) => {
            bot.sendMessage(chatId, matches);
            selectedDate = null; 
          })
          .catch((error) => {
            bot.sendMessage(chatId, "Ocurrió un error al obtener los partidos.");
            console.error("Ocurrió un error:", error);
            selectedDate = null;
          });
      }
    }
  });
}

export default startTelegramBot;
