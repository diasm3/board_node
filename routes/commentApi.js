import { Router } from "express"
import { comment } from "./service/commentService.js"
import increment from "../middleware/increment.js"
const commentRouter = Router()
const { getCommentEdit, postCommentWrite, putCommentEdit, deleteComment } =
  comment
// 댓글 관련 API

// @Desc :  코멘트 작성
// @Route : POST /api/commentWrite
// @Param :  writer, body 
commentRouter.post("/commentWrite/:articleNumber", increment, postCommentWrite)

// @Desc : 코멘트 수정 페이지
// @Route : GET /api/commentEdit/:commentNumber
// @Param : commentNumber, body
commentRouter.get("/commentEdit/:commentNum", getCommentEdit)

// @Desc : 코멘트 수정
// @Route : PUT /api/commentEdit/:commentNumber
// @Param : commentNumber, body
commentRouter.put("/commentEdit/:commentNum", putCommentEdit)

// @Desc : 코멘트 삭제
// @Route : PUT /api/commentDelete/:commentnumber
// @Param : number
commentRouter.delete("/commentDelete/:commentNum", deleteComment)

export default commentRouter
