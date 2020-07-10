const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let postSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    published_at: {
        type: String,
        required: [true, 'Email is required']
    },
    content: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    state: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
    }

});

module.exports = mongoose.model("Post", postSchema);