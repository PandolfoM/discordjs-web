const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const passport = require("passport");
const session = require("express-session");
const functions = require("firebase-functions");
const authRoutes = require("./routes/authRoutes");
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

exports.auth = functions.https.onRequest(app);
