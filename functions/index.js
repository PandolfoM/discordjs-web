const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const passport = require("passport");
const session = require("express-session");
const functions = require("firebase-functions");
const authRoutes = require("./routes/authRoutes");
const { defineSecret } = require("firebase-functions/params");
require("./services/discordOauth");

const app = express();

app.use(cors());
app.use(require("cookie-parser")());

app.use(
  session({
    secret: "epic-secret-taht-noone-can-know-sppopoooookkkkykyyyy",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/auth", authRoutes);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.auth = functions.https.onRequest(
  { secrets: ["CLIENT_ID", "CLIENT_SECRET"] },
  app
);

exports.getChannels = functions.https.onCall((data, context) => {
  const botToken = defineSecret("BOT_TOKEN");
  return fetch(`https://discord.com/api/guilds/${data.guildId}/channels`, {
    method: "GET",
    headers: {
      Authorization: `Bot ${botToken.value()}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.error(`HTTP error! Status: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      return {
        channels: data,
      };
    });
});
