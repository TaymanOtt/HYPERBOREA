// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./utils/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // 1. Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // 2. Validate password
        const isMatch = await User.comparePassword(password, user.password_hash);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // 3. If valid, return user (without password)
        const safeUser = {
          id: user.id,
          email: user.email
          // Add other safe fields as needed
        };
        return done(null, safeUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize/deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});