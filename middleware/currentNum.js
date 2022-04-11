
import mongoose from "mongoose"
import IncSchema from "../models/IncSchema.js"

export default (req, res, next) => {
    IncSchema.find({count})
    .then((result) => {
      res.locals.count = result.count
      next()
    })
    .catch((err) => {
      console.log(err)
      next()
    })
}
