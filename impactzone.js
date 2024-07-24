require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
const http = require("http");
var cors = require("cors");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(cors({ origin: "*" }));
const path = require("path");

app.use(bodyParser.json());
app.use(cookieParser());
const allRoutes = require("./router/allRoutes");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/api", allRoutes);

app.use((req, res) => {
  return res.status(404).json({ success: false, message: "Not Found" });
});

const port = process.env.APP_PORT;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
