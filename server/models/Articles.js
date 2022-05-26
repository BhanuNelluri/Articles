import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;