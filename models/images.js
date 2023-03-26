const mongoose = require("mongoose");
const { Schema } = mongoose;
const imageSchema = new Schema(
  {
    width: String,
    height: String, // String is shorthand for {type: String}
    quantity: String,
    requirment_type: String,
    path: String,
    form: {
      type: Schema.Types.ObjectId,
      ref: "Form",
    },
  },
  {
    timestamps: true,
  }
);

const ImageModel = mongoose.model("Image", imageSchema);
module.exports = ImageModel;
