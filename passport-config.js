const LocalStrategy = require("passport-local").Strategy;
const encrypt = require("bcrypt");

const initialize = (passport, database) => {
  // authenticate user with username and password
  const authenticateUser = async (username, password, done) => {
    const user = await database.authenticateUser(username);

    if (user == null) {
      return done(null, false, {
        message: "No user found with given username!",
      });
    }

    try {
      if (await encrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect!" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
      },
      authenticateUser
    )
  );

  // Serialize our user to store in sessions.
  passport.serializeUser((user, done) => done(null, user.username));

  // We are serializing our user as a id.
  passport.deserializeUser((id, done) => {
    // const getUserByUsername = database.authenticateUser;
    return done(null, database.authenticateUser(id));
  });
};

module.exports = initialize;
