import mongoose from "mongoose"

// UserSchema.js
const IncSchema = new mongoose.Schema({
  count: {
    type: Number,
  },
  new: {
    type: Boolean,
  },
})
export default new mongoose.model("IncSchema", IncSchema)
