import mongoose from 'mongoose';

// UserSchema.js
const UserSchema = new mongoose.Schema ({
    writer: {
        type: String,
        required: true,
    }, 
    createdAt:{
        type : Date,
        default: Date.now
    }
})
export default new mongoose.model('UserSchema',UserSchema)