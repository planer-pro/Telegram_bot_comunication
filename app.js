const Telegraf = require('telegraf');
const { reply } = Telegraf;
const db = require('./db');

require('dotenv').config()
var BOT_TOKEN = process.env.BOT_TOKEN || "your own TOKEN write here";

const bot = new Telegraf(BOT_TOKEN);

db.loadUsers();

const helpMsg = `Command reference:
                /start - Start bot
                /stop - Stop bot
                /list - Show all ID's
                /me - Your ID
                /help - Show this help page
                `;

//user manager
bot.command('start', ctx => {
    db.registerUser(ctx);
    ctx.reply("Welcome");
});

bot.command('stop', ctx => {
    ctx.reply("User deleted.");
    db.unregisterUser(ctx);
    console.log("Telegram user disconnected: " + ctx.chat.username + " (id: " + ctx.chat.id + ")");
});

bot.command('list', ctx => {
    ctx.reply(db.getUserList());
});

bot.command('me', ctx => {
    ctx.reply(ctx.chat.id);
});

bot.command('help', ctx => {
    ctx.reply(helpMsg);
});

bot.startPolling();

//functional code
var count = 0;

bot.command('hi', ctx => {
    ctx.reply('Hello');
});

setInterval(function () {
    var userList = db.getUserList();
    userList.forEach(userId => {
        count++;
        bot.telegram.sendMessage(userId, '' + count);
    });
}, 2000);