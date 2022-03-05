const Post = require('../models/post')
module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',11);


    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // })

    //for populating user instead of user_id
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate:{
            path : 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
   
}

module.exports.offlineHome = function(req,res){
    return res.render('offlineHome',{
        title: 'Codial Home',
    });
}
// module.exports.actionName = function(req, res){}