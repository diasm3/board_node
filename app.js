"use strict"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"
import { engine } from "express-handlebars"
import router from "./routes/api.js"
import methodOverride from "method-override"
connectDB()
const app = express()

// express_handlebars 설// Handlebars
app.engine(
  ".hbs",
  engine({
    // helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: "index",
    extname: ".hbs",
  })
)
app.set("view engine", ".hbs")

// config dotenv
dotenv.config({ path: "./config/config.env" })
// db = mongoose.connection()



app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride(function (req, res){ 
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method
      delete req.body._method
      return method
    }
}))

app.use("/api", router)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
