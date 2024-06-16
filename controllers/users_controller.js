const User = require('../models/user')

module.exports.profile = function(req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id)
            .then(function(user) {
                if (user) {
                    return res.render('user_profile', {
                        title: "user-profile",
                        user: user
                    });
                }
                return res.redirect('/users/sign-in');
            })
            .catch(function(err) {
                console.error('Error in finding user in profile:', err);
                return res.redirect('/users/sign-in');
            });
    } else {
        return res.redirect('/users/sign-in');
    }
};

    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })

// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : "codeial | Sign Up"
    })
}
// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_In',{
        title : "codeial | Sign In"
    })
}

// get the sign up data

module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return User.create(req.body);
            } else {
                return Promise.reject('User already exists');
            }
        })
        .then(user => {
            return res.redirect('/users/sign-in');
        })
        .catch(err => {
            console.error('Error:', err);
            return res.redirect('back');
        });
};


//sign in and create a session to the user
module.exports.createSession = function(req, res) {
    // Find the user
    // User.findOne({ email: req.body.email })
    //     .then(function(user) {
    //         // Handle user not found
    //         if (!user) {
    //             return res.redirect('back');
    //         }

    //         // Handle password not matching
    //         if (user.password !== req.body.password) {
    //             return res.redirect('back');
    //         }

    //         // Handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/users/profile');
    //     })
    //     .catch(function(err) {
    //         console.error('Error in finding user in signing in:', err);
    //         return res.redirect('back');
    //     });
    return res.redirect('/');
};
