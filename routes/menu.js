const express = require("express");
const router = express.Router();
const menuData = require("../data/menu");
const path = require("path");
let { ObjectId } = require("mongodb");
const { IncomingMessage } = require("http");

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
      const image = req.body.image;
      if (
        itemName == undefined ||
        price == undefined ||
        category == undefined ||
        image == undefined
      ) {
        throw "itemName, price, category, and image must be provided";
      }
      if (
        typeof itemName != "string" ||
        typeof price != "string" ||
        typeof category != "string" ||
        typeof image != "string"
      ) {
        throw "itemName/price/category/image must be a valid string";
      }
      if (
        itemName.trim().length == 0 ||
        price.trim().length == 0 ||
        category.trim().length == 0 ||
        image.trim().length == 0
      ) {
        throw "Input(s) must not be empty";
      }

      const addedMenuItem = await menuData.createItem(
        itemName,
        price,
        category, 
        image
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

router.post("/:id/review", async (req, res) => {
  if (req.session.user) {
    let menuItem;
    try {
      if (!req.params.id) throw "id needed";
      if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
      menuItem = await menuData.get(req.params.id);
    } catch (e) {
      res.status(400).render("site/error", {error: e});
      return;
    }
    try {
      const reviewLikeDislike = req.body.reviewLikeDislike;
      const reviewDesc = req.body.reviewDesc;
      if (!reviewLikeDislike || !reviewDesc) throw "You must like/dislike and leave a review description!";
      //TODO actually create the review
      res.render("site/menuPages/menuItemReview", { menuItem: menuItem });
    } catch (e) {
      res.render("site/menuPages/menuItemReview", { menuItem: menuItem, error: e });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
