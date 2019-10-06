const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/users");

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {

            // Match user
            User.findOne({
                email: email,
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: "That email is not registered" });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) { throw err };
                    console.log("Im triggered!", err);

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password incorrect" });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};