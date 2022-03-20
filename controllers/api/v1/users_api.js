const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { use } = require('passport');


module.exports.createSession = async function (req, res) {
   try {
       let user = await User.findOne({email: req.body.email});

       if(!user || user.password != req.body.password){
           return res.json(422,{
               message:"Invalid username or passowrd"
           })
       }

       return res.json(200,{
           message:"Sign-in Successful,here is your token",
           data: {
               token : jwt.sign(user.toJSON(),'codeial',{expiresIn: '1000000'})
           }
       })

   } catch (error) {
       console.log("*****",error);
       return res.json(500,{
           message: "Internal Error"
       });
   }
}