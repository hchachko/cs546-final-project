const express = require("express");
const router = express.Router();
const menuData = require("../../data/products/menu");
const reviewData = require("../../data/products/productReviews");
let { ObjectId } = require("mongodb");

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
        res.render("site/menuPages/productReview", { menuItem: menuItem });
      } catch (e) {
        res.status(400).render("site/homepage", { error: e });
      }
    } else {
      res.redirect("/");
    }
  });
  
router.post("/:id", async (req, res) => {
  if (req.session.user) {
    let menuItem;
    try {
      if (!req.params.id) throw "id needed";
      let id = req.params.id;
      if (typeof id != "string") throw "id must be a string";
      id = id.trim();
      if (id.length == 0) throw "id is an empty string"
      if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
      menuItem = await menuData.get(id);
    } catch (e) {
      res.status(400).render("site/error", {error: e});
      return;
    }
    try {
      const reviewLikeDislike = req.body.reviewLikeDislike;
      const reviewRating = req.body.reviewRating;
      const reviewDesc = req.body.reviewDesc;
      if (!reviewLikeDislike || !reviewRating || !reviewDesc) throw "You must like/dislike, leave a rating and a review description!";
      if (typeof reviewLikeDislike != "string" || typeof reviewRating != "string" || typeof reviewDesc != "string") throw "Detected non-string input";
      let rating = parseInt(reviewRating);
      if (typeof rating != "number") throw "Detected non-number input";
      if (!Number.isInteger(rating)) throw "Detected non-integer input";
      if (!(1 <= rating && rating <=5)) "Review rating out of range";
      if (reviewDesc.trim().length == 0) throw "Detected empty review";
      if (reviewLikeDislike.trim() != "on") throw "Unexpected output from radio button input";
      const review = await reviewData.create(req.params.id, req.session.user.firstName, rating, reviewDesc);
      res.render("site/menuPages/productReview", { menuItem: menuItem, posted: true });
    } catch (e) {
      res.render("site/menuPages/productReview", { menuItem: menuItem, error: e });
    }
  } else {
    res.redirect("/");
  }
});
  
module.exports = router;