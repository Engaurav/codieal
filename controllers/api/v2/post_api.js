module.exports.index = (req,res) => {
    return res.json(200,{
        message : "This is version 2",
        posts : []
    })
}