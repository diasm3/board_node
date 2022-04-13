import { Router } from "express"
import increment from "../middleware/increment.js"
import { board, comment } from "./service/service.js"
const router = Router()
const {
  getList,
  getWrite,
  getRead,
  postWrite,
  getBeforeEdit,
  putEdit,
  deleteArticle,
} = board

const { getCommentEdit, postCommentWrite, putCommentEdit, deleteComment } =
  comment

// 게시물 관련 API

// @Desc : 게시글 목록 조회
// @Route : GET /api/list
router.get("/list", (req, res) => getList(req, res))

// @Desc : 게시글 작성
// @Route : GET /api/write
// @Param : title, body, writer
router.get("/write", (req, res) => getWrite(req, res))

// @Desc : 게시글 작성
// @Route : POST /api/write
// @Param : title, body, writer
router.post("/write", increment, async (req, res) => postWrite(req, res))

// @Desc : 게시글 조회(클릭시 하나만 나옴)
// @Route : GET /api/read/:number
// @Param : number
router.get("/read/:number", async (req, res) => getRead(req, res))

// @Desc : 게시글 수정 전 내용
// @Route : GET /api/edit/:number
// @Param : number
router.get("/edit/:number", async (req, res) => getBeforeEdit(req, res))

// @Desc : 게시글 수정
// @Route : PUT /api/edit/:number
// @Param : number
router.put("/edit/:number", async (req, res) => putEdit(req, res))

// @Desc : 게시글 삭제
// @Route : DELETE /api/delete/:number
// @Param : number
router.delete("/delete/:number", async (req, res) => deleteArticle(req, res))

// 댓글 관련 API

// @Desc :  코멘트 작성
// @Route : POST /api/commentWrite
// @Param :  writer, body // @Rules : if body is None "댓글 내용을 입력해주세요" return
router.post("/commentWrite/:articleNumber", increment, async (req, res) =>
  postCommentWrite(req, res)
)

// @Desc : 코멘트 수정 페이지
// @Route : GET /api/commentEdit/:commentNumber
// @Param : commentNumber, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.get("/commentEdit/:commentNum", async (req, res) =>
  getCommentEdit(req, res)
)

// @Desc : 코멘트 수정
// @Route : PUT /api/commentEdit/:commentNumber
// @Param : commentNumber, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.put("/commentEdit/:commentNum", async (req, res) =>
  putCommentEdit(req, res)
)

// @Desc : 코멘트 삭제
// @Route : PUT /api/commentDelete/:commentnumber
// @Param : number
router.delete("/commentDelete/:commentNum", async (req, res) =>
  deleteComment(req, res)
)

export default router
