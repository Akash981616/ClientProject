const mongoose = require("mongoose");
const { Schema } = mongoose;
const employeeSchema = new Schema(
  {
    name: {
      type: String,
    },
    contact_number: String,
    EmployeeId: String
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model("Employee", employeeSchema);
module.exports = EmployeeModel;

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