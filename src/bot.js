require("dotenv").config();

const { Client } = require("discord.js");

const client = new Client();
const PREFIX = "$";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    switch (CMD_NAME) {
      case "kick":
        kickMember(message, args);
        break;
      case "ban":
        banUser(message, args);
        break;
      case "greet":
        greetings(message);
        break;
    }
    // if (CMD_NAME === "kick") {
    //   kickMember(message, args);
    // } else if (CMD_NAME === "ban") {
    //   banUser(message, args);
    // }
  }
});

async function kickMember(message, args) {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.reply("You don't have permission");
  }
  if (args.length === 0) return message.reply("Please provide an ID");
  try {
    const member = await message.guild.members.cache.get(args[0]).kick();
    message.channel.send(`${member} is kicked`);
  } catch (error) {
    console.log(error);
    message.channel.send(`That member was not found`);
  }
}
async function banUser(message, args) {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.reply("You don't have permission");
  }
  if (args.length === 0) return message.reply("Please provide an ID");
  try {
    const user = await message.guild.members.ban(args[0]);
    message.channel.send(`${user} is banned`);
  } catch (error) {
    console.log(error);
    message.channel.send(`That user was not found`);
  }
}
function greetings(message) {
  message.reply(`Welcome to the ${message.guild.name}`);
}
client.login(process.env.DISCORDJS_BOT_TOKEN);
