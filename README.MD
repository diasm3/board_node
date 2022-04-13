# 스파르타 주특기 첫주차 개인과제
* 어제 학습한 내용을 가지고 빈 페이지 부터 시작해서 작업을 진행한다.
* 디자인은 고려하지 않는다.

## 아래 내용대로 작성 후 문제점 
* [ ] 하다 보니 디자인이 거슬린다... 
    - CSS 손대지 마라...
* [ ] redirect 부분이 고려가 안되었다
    - 코멘트의 삭제 API를 불러왔을때 바로 전단계로 다시 불러오고싶지만 안된다.
    - 아직 고민을 더 해봐야한다... 
* [ ] 예외처리 부분에 대해서 조금 더 고민해봐야한다
    - 뭔가 잘못하고 있는거 같다... 
* [ ] 백에서 보내서 프론트에서 받은 내용이 깨지는 문제점
    - 아래 코드를 이용해 완료했다. 모든 내용을 보낼때마다 UTF로 어떻게 보낼 것인가?
    - res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
* [ ] 리펙토링을 하면서 코드의 가독성이 좋아지지만 파일 구조가 복잡해지는 문제점
    - 리펙토링을 과하게 하지 말자
    - 어떤 내용을 중심으로 리펙토링을 해야할지 미리 생각해야 한다
* [ ] 변수들을 안으로 넣는가 아니면 구조화 하는가 고민해봐야하나?
    - 
* [ ] 게시물의 ID를 몽고디비에서 제공하는 Id 변경해서 다시 해보자
    - 기존에는 내가 임의로 생성한 number를 카운팅하는 방식으로 넘버링을 했다
    - 그리고 게시물의 넘버링과 코멘트의 넘버링을 같이 카운터 해버리기때문에 게시물의 넘버링을 해줄 수 없다 -> 근데 꼭 해줘야하나? 
* [ ] 생각을 한대로 진행은 했지만 개인적인 프로젝트를 싫행하면서 계속 바뀌는 점이 발생하였다
    - 100% 생각대로 된다면 더할 나위 없겠지만, 생각지 못한 부분에서 막히거나 잘못 설계한 경우에는 롤백을 할 수 밖에 없다는 생각이 든다
    - 처음 설계시 충분한 생각을 가지고 내용을 정리한 후 예외 처리같은 부분을 잘 생각해서 설계를 해야 할거 같다



## 리팩토링 내역 
* api.js 
  - [ ]





## 개발 명세서
1. 전체 게시글 목록 조회
    - [x] 제목, 작성자명, 작성 날짜를 조회하기
    - [x] 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성
    - [x] 제목, 작성자명, 작성 내용을 입력하기
3. 게시글 조회
    - [x] 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기
4. 게시글 수정
    - [x] 제목, 작성자명, 작성 내용 중 원하는 내용을 수정하기
5. 게시글 삭제
    - [x] 원하는 게시물을 삭제하기
6. 댓글 목록 조회 
    - [x] 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기 
    - [x] 작성 날짜 기준으로 내림차순 정렬하기
7. 댓글 작성
    - [x] 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - [x] 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
8. 댓글 수정
    - [x] 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - [x] 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
9.  댓글 삭제
    - [x] 원하는 댓글을 삭제하기

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
    },
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


* Board API

```javascript


app.use('/api', require('./routes/api'))


// api endpoint


// 게시물 관련 API

// @Desc : 게시글 목록 조회
// @Route : GET /api/list
router.get('/list')

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


```


* 댓글 관련 API
```javascript

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
## Views 구조
* header.hbs
* board.hbs
    - 게시글 목록 조회
    - Col( 제목(코멘트(수)), 작성자명, 작성날짜, )
* edit.hbs
    - 게시글 수정
    - Col( 제목, 작성자명, 작성날짜, 내용)
* write.hbs
    - 게시글 작성
    - Col( 제목, 작성자명, 작성날짜, 내용)
* comment.hbs 
    - 댓글 조회, 작성, 수정, 삭제까지 한번에?
    - Col( 작성자명, 내용, 작성날짜)




## 필요한 모듈
* mongoose
* express
* dotenv
* express-handlebars
* method-override
* morgan

- 추가된 모듈
