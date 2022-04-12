import { Router } from "express"
const router = Router()



// @Desc : 메인 랜딩페이지
// @Route : GET /
router.get("/", async (req, res) => {
  try {

    res.render("dashboard/dashboard.hbs")
  } catch (err) {
    console.error(err)
  }
})

export default router