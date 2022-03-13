const Post = require('../models/post')
const User = require('../models/user');


// module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',11);


    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // })

    //for populating user instead of user_id
//     Post.find({})
//     .populate('user')
//     .populate({
//         path : 'comments',
//         populate:{
//             path : 'user'
//         }
//     })
//     .exec(function(err,posts){

//         User.find({},function(err,users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users : users
//             });
//         });
//     });
// }

// using async await instead of call back hell function
module.exports.home = async function(req, res){
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate:{
                path : 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users : users
        });

    }catch(err){
        console.log('Error',err);
    }
}


module.exports.offlineHome = function(req,res){
    return res.render('offlineHome',{
        title: 'Codial Home',
    });
}
// module.exports.actionName = function(req, res){}