const express = require('express');
const app = express();
const AuthRout = require('./Routes/auth');
const PostRoute = require('./Routes/post');
const UserRoute = require('./Routes/user');
const CommentRoute = require('./Routes/comment');
const dotenv = require("dotenv");
const multer = require("multer");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ limit: '30mb', extended: true}))
app.use(express.json({ limit: '30mb', extended: true}))
app.use(cors());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database Connected!");
}).catch((err) => console.log(err));

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log(err);

    }
});


app.use("/api/auth", AuthRout);
app.use("/api/post", PostRoute);
app.use("/api/users", UserRoute);
app.use("/api/comment", CommentRoute);
app.listen(5000, ()=>{
    console.log("Server is running..");
})