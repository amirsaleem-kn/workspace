const passport = require('passport');
const LocalStrategy = require('passport-local').LocalStrategy;

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done){
    console.log(email);
    console.log(password);
}));