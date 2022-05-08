const express = require("express");
const router = express.Router();
const favorite = require("../data/favoriteBookOrDrink");

router.get("/", async (req, res) => {
  if (req.session.user) {
    const favorites = await favorite.getAllfavoriteBooksOrDrinks(
      req.session.user.userId
    );
    const favoriteDrinks = favorites.favoriteDrinks;
    try {
      if (req.session.user.employee == "on") {
        res.render("site/favorites", {
          employee: true,
          favoriteDrinks: favoriteDrinks,
          favoriteBooks: favorites.favoriteBooks,
        });
      } else {
        res.render("site/favorites", {
          employee: true,
          favoriteDrinks: favoriteDrinks,
          favoriteBooks: favorites.favoriteBooks,
        });
      }
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
