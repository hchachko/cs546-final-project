const express = require("express");
const router = express.Router();
const menuData = require("../data/menu");
let { ObjectId } = require('mongodb');

router.get("/", async (req, res) => {
    if (req.session.user) {
      try{
        const menu = await menuData.getAll();
        res.render("site/menu", {firstName: req.session.user.firstName, menu: menu});
      } catch(e) {
        res.status(404).json({ message: e }); //TODO error out to a html page instead
      }
    } else {
      res.redirect("/");
    }
  });
  //.get(id) is still a work in progress (Harrison)
  router.get("/:id", async (req, res) => {
    if (req.session.user) {
      try{
        if (!req.params.id) throw "id needed";
        if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
        const menuItem = await menuData.get(req.params.id);
        res.render("site/menuItem", {menuItem: menuItem[0]});
      } catch(e) {
        res.status(404).json({ message: e }); //TODO error out to a html page instead
      }
    } else {
      res.redirect("/");
    }
  });
  
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.render("site/logout", {});
  });
  
  module.exports = router;