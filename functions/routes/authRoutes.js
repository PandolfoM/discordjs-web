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
  })
);

router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/error" }),
  async (req, res) => {
    const claims = {
      uid: req.user?.uid,
    };

    admin
      .auth()
      .createCustomToken(claims.uid, claims)
      .then((token) => {
        res.cookie("customToken", token);
        res.redirect("/dashboard");
      });
  }
);

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
