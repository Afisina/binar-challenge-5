const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Admin } = require("../models");

/* Local Strategy Authentication */
//fungsi untuk authentication
async function authenticate(username, password, done) {
  try {
    //memanggil method dari admin.js
    const admin = await Admin.authenticate({ username, password });
    return done(null, admin);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use(new LocalStrategy({ usernameField: "username", passwordField: "password" }, authenticate));

//serialize dan deserialize untuk membuat sesi dan menghapus sesi
passport.serializeUser((admin, done) => done(null, admin.id));
passport.deserializeUser(async (id, done) => done(null, await Admin.findByPk(id)));

/* End of Local Strategy Authentication */
module.exports = passport;
