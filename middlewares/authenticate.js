const jwt = require("jsonwebtoken");

// JWT 비밀키
const SECRET_KEY = "mysecretkey";

// 인증 미들웨어
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access Token Required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // 토큰의 페이로드 데이터를 req 객체에 저장
    next(); // 다음 미들웨어 또는 라우트로 진행
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateJWT;
