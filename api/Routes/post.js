const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verify = require("../verifyToken");



//create a post

router.post("/", async (req, res) =>{
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//update a post

router.put("/:id", verify, async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            const updatedPost = await Post.findByIdAndUpdate( 
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true}
            );
           res.status(200).json(updatedPost);
        }else{
            res.status(403).json("you can only update your post");
        }

    }catch(err){
        res.status(500).json(err);
    }
})

//delete a post
router.delete("/:id", verify, async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.delete();
           res.status(200).json("Deleted Post");
        }else{
            res.status(403).json("you can only delete your post");
        }

    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/:id/like", verify, async (req, res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: {likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        }else{
            await post.updateOne( {$pull: { likes: req.body.userId }});
            res.status(200).json("the Post has been disliked");
        }
    }catch (err){
        res.status(500).json(err);
    }
});

//comment
router.put("/:id/comment", verify, async (req, res) =>{
    const data = {
        userId: req.body.userId,
        comment: req.body.comment,
        createdAt: new Date(),
    }
    try{
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $push: {comments: data} });
        

        const updatedPost = await Post.findById(req.params.id);
        res.status(200).json(updatedPost);
    }catch (err){
        res.status(500).json(err);
    }
});


//get a posts
router.get("/:username", verify, async (req, res) =>{
    try{
        const user = await User.findOne({username: req.params.username});
        const post = await Post.find({userId: user._id});
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});
//get a posts by id
router.get("/find/:id", verify, async (req, res) =>{
    const postId = {_id: req.params.id}
    try{
        const post = await Post.findById(postId);
        // const post = await Post.find({userId: user._id});
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

//get a timeline posts
router.get("/timeline/:userId", verify, async (req, res) =>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({
            userId: currentUser._id 
        });
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendsPosts));
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

router.get("/profile/:username", verify, async (req, res) =>{
    try{
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find( {userId: user._id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

module.exports = router;