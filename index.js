const express = require('express')
const app = express()
const port = 3000
const { User } = require("./models/User");
const bodyParser = require('body-parser');

//application/x-www-form-urlencoded 이렇게 전송되는 데이터를 분석해서 가져올수있게한다.
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://DBhye:813813as@boiler-plate.ijhi9.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    userNewParser: true, userUnifiedTopology: true, userCreateIndex: true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
    .catch(err=>console.log(err))
    
app.get('/', (req, res) => {
  res.send('Hello World!안녕하세요')
})

app.post('/register', (req, res) => {
//회원가입할 때 필요한 정보들을 client에서 가져오면 
//그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body)


                  //저장한 userInfo를
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({ //status (성공하면) json형식으로 정보전달
      success:true
    })
  }) //정보들이 usermodel에 저장됨
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})