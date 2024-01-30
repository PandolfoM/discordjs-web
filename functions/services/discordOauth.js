const database = require("../API/database");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

// Serialize and deserialize user information
passport.serializeUser((user, done) => {
  done(null, user);
});

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

passport.deserializeUser(async (uid, done) => {
  try {
    const user = await database.findUser(uid);
    if (user.success === true) {
      done(null, user.user);
    } else {
      done(null);
    }
  } catch (error) {
    console.log(`Error deserializing user: ${error.message}`);
    done(error);
  }
  database
    .findUser(uid)
    .then((user) => {
      done(null, user.user);
    })
    .catch((error) => {
      console.log(`Error deserializing user: ${error.message}`);
    });
});

passport.use(
  new DiscordStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: process.env.FUNCTIONS_EMULATOR
        ? "http://localhost:5000/auth/callback"
        : "https://epicansmc.xyz/auth/callback",
      scope: ["identify", "email", "guilds.join", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, username, discriminator, email, guilds, avatar } = profile;
        const searchUser = await database.findUser(id);
        if (searchUser.success === true) {
          // user exists
          // update user information
          done(null, searchUser.user);
          return searchUser.user;
        } else {
          // Check if the user has admin privileges in any server
          const adminServers = guilds
            .filter((guild) => (guild.permissions & 0x8) === 0x8)
            .map((guild) => guild);

          // create a new user
          const newUser = {
            username: username,
            discriminator: discriminator,
            uid: id,
            email: email,
            avatar: avatar,
            token: accessToken,
            refreshToken: refreshToken,
            guilds: adminServers,
          };
          await database.newUser(newUser);
          done(null, newUser);
        }
      } catch (error) {
        return console.error(`Error creating a user: ${error}`);
      }
    }
  )
);
