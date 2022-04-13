'use strict'
import { mongoose } from 'mongoose';

const ArticleSchema= mongoose.Schema({
    id: {
        type: Number,
        unique: ture,
        required: true,
    },
    title: {
        type: String,
        require: ture,
    },
    content: {
        type: String,
        require: true,
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        default: false
    }
}, { timestamps: true });

export default new mongoose.model("ArticleSchema", ArticleSchema);