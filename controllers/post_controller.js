const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post:post
                },
                message : "Post  Created!",
            });
        }

        req.flash('success','Post Submitted');
        return res.redirect('back');
    }catch(err){
        req.flash('error','error in creating post');
        return res.redirect('back');
    }       
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting object id in string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id},function(err){
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            post:req.params.id
                        },
                        message : "Post  Deleted!",
                    });
                }
                req.flash('success','Post and associated comment deleted!');
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}