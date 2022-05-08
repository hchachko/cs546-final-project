const express = require("express");
const router = express.Router();
const catalogData = require("../../data/books/catalog");
const favoriteBooksOrDrinks = require("../../data/favoriteBookOrDrink");
let { ObjectId } = require("mongodb");
const xss = require("xss");

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

router.get("/mostLiked", async (req, res) => {
  if (req.session.user) {
    try {
      const catalog = await catalogData.getAll();
      if (catalog.isArray == false) throw "Catalog must be an array";
      const sortedCatalog = await catalogData.sortByMostLiked(catalog);
      if (req.session.user.employee == "on") {
        res.render("site/catalog/catalog", {
          firstName: req.session.user.firstName,
          catalog: sortedCatalog,
          employee: req.session.user.employee,
        });
      } else {
        res.render("site/catalog/catalog", {
          firstName: req.session.user.firstName,
          catalog: sortedCatalog,
        });
      }
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/mostDisliked", async (req, res) => {
  if (req.session.user) {
    try {
      const catalog = await catalogData.getAll();
      if (catalog.isArray == false) throw "Catalog must be an array";
      const sortedCatalog = await catalogData.sortByMostDisliked(catalog);
      if (req.session.user.employee == "on") {
        res.render("site/catalog/catalog", {
          firstName: req.session.user.firstName,
          catalog: sortedCatalog,
          employee: req.session.user.employee,
        });
      } else {
        res.render("site/catalog/catalog", {
          firstName: req.session.user.firstName,
          catalog: sortedCatalog,
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
      if (!bookName || !numCopies || !genre || !image)
        throw "All fields must be provided";
      if (
        typeof bookName != "string" ||
        typeof genre != "string" ||
        typeof image != "string"
      )
        throw "Detected non-string input(s)";
      let numCopiesConverted = parseInt(numCopies);
      if (typeof numCopiesConverted != "number")
        throw "Detected non-number input";
      if (!Number.isInteger(numCopiesConverted))
        throw "Detected non-integer input";
      if (numCopiesConverted < 1) "numCopies out of range";
      if (
        bookName.trim().length == 0 ||
        genre.trim().length == 0 ||
        image.trim().length == 0
      )
        throw "Detected empty string input(s)";
      const addedBook = await catalogData.createItem(
        xss(bookName),
        numCopiesConverted,
        xss(genre),
        xss(image)
      );
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

router.get("/:id", async (req, res) => {
  if (req.session.user) {
    try {
      if (!req.params.id) throw "id needed";
      let id = req.params.id;
      if (typeof id != "string") throw "id must be a string";
      id = id.trim();
      if (id.length == 0) throw "id is an empty string";
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
