const express = require("express");
const router = express.Router();
const menuData = require("../data/menu");
const path = require("path");
let { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  if (req.session.user) {
    try {
      const menu = await menuData.getAll();
      if (req.session.user.employee == "on") {
        res.render("site/menuPages/menu", {
          firstName: req.session.user.firstName,
          menu: menu,
          employee: req.session.user.employee,
        });
      } else {
        res.render("site/menuPages/menu", {
          firstName: req.session.user.firstName,
          menu: menu,
        });
      }
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/addToMenu", async (req, res) => {
  if (req.session.user.employee == "on") {
    try {
      res.render("site/menuPages/addToMenu", {
        firstName: req.session.user.firstName,
      });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/addToMenu", async (req, res) => {
  if (req.session.user.employee == "on") {
    try {
      const itemName = req.body.itemName;
      const price = req.body.price;
      const category = req.body.category;
      if (
        itemName == undefined ||
        price == undefined ||
        category == undefined
      ) {
        throw "itemName, price, and category must be provided";
      }
      if (
        typeof itemName != "string" ||
        typeof price != "string" ||
        typeof category != "string"
      ) {
        throw "itemName/price/category must be a valid string";
      }
      if (
        itemName.trim().length == 0 ||
        price.trim().length == 0 ||
        category.trim().length == 0
      ) {
        throw "itemName must not be empty";
      }

      const addedMenuItem = await menuData.createItem(
        itemName,
        price,
        category
      );
      res.render("site/menuPages/addToMenu", {
        success: "Item added to menu Successfully.",
      });
    } catch (e) {
      res.status(400).render("site/menuPages/addToMenu", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/:id", async (req, res) => {
  if (req.session.user) {
    try {
      if (!req.params.id) throw "id needed";
      if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
      const menuItem = await menuData.get(req.params.id);
      res.render("site/menuPages/menuItem", { menuItem: menuItem });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/:id/review", async (req, res) => {
  if (req.session.user) {
    try {
      if (!req.params.id) throw "id needed";
      if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
      const menuItem = await menuData.get(req.params.id);
      res.render("site/menuPages/menuItemReview", { menuItem: menuItem });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
