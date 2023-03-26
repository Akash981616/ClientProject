const mongoose = require("mongoose");
const { Schema } = mongoose;
const formSchema = new Schema(
  {
    name: String,
    shop_name: String, // String is shorthand for {type: String}
    address: String,
    gst: String,
    phone_no: String,
    ppt_path: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const FormModel = mongoose.model("Form", formSchema);
module.exports = FormModel;
