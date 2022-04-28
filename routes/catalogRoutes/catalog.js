const express = require("express");
const router = express.Router();
const catalogData = require("../../data/books/catalog");
const favoriteBooksOrDrinks = require("../../data/favoriteBookOrDrink");
let { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  if (req.session.user) {
    try {
      const catalog = await catalogData.getAll();
      if (req.session.user.employee == "on") {
        res.render("site/catalog/catalog", {
          firstName: req.session.user.firstName,
          catalog: catalog,
          employee: req.session.user.employee,
        });
      } else {
        res.render("site/catalog/catalog", {
          firstName: req.session.user.firstName,
          catalog: catalog,
        });
      }
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/addToCatalog", async (req, res) => {
  if (req.session.user.employee == "on") {
    try {
      res.render("site/catalog/addToCatalog", {
        firstName: req.session.user.firstName,
      });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/addToCatalog", async (req, res) => {
  if (req.session.user.employee == "on") {
    try {
      const bookName = req.body.bookName;
      const numCopies = req.body.numCopies;
      const genre = req.body.genre;
      const image = req.body.image;
      if (!bookName || !numCopies || !genre || !image) throw "All fields must be provided";
      if (typeof bookName != "string" || typeof genre != "string" || typeof image != "string") throw "Detected non-string input(s)";
      let numCopiesConverted = parseInt(numCopies);
      if (typeof numCopiesConverted != "number") throw "Detected non-number input";
      if (!Number.isInteger(numCopiesConverted)) throw "Detected non-integer input";
      if (numCopiesConverted < 1) "numCopies rating out of range";
      if (bookName.trim().length == 0 || genre.trim().length == 0 || image.trim().length == 0) throw "Detected empty string input(s)";
      const addedBook = await catalogData.createItem(bookName, numCopiesConverted, genre, image);
      res.render("site/catalog/addToCatalog", {
        success: "Item added to catalog Successfully.",
      });
    } catch (e) {
      res.status(400).render("site/catalog/addToCatalog", { error: e });
    }
  } else {
    res.redirect("/");
  }
});
/*
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

    res.render("site/menu/menu", {
      firstName: req.session.user.firstName,
      menu: menu,
      employee: req.session.user.employee,
      success: drinkName + " added to favorites Successfully.",
    });
  } catch (e) {
    res.status(400).render("site/menu/menu", {
      firstName: req.session.user.firstName,
      menu: menu,
      employee: req.session.user.employee,
      error: e,
    });
  }
});
*/
router.get("/:id", async (req, res) => {
  if (req.session.user) {
    try {
      if (!req.params.id) throw "id needed";
      let id = req.params.id;
      if (typeof id != "string") throw "id must be a string";
      id = id.trim();
      if (id.length == 0) throw "id is an empty string"
      if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
      const book = await catalogData.get(id);
      res.render("site/catalog/book", { book: book });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
