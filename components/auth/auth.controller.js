const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;
// const JWTstrategy = require("passport-jwt").Strategy;
// const ExtractJWT = require("passport-jwt").ExtractJwt;
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");

const { userModel } = require("../user");

passport.use(
  "basic",
  new BasicStrategy(function (email, password, callback) {
    // console.log("email", email);
    // console.log("password", password);
    userModel
      .findOne({ email: email })
      .then((user) => {
        // console.log("user", user);
        // No user found with that username
        if (!user) {
          console.log("!user");
          return callback(null, false);
        }

        // Make sure the password is correct
        user.verifyPassword(password, function (err, isMatch) {
          if (err) {
            console.log("err", err);
            return callback(err);
          }

          // Password did not match
          if (!isMatch) {
            console.log("!isMatch");
            return callback(null, false);
          }
          //   console.log("success");
          // Success
          return callback(null, user);
        });
      })
      .catch((err) => {
        console.log("error:", err);
        return callback(err);
      });
  })
);
passport.use(
  "jwttoken",
  new BearerStrategy(function (token, callback) {
    jwt.verify(token, process.env.JWTSECRET, function (err, token) {
      if (err) {
        // console.log("1err", err);
        return callback(err);
      }

      // No token found
      if (!token) {
        // console.log("!token");
        return callback(null, false);
      }

      userModel.findOne({ _id: token.user._id }, function (err, user) {
        if (err) {
          //   console.log("2err", err);
          return callback(err);
        }

        // No user found
        if (!user) {
          //   console.log("!user");
          return callback(null, false);
        }

        // Simple example with no scope
        callback(null, user, { scope: "*" });
      });
    });
  })
);
exports.isAuthenticated = passport.authenticate("basic", {
  session: false,
  failWithError: true,
});
exports.isJWTAuthenticated = passport.authenticate("jwttoken", {
  session: false,
  failWithError: true,
});

// passport.use(
//   "jwttoken",
//   new JWTstrategy(
//     {
//       secretOrKey: process.env.JWTSECRET,
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
//     },
//     async (token, done) => {
//       console.log(token);
//       try {
//         done(null, token.username);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
