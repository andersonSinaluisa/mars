const express = require("express");
const morgan = require("morgan");
const conectarDB = require("./database");
const cors = require("cors");
require("dotenv").config();
const app = express();
conectarDB();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));

app.listen(process.env.PORT || 3400, process.env.ip, function () {
  console.log("Server is running!");
});
