import IncSchema from "../models/IncSchema.js"

export default (req, res, next) => {
  console.log("middle ware lunched")
  IncSchema.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true })
    .then((result) => {
      res.locals.count = result.count
      next()
    })
    .catch((err) => {
      console.log(err)
      next()
    })
}
