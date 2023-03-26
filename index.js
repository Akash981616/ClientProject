const express = require("express");
const officegen = require("officegen");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expressFileUpload = require("express-fileupload");

const path = require("path");
const app = express();
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const companyRouter = require("./routes/company");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error");
const { createUser } = require("./migrations");
require("dotenv").config();

const { DB_URI } = process.env;

app.use(cors());
app.use(expressFileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);

async function connect() {
  try {
    await mongoose.connect(`${DB_URI}`);
    createUser();
    console.log("DB connected");
  } catch (e) {
    console.log(e);
  }
}

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  connect();

  console.log("Listening on port", PORT);
});
