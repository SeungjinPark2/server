// 역할을 확인하는 미들웨어
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient privileges" });
    }

    next(); // 권한이 있는 경우 다음 미들웨어 또는 라우트 핸들러로 진행
  };
};

module.exports = roleMiddleware;
