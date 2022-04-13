import mongoose from "mongoose";
import IncSchema from "../models/IncSchema.js"

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


// BoardSchema.virtual("todoId").get(function () {
//     // console.log(this._id.toHexString())

//     console.log(todoId)
//     console.log("hello inside")
//     return this._id.toHexString()
//   })
//   BoardSchema.set("toJSON", {
//     virtuals: true,
//   })

// const test = new mongoose.model("test", BoardSchema)



// BoardSchema.pre('save', async function (next)  { //   console.log("ware lunched")
//   await IncSchema.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true })
//     .then((result) => {
//         // console.log(reqbody)
//         console.log(res)
//         res.locals.count = result.count
//         console.log(result)

//         this.number = result.count
//       return (next() )
//     })
//     .catch((err) => {
//       console.log(err)
//       return next()
//     })
// })


export default new mongoose.model('BoardSchema', BoardSchema);



