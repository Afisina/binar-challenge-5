const router = require("express").Router();

//controllers
const adminController = require("./controllers/adminController");

//homepage
router.get("/", (req, res) => {
  return res.render("index");
});

router.get("/game", (req, res) => {
  return res.render("game");
});

//register page
router.get("/register", (req, res) => res.render("register"));
router.post("/register", adminController.register);

//login page
router.get("/login", (req, res) => res.render("login"));
router.post("/login", adminController.login);

module.exports = router;
