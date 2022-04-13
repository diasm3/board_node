import { Router } from "express"
import increment from "../middleware/increment.js"
import { board } from "./service/boardService.js"
const boardRouter = Router()
const {
  getList,
  getWrite,
  getRead,
  postWrite,
  getBeforeEdit,
  putEdit,
  deleteArticle,
} = board


// 게시물 관련 API

// @Desc : 게시글 목록 조회
// @Route : GET /api/list
boardRouter.get("/list", getList)

// @Desc : 게시글 작성
// @Route : GET /api/write
// @Param : title, body, writer
boardRouter.get("/write", getWrite)

// @Desc : 게시글 작성
// @Route : POST /api/write
// @Param : title, body, writer
boardRouter.post("/write",increment, postWrite)

// @Desc : 게시글 조회(클릭시 하나만 나옴)
// @Route : GET /api/read/:number
// @Param : number
boardRouter.get("/read/:number", getRead)

// @Desc : 게시글 수정 전 내용
// @Route : GET /api/edit/:number
// @Param : number
boardRouter.get("/edit/:number", getBeforeEdit)

// @Desc : 게시글 수정
// @Route : PUT /api/edit/:number
// @Param : number
boardRouter.put("/edit/:number", putEdit)

// @Desc : 게시글 삭제
// @Route : DELETE /api/delete/:number
// @Param : number
boardRouter.delete("/delete/:number", deleteArticle)

export default boardRouter

