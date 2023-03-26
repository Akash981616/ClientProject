const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    mobile_no: String,
    role: { type: String, default: "reccee" },
    password: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
