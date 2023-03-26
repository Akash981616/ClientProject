const UserModel = require("../models/user");

exports.createUser = async () => {
  const adminUser = {
    name: "Admin",
    mobile_no: "8886878758",
    role: "admin",
    password: "admin",
  };

  const user = await UserModel.findOne(adminUser);

  if (!user) {
    await UserModel.create(adminUser);
  }
};
