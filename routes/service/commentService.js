import CommentSchema from "../../models/CommentSchema.js"

const alertMessage = (res, message) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
  res.write(`<script>alert('${message}')</script>`)
  // res.write(`<script>window.location="../${req.originalUrl}"</script>`)
}

export const comment = {
  deleteComment: async (req, res) => {
    try {
      const { commentNum } = req.params.commentNum

      if (commentNum) {
        await CommentSchema.deleteOne({ commentNum: commentNum })
        res.redirect("/api/list")
        req.redirect(req.originalUrl)
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
      const { body, writer } = req.body
      const { commentNum } = req.params.commentNum

      if (body && writer) {
        await CommentSchema.findOneAndUpdate(
          { commentNum },
          { body, writer },
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

  /* @desc : getBeforeEdit
  *
  */
  getCommentEdit: async (req, res) => {
    try {
      const  commentNum  = req.params.commentNum
      if (commentNum) {
        const comment = await CommentSchema.findOne({
          commentNum: commentNum,
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
      const { body, writer } = req.body
      const articleNumber = req.params.articleNumber
      const commentNum = res.locals.count

      if (body && writer) {
        await CommentSchema.create({ body, writer, articleNumber, commentNum })

        res.redirect("/api/read/" + articleNumber)
      } else {
        res.write("<script>alert('something worng with your mind')</script>")
        res.write(`<script>window.location="../read/${articleNumber}"</script>`)
      }
    } catch (err) {
      console.error(err)
      res.render("error/404.hbs")
    }
  },
}
