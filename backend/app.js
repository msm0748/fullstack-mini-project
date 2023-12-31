const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;
const db = require('./models');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// 배포시 경로
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const indexRouter = require('./routes/todo');
app.use(indexRouter);

db.sequelize.sync({ force: false }).then(() => {
  // force: false; 실제 데이터베이스에 테이블이 존재하지 않으면 모델에 정의한대로 생성
  // force: true; 데이터베이스에 테이블 있어도 무조건 생성
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
