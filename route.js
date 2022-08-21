const express = require("express");
const app = express();

const port = 4000;

const user = require("./user.json");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

//routing
app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/game", (req, res) => {
  return res.render("game");
});

app.get("/login", (req, res) => {
  return res.render("login");
});

//proses login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let userFound;

  if (user.username === username) {
    userFound = user;
  }

  if (!userFound) {
    console.log("Not Found Username");
    return res.render("login");
  }

  if (user.password != password) {
    console.log("Wrong Password");
    return res.render("login");
  }

  return res.render("game");
});

app.listen(port, () => {
  console.log(`Server in http://localhost:${port}`);
});
