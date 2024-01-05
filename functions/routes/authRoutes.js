const passport = require("passport");
const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

router.get(
  "/login",
  passport.authenticate("discord", {
    scope: ["identify", "email", "guilds.join", "guilds"],
    failureRedirect: process.env.FUNCTIONS_EMULATOR
      ? "http://localhost:5000/"
      : "https://epicansmc.xyz/",
  }),
  async (req, res) => {
    await admin.auth().createCustomToken(req.user.token);
  }
);

router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/error" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
