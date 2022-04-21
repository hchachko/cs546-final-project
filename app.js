const express = require("express");
const multer = require("multer");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
const session = require("express-session");
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/private", (req, res, next) => {
  if (!req.session.user) {
    res
      .status(403)
      .render("site/error", { error: "The user is not logged in." });
  } else {
    next();
  }
});

// app.use(async (req, res, next) => {
//   let timestamp = new Date().toUTCString();
//   let requestMethod = req.method;
//   let requestRoute = req.originalUrl;
//   let authenticatedUser;
//   if (req.session.user) {
//     authenticatedUser = true;
//   } else {
//     authenticatedUser = false;
//   }
//   console.log(
//     `${timestamp} : ${requestMethod} ${requestRoute} USER AUTHENTICATED: ${authenticatedUser}`
//   );
//   next();
// });
configRoutes(app);

// middlewares

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
