"use strict"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import morgan from "morgan"
import { engine } from "express-handlebars"
import router from "./routes/api.js"
import dashboardAPI from "./routes/dashboardAPI.js"
import methodOverride from "method-override"
import { formatDate,stripTags, truncate } from "./helpers/hbs.js"

// import {  formatDate, stripTags, truncate  } from "./helpers/hbs.js"
connectDB()
const app = express()

// express_handlebars 설// Handlebars

// Handlebars Helpers

// Handlebars
app.engine(
  ".hbs",
  engine({ helpers: { formatDate, stripTags, truncate }, defaultLayout: "index", extname: ".hbs" })
)
app.set("view engine", ".hbs")




// config dotenv
dotenv.config({ path: "./config/config.env" })


// app.use(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
// });



출처: https://wowan.tistory.com/59 [DevWarehouse]

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride(function (req, res){ 
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method
      delete req.body._method
      return method
    }
}))

app.use("/", dashboardAPI )
app.use("/api", router)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
