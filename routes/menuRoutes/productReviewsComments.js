const express = require("express");
const router = express.Router();
const menuData = require("../../data/products/menu");
const reviewData = require("../../data/products/productReviews");
let { ObjectId } = require("mongodb");

router.get("/:reviewId", async (req, res) => {
    if (req.session.user) {
      try {
        if (!req.params.reviewId) throw "id needed";
        let reviewId = req.params.reviewId;
        if (typeof reviewId != "string") throw "ids must be a string";
        reviewId = reviewId.trim();
        if (reviewId.length == 0) throw "Detected an id with an empty string"
        if (!ObjectId.isValid(reviewId)) throw "Detected an id that is not a valid Object ID";
        const review = await reviewData.get(reviewId);
        res.render("site/menuPages/productReviewComment", { review: review });
      } catch (e) {
        res.status(400).render("site/homepage", { error: e });
      }
    } else {
      res.redirect("/");
    }
  });
  
module.exports = router;