import mongoose from "mongoose";

// BoardSchema.js
const BoardSchema= new mongoose.Schema ({
    number: {
        type: Number,
    },
    title : {
        type : String,
        required : true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        ref : 'UserChema',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default new mongoose.model('BoardSchema', BoardSchema);
