const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        userId: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        text: {
            type: String,
            max: 500,
        },
    },
    { timestamps: true}
);


module.exports = mongoose.model("comment", CommentSchema);