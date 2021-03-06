const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            city: req.body.city,
            from: req.body.from,
            relationship: req.body.relationship,
        });

        //save user
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})


//login
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({
            email: req.body.email
        });
        if(!user){
           return res.status(404).json("user not found.!");
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
           return res.status(400).json("wrong Password")
        }
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken});
    }catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});


module.exports = router;