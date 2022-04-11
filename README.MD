# 스파르타 주특기 첫주차 개인과제
* 어제 학습한 내용을 가지고 빈 페이지 부터 시작해서 작업을 진행한다.
* 디자인은 고려하지 않는다.


## 개발 명세서
1. 전체 게시글 목록 조회
    - [ ] 제목, 작성자명, 작성 날짜를 조회하기
    - [ ] 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성
    - [ ] 제목, 작성자명, 작성 내용을 입력하기
3. 게시글 조회
    - [ ] 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기
4. 게시글 수정
    - [ ] 제목, 작성자명, 작성 내용 중 원하는 내용을 수정하기
5. 게시글 삭제
    - [ ] 원하는 게시물을 삭제하기
6. 댓글 목록 조회 
    - [ ] 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기 
    - [ ] 작성 날짜 기준으로 내림차순 정렬하기
7. 댓글 작성
    - [ ] 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - [ ] 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
8. 댓글 수정
    - [ ] 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - [ ] 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
9.  댓글 삭제
    - [ ] 원하는 댓글을 삭제하기

## DB Schema
* 개발 명세서를 참고하며 작성한다.
```javascript

// UserSchema.js
const UserSchema = new mongoose.Schema ({
    writer: {
        type: String,
        required: true,
    }, 
    createdAt:{
        type : Date,
        default: Date.now
    }
})

// BoardSchema.js
const BoardSchema= new mongoose.Schema ({
    number: {
        type: Number,
    },
    title : {
        type : String,
        required : true,
        trim; true,
    },
    body: {
        type: String,
        required: true,
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserChema',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


// CommentSchema.js
const CommentSchema = new mongoose.Schema({
    commnetNumber: {
        type: Number,
    },
    body: {
        type: String,
        required: true,
        trime: true,
    },
    writer: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserChema',
    }
    articleNumber: {
        type: Number,
        ref : 'BoardSchema',
    },
    createdAt: {
        type : Date,
        default: Date.now,
    }
})


```

## API 구조   
```javascript

app.use('/api', require('./routes/api'))


// api endpoint


// 게시물 관련 API

// @Desc : 게시글 목록 조회
// @Route : GET /api/board
router.get('/board')

// @Desc : 게시글 작성  
// @Route : POST /api/write
// @Param : title, body, writer
router.post('/write')

// @Desc : 게시글 조회(클릭시 하나만 나옴) 
// @Route : GET /api/read/:number
// @Param : number
router.get('/read/:number')


// @Desc : 게시글 수정
// @Route : PUT /api/edit/:number
// @Param : number
router.put('/edit/:number')

// @Desc : 게시글 삭제 
// @Route : DELETE /api/delete/:number
// @Param : number
router.delete('/delete/:number')




// 댓글 관련 API

// @Desc : 코멘트 조회 
// @Route : GET /api/commentRead/:articleNumber
// @Param : articleNumber
// @Rules : 작성 날짜 기준으로 내림차순
router.get('/commentRead/:articleNumber')

// @Desc :  코멘트 작성  
// @Route : POST /api/commentWrite
// @Param :  writer, body
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.post('/commentWrite')

// @Desc : 코멘트 수정
// @Route : PUT /api/commentEdit/:commentNumber
// @Param : commentNumber, body 
// @Rules : if body is None "댓글 내용을 입력해주세요" return
router.put('/commentEdit/:commnetNumber')

// @Desc : 코멘트 삭제 
// @Route : PUT /api/edit/:number
// @Param : number
router.delete('/commentDelete/:commnetNumber')



```



