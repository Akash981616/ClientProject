const mongoose = require("mongoose");
const { Schema } = mongoose;
const comapnySchema = new Schema(
  {
    name: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    total: {
      type: Number,
      default: 0
    },
    completed: {
      type: Number,
      default: 0
    },
    pending: {
      type: Number,
      default: 0
    },
    cancelled: {
      type: Number,
      default: 0
    },
    revisit: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = mongoose.model("Company", comapnySchema);
module.exports = CompanyModel;

// {
//   "name":"evercode plus technoglogy"
// }


// {
//   "total": 100,
//   "completed": 40,
//   "pending": 50,
//   "cancelled": 10,
//   "revisit": 20
// }