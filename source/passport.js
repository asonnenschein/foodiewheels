var LocalStrategy = require('passport-local').Strategy
  , db = require('./db')
  ;

function authenticate (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.User.find({where: {id: id}})
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        done(err);
      })
    ;
  });

  passport.use('register',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      db.User.find({where: {username: username}})
        .then(function (user) {
          if (!user) {
            db.User.create({
              username: username,
              password: this.generateHash(password)
            })
            .then(function (newUser) {
              return done(null, newUser);
            })
            .catch(function (err) {
              return done(err);
            })
          }
          return done(null, false);
        })
        .catch(function (err) {
          return done(err);
        })
      ;
    }
  ));

  passport.use('login',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      db.User.find({where: {username: username}})
        .then(function (user) {
          if (!user) {}
            return done(null, false);
          if (!user.validPassword(password))
            return done(null, false);
          return done(null, user);
        })
        .catch(function (err) {
          return done(err);
        })
      ;
    }
  ));
}

module.exports = authenticate;