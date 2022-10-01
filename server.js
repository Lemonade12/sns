require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/index");
const db = require("./database/index");

const app = express();

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

app.use(routes);

// set port, listen for requests
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});
