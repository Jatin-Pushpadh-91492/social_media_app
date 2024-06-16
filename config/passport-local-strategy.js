const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//AUTHENTICATION USING PASSPORT

passport.use(new LocalStrategy({
    usernameField: 'email'
},
async function(email, password, done) {
    try {
        // Find a user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false, { message: 'Invalid Username/Password' });
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding the user --> Passport');
        return done(err);
    }
}
));

//serializing the user to decide which key is to be kept int the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log('Error in finding the user --> Passport');
        return done(err);
    }
});


module.exports = passport;