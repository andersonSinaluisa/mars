const express = require("express");
const morgan = require("morgan");
const conectarDB = require("./database");
const cors = require("cors");
require("dotenv").config();
const io = require("socket.io");
const app = express();
const http = require("http")(app);
conectarDB();
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.use(morgan("dev"));
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));

http.listen(process.env.PORT || 3400, process.env.ip, function () {
  console.log("Server is running!");
});
