const User = require("../models/User");
const router = require('express').Router();
const bcrypt = require("bcrypt");
const verify = require("../verifyToken");




//update user

router.put("/:id", verify, async (req, res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});

            const {password, ...other} = user._doc;
            res.status(200).json(other);
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can only update your Account.!");
    }
});

//delete user
router.delete("/:id", verify, async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });


//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });


  //get a friends

  router.get("/friends/:userId", verify, async (req, res) =>{
      try{
          const user = await User.findById(req.params.userId);
          const friends = await Promise.all(
              user.followings.map((friendId) => {
                  return User.findById(friendId);
              })
          );
          let friendList = [];
          friends.map((friend) =>{
              const { _id, username, profilePicture } = friend;
              friendList.push({ _id, username, profilePicture});
          });
          res.status(200).json(friendList);
      }catch(err){
          res.status(500).json(err);
      }
  });

  //get not friend
  router.get("/getusers/:userId", async (req, res) =>{
      try{
          const userE = await User.findById(req.params.userId);
          const users = await User.find();

          let newArray = [];
          users.map((user) =>{
            if(!userE.followings.includes(user._id.toString())){
              if(user._id.toString() !== req.params.userId){
                return newArray.push(user);
              }
            }
          });
          res.status(200).json({newArray});
      }catch(err){
          res.status(500).json(err);
      }
  });

  //get a followers
  router.get("/followers/:userId", verify, async (req, res) =>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followers.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) =>{
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture});
        });
        res.status(200).json(friendList);
    }catch(err){
        res.status(500).json(err);
    }
});



  //follow a user
router.put("/:id/follow", verify, async (req,res) =>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: {followers: req.body.userId }});
                await currentUser.updateOne({ $push: { followings: req.params.id } });

                // const updatedUser = await User.findById(req.body.userId);

                // const { password, ...others } = updatedUser._doc;
                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("you already follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cant follow yourself");
    }
});

router.put("/:id/unfollow", verify, async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id }});
  
          res.status(200).json("Unfollow user successfully");
        } else {
          res.status(403).json("your not following this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  });


  module.exports = router;