const bcrypt = require("bcryptjs/dist/bcrypt");
const { Admin, User } = require("./role");

const users = [];

const initDemoUsers = async () => {
  const hashedPassword = await bcrypt.hash("1234", 10);

  const demoAdmin = {
    id: users.length + 1,
    username: "adminUser",
    password: hashedPassword,
    role: Admin,
    account: {
      balance: "1000000",
      accountNumber: Math.round(Math.random() * 10000000),
    },
  };

  const demoUser = {
    id: users.length + 1,
    username: "park",
    password: hashedPassword,
    role: User,
    account: {
      balance: "1000000",
      accountNumber: Math.round(Math.random() * 10000000),
    },
  };

  users.push(demoAdmin);
  users.push(demoUser);
};

initDemoUsers();

module.exports = {
  users,
};
