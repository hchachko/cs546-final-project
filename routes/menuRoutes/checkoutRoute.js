const express = require("express");
const router = express.Router();
const cartData = require("../../data/products/CartItem");
const favoriteBooksOrDrinks = require("../../data/favoriteBookOrDrink");
let { ObjectId } = require("mongodb");

router.post("/addToCart", async (req, res) => {
  try {
    // itemname, note, time, id
    const itemId = req.body.itemId;
    const note = req.body.note;
    const time = req.body.time;
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
    if (currentTime.getHours() <= parseInt(time[0])){
      if(currentTime.getMinutes() > parseInt(time[1])){
      throw "Time is too early"
    }
  }


    const addedCartItem = await cartData.addToCart(
      itemId,
      userId,
      note,
      time
    );
    res.render("site/menu/addToCart", {
      success: "Item ordered successfully.",
    });
  } catch (e) {
    res.status(400).render("site/menu/addToCart", { error: e });
  }
}
);


module.exports = router;
