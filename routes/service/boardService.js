import BoardSchema from "../../models/BoardSchema.js"
import CommentSchema from "../../models/CommentSchema.js"

const alertMessage = (res, message) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.write(`<script>alert('${message}')</script>`)
  // res.write(`<script>window.location="../${req.originalUrl}"</script>`)
}

export const board = {
  getList: async (req, res) => {
    try {
      if (!req.query.page) {
        const board = await BoardSchema.find({}).sort({ createdAt: -1 }).lean()
        res.render("board/board.hbs", { board })
      } else {
        res.write("<script>alert('something problem in server')</script>")
        res.redirect("/")
      }
    } catch (err) {
      console.error(err)
    }
  },

  getWrite: (req, res) => {
    res.render("board/write")
  },

  putEdit: async (req, res) => {
    try {
      const { title, body, writer } = req.body
      const number = req.params.number

      if (title && body && writer) {
        await BoardSchema.findOneAndUpdate(
          { number: number },
          { title, body, writer },
          {
            new: true,
            runValidators: true,
          }
        )
        res.redirect("/api/list")
      }
      alertMessage(res, "제목, 내용, 작성자를 입력해주세요")
      res.redirect("back")
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },

  getBeforeEdit: async (req, res) => {
    try {
      const number = req.params.number

      if (number) {
        const edit = await BoardSchema.findOne({
          number: number,
        }).lean()
        res.render("board/edit", { edit })
      } else {
        res.write("<script>alert('something worng with your mind')</script>")
        res.write('<script>window.location="../api/list"</script>')
      }
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },

  getRead: async (req, res) => {
    try {
      const number = req.params.number

      if (number) {
        const read = await BoardSchema.findOne({
          number: number,
        }).lean()
        const comment = await CommentSchema.find({
          articleNumber: number,
        })
          .sort({ createdAt: -1 })
          .lean()

        res.render("board/read", { read, comment })
      } else {
        res.write("<script>alert('something worng with your mind')</script>")
        res.write('<script>window.location="../api/list"</script>')
      }
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },

  postWrite: async function (req, res) {
    try {
      const { title, body, writer } = req.body
      const number = res.locals.count
      console.log(number)

      if (title && body && writer) {
        await BoardSchema.create({ title, body, writer, number })
        res.redirect("/api/list")
      } else {
        // expection 처리
        res.write("<script>alert('please checking title and context')</script>")
        res.write('<script>window.location="../api/list"</script>')
      }
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const number = req.params.number

      await BoardSchema.remove({ number })
      res.redirect("/api/list")
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },
}
