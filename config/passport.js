var LocalStrategy = require('passport-local').Strategy;

//
var User = require('../app/models/user'); 

//configuring passport 
module.exports = function(passport){
    
    //serializing user for session
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    
    //deserializing user
    passport.deserializeUser(function(id,done){
       User.findById(id, function(err, user){
        done(err, user); 
           });
    });
    
    //local strategies
    //default local strategy uses username and password as parameters however, for the purpose of this project email will replace username therefore, a slight customization is done in the code below:
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true //this is a boolean value which passes the entire request block to the callback
    },
      function(req,email,password,done){
        process.nextTick(function(){
        
        User.findOne({'local.email' : email}, function(err,user){
            if(err){
                return done(err);
            }
            
            if(user){
                return done(null, false, req.flash('signUpMessage', 'User already exists'));
            }else{
                var newUser = new User();
                
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                
                //saving the new user
                newUser.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });
  }
));
    passport.use('local-login',new LocalStrategy({
                 usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
    },
                function(req, email, password, done){
        User.findOne({'local.email': email}, function(err,user){
           if(err)
               return done(err);
            if(!user)
                return done(null, false, req.flash('loginMessage','User not found'));
            if(!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'));
            return done(null, user);
        });
      }));
}