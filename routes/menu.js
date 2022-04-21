const express = require("express");
const router = express.Router();
const menuData = require("../data/menu");
let { ObjectId } = require('mongodb');

router.get("/", async (req, res) => {
    if (req.session.user) {
      try{
        const menu = await menuData.getAll();
        res.render("site/menuPages/menu", {firstName: req.session.user.firstName, menu: menu});
      } catch(e) {
        res.status(400).render("site/homepage", { error: e });
      }
    } else {
      res.redirect("/");
    }
  });

router.get("/:id", async (req, res) => {
  if (req.session.user) {
    try{
      if (!req.params.id) throw "id needed";
      if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
      const menuItem = await menuData.get(req.params.id);
      res.render("site/menuPages/menuItem", {menuItem: menuItem});
    } catch(e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/:id/review", async (req, res) => {
  if (req.session.user) {
    try{
      if (!req.params.id) throw "id needed";
      if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
      const menuItem = await menuData.get(req.params.id);
      res.render("site/menuPages/menuItemReview", {menuItem: menuItem});
    } catch(e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});
  
module.exports = router;