const express = require("express");
const router = express.Router();
const cartData = require("../../data/products/CartItem");
const favoriteBooksOrDrinks = require("../../data/favoriteBookOrDrink");
let { ObjectId } = require("mongodb");
const xss = require("xss");

router.post("/addToCart", async (req, res) => {
  try {
    // itemname, note, time, id
    const itemId = req.body.itemId;
    const note = req.body.note;
    const time = req.body.time;
    const hour = time[0] + time[1];
    const min = time[3] + time[4];
    const userId = req.body.userId;
    const currentTime = new Date();
    if (
      itemId == undefined ||
      note == undefined ||
      userId == undefined ||
      time == undefined
    ) {
      throw "itemId, note, userid, and time must be provided";
    }

    if (
      typeof itemId != "string" ||
      typeof note != "string" ||
      typeof time != "string" ||
      typeof userId != "string"
    ) {
      throw "itemId, note, userid, and time must be a valid string";
    }
    if (
      itemId.trim().length == 0 ||
      userId.trim().length == 0 ||
      time.trim().length == 0
    ) {
      throw "Input(s) must not be empty, besides notes";
    }
    //Make sure time is after "now"
    if (currentTime.getHours() >= parseInt(hour)) {
      throw "Time is too early";
    }
    if (currentTime.getHours() >= parseInt(hour)) {
      if (currentTime.getMinutes() > parseInt(min)) {
        throw "Time is too early";
      }
    }

    const addedCartItem = await cartData.addToCart(
      itemId,
      userId,
      xss(note),
      time
    );
    res.render("site/menu/addToCart", {
      success: "Item ordered successfully.",
    });
  } catch (e) {
    res.status(400).render("site/menu/addToCart", { error: e });
  }
});

module.exports = router;
