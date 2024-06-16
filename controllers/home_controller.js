module.exports.home = function(req, res){
    console.log(req.cookies);
    //changing the value of ccoie in response
    res.cookie('user_id',25);
    return res.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(req, res){}