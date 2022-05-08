const express = require("express");
const router = express.Router();
const drinkOrderData = require("../data/products/CartItem");
let { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {

  if (req.session.user) {
    try {
      let id = req.session.user.userId;
      if (typeof id != "string") throw "id must be a string";
      const drinkOrders = await drinkOrderData.get(id);
      const allDrinks = await drinkOrderData.getAll();

      if (req.session.user.employee == "on") {
        res.render("site/drinkOrder", {
          drinkOrders: allDrinks,
          employee: req.session.user.employee,
        });
      } else {
        res.render("site/drinkOrder", {
          drinkOrders: drinkOrders,
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
