const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const authenticateJWT = require("./middlewares/authenticate");
const { Admin, User } = require("./role");

// 인메모리 DB 사용
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    role: Admin,
  },
];

// JWT 비밀키
const SECRET_KEY = "mysecretkey";

const app = express();
app.use(bodyParser.json());

// 회원가입 엔드포인트
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // 유저가 이미 존재하는지 확인
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 새로운 유저 추가
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role: User,
  };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully" });
});

// 로그인 엔드포인트
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 유저 찾기
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // 비밀번호 확인
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // JWT 토큰 발급
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// 인증이 필요한 라우트 예시
app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});

// 서버 실행
app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:" + process.env.PORT);
});
