require('dotenv').config()
var cors = require('cors');

const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_API_TOKEN;
const SERVER_URL = process.env.EXTERNAL_URL || process.env.RENDER_EXTERNAL_URL;
const server = express();
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${SERVER_URL}/bot${TOKEN}`);

const PORT = process.env.PORT || 5000;
const GAME_NAME = "dev";
const GAME_URL = process.env.GAME_URL || "https://tgi-dev.onrender.com";

bot.onText(/help/, (msg) => bot.sendMessage(msg.from.id, "This bot implements a game. Say /game if you want to play."));

bot.onText(/start|game/, (msg) => bot.sendGame(msg.from.id, GAME_NAME));
bot.on("callback_query", function (query) {
    if (query.game_short_name !== GAME_NAME) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        bot.answerCallbackQuery(query.id, {
            url: `${GAME_URL}?from_id=${query.from.id}&chat_id=${query.message?.chat.id ?? ''}&message_id=${query.message?.message_id ?? ''}&inline_message_id=${query.inline_message_id ?? ''}`
        });
    }
});
bot.on("inline_query", function(iq) {
      bot.answerInlineQuery(iq.id, [ { type: "game", id: "0", game_short_name: GAME_NAME } ] ); 
});

// make the files in the folder 'public' accessible
server.use(express.static(path.join(__dirname, '../public')));

// add json support and cors
server.use(express.json());
server.use(cors());

// register the route which receives bot updates from telegram
server.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// endpoint to set highscore
server.get("/highscore/:score", function(req, res, next) {
    if (!req.query.chat_id && !req.query.message_id && !req.query.inline_message_id) return next();
    let options;
    if (req.query.chat_id) {
        options = {
            chat_id: req.query.chat_id,
            message_id: req.query.message_id
        };
    } else {
        options = {
            inline_message_id: req.query.inline_message_id
        };
    }
    bot.setGameScore(req.query.from_id, parseInt(req.params.score), options, 
        function (err, result) {
            console.log("err", err)
            console.log("result", result)
        });
    res.sendStatus(200);
});

server.listen(PORT);