const express = require("express");
const router = express.Router();
<<<<<<< HEAD:routes/menu.js
const menuData = require("../data/products/menu");
const favoriteBooksOrDrinks = require("../data/favoriteBookOrDrink");
=======
const menuData = require("../../data/products/menu");
>>>>>>> 439d10a377349c4329abd8745245611850d5a79e:routes/menuRoutes/menu.js
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

router.post("/addFavDrink", async (req, res) => {
  const menu = await menuData.getAll();
  try {
    const userId = req.session.user.userId;
    const drinkId = req.body.itemId;
    const category = req.body.category;
    const drinkName = req.body.itemName;
    if (
      userId == undefined ||
      drinkId == undefined ||
      category == undefined ||
      drinkName == undefined
    ) {
      throw "userId, itemId, and category must be provided";
    }
    if (
      typeof userId != "string" ||
      typeof drinkId != "string" ||
      typeof category != "string" ||
      typeof drinkName != "string"
    ) {
      throw "userId/itemId/category must be a valid string";
    }
    if (
      userId.trim().length == 0 ||
      drinkId.trim().length == 0 ||
      category.trim().length == 0 ||
      drinkName.trim().length == 0
    ) {
      throw "Input(s) must not be empty";
    }
    if (category != "drink" && category != "Drink") {
      throw "category must be drink";
    }
    let favoriteDrink = {
      drink_id: drinkId,
      drink_name: drinkName,
    };
    const user = await favoriteBooksOrDrinks.addToDrinks(userId, favoriteDrink);

    res.render("site/menuPages/menu", {
      firstName: req.session.user.firstName,
      menu: menu,
      employee: req.session.user.employee,
      success: drinkName + " added to favorites Successfully.",
    });
  } catch (e) {
    res.status(400).render("site/menuPages/menu", {
      firstName: req.session.user.firstName,
      menu: menu,
      employee: req.session.user.employee,
      error: e,
    });
  }
});

router.get("/:id", async (req, res) => {
  if (req.session.user) {
    try {
      if (!req.params.id) throw "id needed";
      let id = req.params.id;
      if (typeof id != "string") throw "id must be a string";
      id = id.trim();
      if (id.length == 0) throw "id is an empty string"
      if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
      const menuItem = await menuData.get(id);
      res.render("site/menuPages/menuItem", { menuItem: menuItem });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

<<<<<<< HEAD:routes/menu.js
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
      res.status(400).render("site/error", { error: e });
      return;
    }
    try {
      const reviewLikeDislike = req.body.reviewLikeDislike;
      const reviewDesc = req.body.reviewDesc;
      if (!reviewLikeDislike || !reviewDesc)
        throw "You must like/dislike and leave a review description!";
      if (typeof reviewLikeDislike != "string" || typeof reviewDesc != "string")
        throw "Detected non-string input";
      if (reviewDesc.trim().length == 0) throw "Detected empty review";
      if (reviewLikeDislike.trim() != "on")
        throw "Issue with radio button input";
      const review = await reviewData.get();
      res.render("site/menuPages/menuItemReview", { menuItem: menuItem });
    } catch (e) {
      res.render("site/menuPages/menuItemReview", {
        menuItem: menuItem,
        error: e,
      });
    }
  } else {
    res.redirect("/");
  }
});

=======
>>>>>>> 439d10a377349c4329abd8745245611850d5a79e:routes/menuRoutes/menu.js
module.exports = router;