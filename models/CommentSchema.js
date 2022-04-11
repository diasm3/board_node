import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    commnetNumber: {
        type: Number,
    },
    body: {
        type: String,
        required: true,
        trime: true,
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserChema',
    },
    articleNumber: {
        type: Number,
        ref : 'BoardSchema',
    },
    createdAt: {
        type : Date,
        default: Date.now,
    }
})

export default new mongoose.model('CommentSchema', CommentSchema)
