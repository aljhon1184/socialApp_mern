const router = require("express").Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");



router.post("/", async (req, res) =>{
    const newComment = new Comment(req.body);
    try{
        const saveComment = await newComment.save();
        res.status(200).json(saveComment);
    }catch(err){
        res.status(500).json(err);
    }
});


router.get("/:id", async (req,res) =>{
    const { postId } = req.params; 

    try{
        const message = await Comment.find(postId)

        res.status(200).json(message)
    }catch(error){
        res.status(500).json(error)
    }
});



module.exports = router;