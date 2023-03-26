const mongoose = require("mongoose");
const { Schema } = mongoose;
const comapnyAddListSchema = new Schema(
  {
    store_name: String, // String is shorthand for {type: String}
    address: String,
    area: String,
    contact_number: String,
    // company_id: String, // chage to company with id
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    visit_by: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

const CompanyAddListModel = mongoose.model("CompanyAddList", comapnyAddListSchema);
module.exports = CompanyAddListModel;


// {
//   "store_name": "kariyana store", 
//   "address": "gali no 6",
//   "area": "islamabad amritsar",
//   "contact_name": "7696084898",
//   "company_name": "evercode plus technology",
//   "visit_by": "amritsar"
// }