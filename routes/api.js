import { Router } from "express"
import BoardSchema from "../models/BoardSchema.js"
import CommentSchema from "../models/CommentSchema.js"
import increment from "../middleware/increment.js"
const router = Router()

// 게시물 관련 API

// @Desc : 게시글 목록 조회
// @Route : GET /api/list
router.get("/list", async (req, res) => {
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
})

// @Desc : 게시글 작성
// @Route : GET /api/write
// @Param : title, body, writer
router.get("/write", (req, res) => {
  res.render("board/write")
})

// @Desc : 게시글 작성
// @Route : POST /api/write
// @Param : title, body, writer
router.post("/write", increment, async (req, res) => {
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
})

// @Desc : 게시글 조회(클릭시 하나만 나옴)
// @Route : GET /api/read/:number
// @Param : number
router.get("/read/:number", async (req, res) => {
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
})

// @Desc : 게시글 수정 전 내용
// @Route : GET /api/edit/:number
// @Param : number
router.get("/edit/:number", async (req, res) => {
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
})

// @Desc : 게시글 수정
// @Route : PUT /api/edit/:number
// @Param : number
router.put("/edit/:number", async (req, res) => {
  try {
    if (req.body.title && req.body.body && req.body.writer) {
      await BoardSchema.findOneAndUpdate(
        { number: req.params.number },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
    } else {
      res.write("<script>alert('please checking title and context')</script>")
      res.write('<script>window.location="../api/list"</script>')
    }
    res.redirect("/api/list")
  } catch (err) {
    console.error(err)
    res.render("error/404.hbs")
  }
})

// @Desc : 게시글 삭제
// @Route : DELETE /api/delete/:number
// @Param : number
router.delete("/delete/:number", async (req, res) => {
  try {
    await BoardSchema.remove({ number: req.params.number })
    res.redirect("/api/list")
  } catch (err) {
    console.error(err)
    res.render("error/404.hbs")
  }
})

// @Desc :  코멘트 작성
// @Route : POST /api/commentWrite
// @Param :  writer, body // @Rules : if body is None "댓글 내용을 입력해주세요" return
router.post("/commentWrite/:articleNumber", increment, async (req, res) => {
  try {
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
})

// @Desc : 코멘트 수정 페이지
// @Route : GET /api/commentEdit/:commentNumber
// @Param : commentNumber, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.get("/commentEdit/:commentNum", async (req, res) => {
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
})

// @Desc : 코멘트 수정
// @Route : PUT /api/commentEdit/:commentNumber
// @Param : commentNumber, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.put("/commentEdit/:commentNum", async (req, res) => {
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
})

// @Desc : 코멘트 삭제
// @Route : PUT /api/commentDelete/:commentnumber
// @Param : number
router.delete("/commentDelete/:commentNum", async (req, res) => {
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
})

export default router
