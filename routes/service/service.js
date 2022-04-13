import BoardSchema from "../../models/BoardSchema.js"
import CommentSchema from "../../models/CommentSchema.js"

const alertMessage = (res, message) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write(`<script>alert('${message}')</script>`)
  // res.write(`<script>window.location="../${req.originalUrl}"</script>`)
}

export const board = {
  deleteArticle: async (req, res) => {
    try {
      const { number } = req.params.number

      await BoardSchema.remove({ number: number})
      res.redirect("/api/list")
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },
  putEdit: async (req, res) => {
    try {
      const { title, body, writer } = req.body
      const  number  = req.params.number

      if (title && body && writer) {
        await BoardSchema.findOneAndUpdate({ number: number }, req.body, {
          new: true,
          runValidators: true,
        })
        res.redirect("/api/list")
      } 
        alertMessage(res, "제목, 내용, 작성자를 입력해주세요")
        res.redirect('back')

        // req.redirect(req.originalUrl)
        // res.write('<script>window.location="../api/list"</script>')
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },
  getBeforeEdit: async (req, res) => {
    try {
      if (req.params.number) {
        const edit = await BoardSchema.findOne({
          number: req.params.number,
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
      if (req.params.number) {
        const read = await BoardSchema.findOne({
          number: req.params.number,
        }).lean()
        const comment = await CommentSchema.find({
          articleNumber: req.params.number,
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
  postWrite: async (req, res) => {
    try {
      if (req.body.title && req.body.body && req.body.writer) {
        await BoardSchema.create(
          Object.assign(req.body, { number: res.locals.count })
        )
        res.redirect("/api/list")
      } else {
        // expection 처리
        res.write("<script>alert('please checking title and context')</script>")
        res.write('<script>window.location="../api/list"</script>')
      }
    } catch (err) {
      console.error(err)
      //error page validate
      res.render("error/404.hbs")
    }
  },
  getWrite: (req, res) => {
    res.render("board/write")
  },
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
}

export const comment = {
  deleteComment: async (req, res) => {
    try {
      


      if (req.params.commentNum) {
        //   await CommentSchema.remove({ commentNum: req.params.commentNum })
        await CommentSchema.deleteOne({ commentNum: req.params.commentNum })
        res.redirect("/api/list")
        req.redirect(req.originalUrl)
        //   res.write("<script>history.back(true)</script>")
        //   res.write("<script>location.reload(true)</script>")
      } else {
        res.write("<script>alert('something in your mind')</script>")
        res.write(`<script>window.location="../api/list"</script>`)
      }
    } catch (err) {
      console.error(err)
    }
  },
  putCommentEdit: async (req, res) => {
    try {
      if (req.body.body && req.body.writer) {
        await CommentSchema.findOneAndUpdate(
          { commentNum: req.params.commentNum },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
        res.redirect("/api/list")
      } else {
        res.write("<script>alert('please input data both of them')</script>")
        res.write('<script>window.location="../api/list"</script>')
      }
    } catch (err) {
      console.error(err)
    }
  },
  getCommentEdit: async (req, res) => {
    try {
      if (req.params.commentNum) {

        const comment = await CommentSchema.findOne({
          commentNum: req.params.commentNum,
        }).lean()
        res.render("board/comment", { comment })
      } else {
        res.write("<script>alert('something worng with your mind')</script>")
        res.redirect("/api/list")
      }
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },
  postCommentWrite: async (req, res) => {
    try {
      const { body, writer, articleNumber } = req.body




      if (req.body.body && req.body.writer) {
        await CommentSchema.create(
          Object.assign(req.body, {
            articleNumber: req.params.articleNumber,
            commentNum: res.locals.count,
          })
        )

        res.redirect("/api/read/" + req.params.articleNumber)
      } else {
        res.write("<script>alert('something worng with your mind')</script>")
        res.write(
          `<script>window.location="../read/${req.params.articleNumber}"</script>`
        )
      }
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },
}
