import { Router } from "express"
import UserSchema from "../models/UserSchema.js"
import BoardSchema from "../models/BoardSchema.js"
import CommentSchema from "../models/CommentSchema.js"
import increment from "../middleware/increment.js"
const router = Router()

// 게시물 관련 API

// @Desc : 게시글 목록 조회
// @Route : GET /api/list
router.get("/list", async (req, res) => {
  console.log("/list")
  try {
    const board = await BoardSchema.find({}).sort({ createdat: -1 }).lean()
    console.log(board)
    res.render("board/board.hbs", { board })
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
    await BoardSchema.create(
      Object.assign(req.body, { number: res.locals.count })
    )

    if (req.body.title && req.body.body && req.body.writer) {
      res.redirect("/api/list")
    }
  } catch (err) {
    console.error(err)
    //error page validate
    //res.redirect("error/404.hbs")
  }
})

// @Desc : 게시글 조회(클릭시 하나만 나옴)
// @Route : GET /api/read/:number
// @Param : number
router.get("/read/:number", async (req, res) => {
  try {
    const read = await BoardSchema.findOne({ number: req.params.number }).lean()
    res.render("board/read", { read })
  } catch (err) {
    console.error(err)
  }
})

// @Desc : 게시글 수정 전 내용
// @Route : GET /api/edit/:number
// @Param : number
router.get("/edit/:number", async (req, res) => {
  try {
    const edit = await BoardSchema.findOne({ number: req.params.number }).lean()
    res.render("board/edit", { edit })
  } catch (err) {
    console.error(err)
  }
})

// @Desc : 게시글 수정
// @Route : PUT /api/edit/:number
// @Param : number
router.put("/edit/:number", async (req, res) => {
  try {
    await BoardSchema.findOneAndUpdate(
      { number: req.params.number },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    res.redirect("/api/list")
  } catch (err) {
    console.error(err)
  }
})

// @Desc : 게시글 삭제
// @Route : DELETE /api/delete/:number
// @Param : number
router.delete("/delete/:number", async (req, res) => {
    try {
        await BoardSchema.remove({ number: req.params.number })
        res.redirect("/api/list")

    } catch(err){
        console.error(err)
    }
    
})

// @Desc : 코멘트 조회
// @Route : GET /api/commentRead/:articleNumber
// @Param : articleNumber
// @Rules : 작성 날짜 기준으로 내림차순
router.get("/commentRead/:articleNumber")

// @Desc :  코멘트 작성
// @Route : POST /api/commentWrite
// @Param :  writer, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.post("/commentWrite")

// @Desc : 코멘트 수정
// @Route : PUT /api/commentEdit/:commentNumber
// @Param : commentNumber, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.put("/commentEdit/:commnetNumber")

// @Desc : 코멘트 삭제
// @Route : PUT /api/edit/:number
// @Param : number
router.delete("/commentDelete/:commnetNumber")

export default router
