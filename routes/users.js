const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userData = require("../data/users");

router.get("/", (req, res) => {
  if (req.session.user && req.session.user.employee == "on") {
    res.redirect("/employeeProfile");
  } else if (req.session.user) {
    res.redirect("/userProfile");
  } else {
    res.render("site/homepage", {});
  }
});

router.get("/signup", (req, res) => {
  if (req.session.user) {
    res.redirect("/userProfile");
  } else {
    res.render("site/signUp", {});
  }
});

router.post("/signup", async (req, res) => {
  try {
    let request = req.body;
    const firstName = request.firstName;
    const lastName = request.lastName;
    const email = request.email;
    const password = request.password;
    const employee = request.employee;

    if (
      firstName == undefined ||
      lastName == undefined ||
      email == undefined ||
      password == undefined
    ) {
      throw "All fields must be provided";
    }
    if (typeof email != "string") {
      throw "email must be a string.";
    }
    if (email.trim().length == 0) {
      throw "email must not be only spaces.";
    }
    if (email.indexOf(".") == -1) {
      throw "email must be a valid email address.";
    }
    const ext = email.slice(email.lastIndexOf(".") + 1);
    if (ext.length < 2) {
      throw "email must be a valid email address.";
    } else {
      for (let i = 0; i < ext.length; i++) {
        if (/[a-zA-Z]/.test(ext[i])) {
          continue;
        } else {
          throw "email must be a valid email address.";
        }
      }
    }

    if (typeof firstName != "string" || typeof lastName != "string") {
      throw "first name/last name  must be a valid string";
    }
    if (
      firstName.trim().length == 0 ||
      lastName.trim().length == 0 ||
      email.trim().length == 0 ||
      password.trim().length == 0
    ) {
      throw "first name/last name/email/password must not be empty";
    }
    for (let i = 0; i < firstName.length; i++) {
        if (
          !(firstName.charCodeAt(i) > 64 && firstName.charCodeAt(i) < 91) &&
          !(firstName.charCodeAt(i) > 96 && firstName.charCodeAt(i) < 123)
        ) {
          throw "you must provide a valid first name";
        }
    }
    for (let i = 0; i < lastName.length; i++) {
      if (
        !(lastName.charCodeAt(i) > 64 && lastName.charCodeAt(i) < 91) &&
        !(lastName.charCodeAt(i) > 96 && lastName.charCodeAt(i) < 123)
      ) {
        throw "you must provide a valid last name";
      }
    }
    if (firstName.length < 1 || lastName.length < 1) {
      throw "first name/last name must be 1 character long or more";
    }

    if (typeof password != "string") {
      throw "password must be a valid string";
    }
    if (password.trim().length == 0) {
      throw "password must not be empty";
    }
    if (password.length < 6) {
      throw "password must be at least 6 characters";
    }
    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) == " ") {
        throw "password cannot have spaces";
      }
    }

    const createUser = await userData.createUser(
      firstName,
      lastName,
      email,
      password,
      employee
    );
    if (createUser.userInserted == true) {
      res.redirect("/");
    } else {
      res.status(500).render("site/signup", { error: e });
    }
  } catch (e) {
    res.status(400).render("site/signup", { error: e });
    return;
  }
});

router.post("/homepage", async (req, res) => {
  try {
    let request = req.body;
    const email = request.email;
    const password = request.password;

    if (email == undefined || password == undefined) {
      throw "email and password must be provided";
    }
    if (typeof email != "string") {
      throw "email must be a valid string";
    }
    if (email.trim().length == 0) {
      throw "email must not be empty";
    }
    if (email.indexOf(".") == -1) {
      throw "email must be a valid email address.";
    }
    const ext = email.slice(email.lastIndexOf(".") + 1);
    if (ext.length < 2) {
      throw "email must be a valid email address.";
    } else {
      for (let i = 0; i < ext.length; i++) {
        if (/[a-zA-Z]/.test(ext[i])) {
          continue;
        } else {
          throw "email must be a valid email address.";
        }
      }
    }
    if (typeof password != "string") {
      throw "password must be a valid string";
    }
    if (password.trim().length == 0) {
      throw "password must not be empty";
    }
    if (password.length < 6) {
      throw "password must be at least 6 characters";
    }
    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) == " ") {
        throw "password cannot have spaces";
      }
    }
    const checkUser = await userData.checkUser(email, password);
    if (checkUser.authenticated == true) {
      const firstName = checkUser.firstName;
      const lastName = checkUser.lastName;
      const employee = checkUser.employee;
      req.session.user = {
        userId: checkUser.userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        employee: employee,
      };
      if (req.session.user.employee == "on") {
        res.redirect("/employeeProfile");
      }
      if (req.session.user.employee == undefined) {
        res.redirect("/userProfile");
      }
    } else {
      res.status(400).render("site/homepage", { error: e });
    }
  } catch (e) {
    res.status(400).render("site/homepage", { error: e });
    return;
  }
});

router.get("/userProfile", (req, res) => {
  if (req.session.user) {
    res.render("site/userProfile", {
      userId: req.session.user.userId,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      email: req.session.user.email,
      employee: req.session.user.employee,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/employeeProfile", (req, res) => {
  if (req.session.user) {
    res.render("site/employeeProfile", {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      email: req.session.user.email,
      employee: req.session.user.employee,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("site/logout", {});
});

module.exports = router;
