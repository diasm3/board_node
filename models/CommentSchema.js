import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    commentNum: {
        type: Number,
    },
    body: {
        type: String,
        required: true,
        trime: true,
    },
    writer: {
        type : String,
    },
    articleNumber: {
        type: Number,
    },
    createdAt: {
        type : Date,
        default: Date.now,
    }
})

export default new mongoose.model('CommentSchema', CommentSchema)
