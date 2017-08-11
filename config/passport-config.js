// We are configuring passport in a separate file to avoid making a mess in app.js
const passport = require('passport');
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model.js');



//serializedUser   (controls what goes inside the bowl)
// - save only the user's database ID im the bowl
// - happens when you log in
passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);           // null as 1st arg means no error
});


// deserializedUser (controls what you get when you check the bowl)
// - uses the ID in the bowl to retrieve the user's information
// - happens every time you visit the site after logging in
passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(
    idFromBowl,
    (err, userFromDb) => {
      if (err) {
        next(err);
        return;
      }

      // Tell passport that we got the user's info from the DB
      next(null, userFromDb);           // null as 1st arg means no error
    }
  );
});



//STRATEGIES
//    the different ways of logging in

//SETUP passport-local
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  {                 // 1st arg -> settings object
    usernameField: 'loginUsername',
    passwordField: 'loginPassword'
  },
  (formUsername, formPassword, next) => { // 2nd arg -> callback (will be called when a user tries to login)

    // 1. provided username exists?
    UserModel.findOne(
      { username: formUsername },
      (err, userFromDb) => {
        if (err) {
          next(err);
          return;
        }
        // if the username doesnt exist the userFromDb var will be empty

        //Check if userFromDb is empty
        if (userFromDb === null) {
          //In passport, if tou call next with a "false" in 2nd postion it means login failed
          next(null, false);
          return;
        }

        // 2. is the password correct?
        if (bcrypt.compareSync(formPassword, userFromDb.encryptedPassword) === false) {
          next(null, false);
          return;
        }
        //If we pass those if statements, LOGIN SUCCESS!
        next(null, userFromDb);
        //In passport, if you call next with a user in the second position it means login success
      }
    );

  }
));

//passport-facebook (log in with your Facebook account)
// const FbStrategy = require('passport-facebook').Strategy;
//
// passport.use(new FbStrategy(
//   {   // 1st arg -> settings object
//     clientID: '1446689522091550',
//     clientSecret: '81e92a86b36fee508a869545802fc0e7',
//     callbackURL: '/auth/facebook/callback'    // our route (made up whatever)
//   },
//
//   (accessToken, refreshToken, profile, next) => {   // 2nd arg -> callback
//             // (will be called when a user allows us to log them in with Facebook)
//       console.log('');
//       console.log('--------FACEBOOK PROFILE INFO---------------');
//       console.log('profile');
//       console.log('');
//
//       UserModel.findOne(
//         { facebookId: profile.id },
//
//         (err, userFromDb) => {
//           if (err) {
//             next(err);
//             return;
//           }
//           // "userFromDb" will be empty if this is the first time the user logs in with Facebook,
//
//           //Check if they have logged in before
//           if (userFromDb) {
//             //If they have, just log them in
//             next(null, userFromDb);
//             return;
//           }
//
//           // If its the first time they log in , Save them in the database
//           const theUser = new UserModel({
//             fullName: profile.displayName,
//             facebookId: profile.id
//           });
//
//           theUser.save((err) => {
//             if (err) {
//               next(err);
//               return;
//             }
//
//             // Now that they are saved, log them in.
//             next(null, theUser);
//
//           });
//         }
//       );
//
//   }
// ));

//passport-google-oauth (log in with your Google account)
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
// passport.use(new GoogleStrategy(
//   {   // 1st arg -> settings object
//     clientID: '1066385774412-blv6rodsu3rabnb06ob36lpo6r3ue10b.apps.googleusercontent.com',
//     clientSecret: '9oi9J-JvIYiWV-Y1USgqt4PJ',
//     callbackURL: '/auth/google/callback'    // our route (made up whatever)
//   },
//
//   (accessToken, refreshToken, profile, next) => {   // 2nd arg -> callback
//             // (will be called when a user allows us to log them in with Facebook)
//       console.log('');
//       console.log('--------GOOGLE PROFILE INFO---------------');
//       console.log('profile');
//       console.log('');
//
//       UserModel.findOne(
//         { googleId: profile.id },
//
//         (err, userFromDb) => {
//           if (err) {
//             next(err);
//             return;
//           }
//           // "userFromDb" will be empty if this is the first time the user logs in with Facebook,
//
//           //Check if they have logged in before
//           if (userFromDb) {
//             //If they have, just log them in
//             next(null, userFromDb);
//             return;
//           }
//
//           // If its the first time they log in , Save them in the database
//           const theUser = new UserModel({
//             fullName: profile.displayName,
//             googleId: profile.id
//           });
//
//           if (theUser.fullName === undefined) {
//             theUser.fullName = profile.emails[0].value;
//           }
//
//           theUser.save((err) => {
//             if (err) {
//               next(err);
//               return;
//             }
//
//             // Now that they are saved, log them in.
//             next(null, theUser);
//
//           });
//         }
//       );
//
//   }
// ));
