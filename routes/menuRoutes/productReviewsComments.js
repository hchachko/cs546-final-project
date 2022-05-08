const express = require("express");
const router = express.Router();
const reviewData = require("../../data/products/productReviews");
const reviewCommentData = require("../../data/products/productReviewsComments");
let { ObjectId } = require("mongodb");
const xss = require("xss");

router.get("/:reviewId", async (req, res) => {
  if (req.session.user) {
    try {
      if (!req.params.reviewId) throw "id needed";
      let reviewId = req.params.reviewId;
      if (typeof reviewId != "string") throw "ids must be a string";
      reviewId = reviewId.trim();
      if (reviewId.length == 0) throw "Detected an id with an empty string";
      if (!ObjectId.isValid(reviewId))
        throw "Detected an id that is not a valid Object ID";
      const review = await reviewData.get(reviewId);
      res.render("site/menu/productReviewComment", { review: review });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});
router.post("/:reviewId", async (req, res) => {
  if (req.session.user) {
    let review;
    try {
      if (!req.params.reviewId) throw "id needed";
      let reviewId = req.params.reviewId;
      if (typeof reviewId != "string") throw "ids must be a string";
      reviewId = reviewId.trim();
      if (reviewId.length == 0) throw "Detected an id with an empty string";
      if (!ObjectId.isValid(reviewId))
        throw "Detected an id that is not a valid Object ID";
      review = await reviewData.get(reviewId);
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
      return;
    }
    try {
      const helpfulReview = req.body.helpfulReview;
      const commentData = req.body.comment;
      if (!helpfulReview || !commentData)
        throw "You must agree/disagree and leave a comment!";
      if (typeof helpfulReview != "string" || typeof commentData != "string")
        throw "Detected non-string input";
      if (helpfulReview != "helpful" && helpfulReview != "unhelpful")
        throw "Unexpected value from dropdown menu";
      if (commentData.trim().length == 0) throw "Detected empty comment";
      const comment = await reviewCommentData.create(
        req.params.reviewId,
        req.session.user.firstName,
        xss(helpfulReview),
        xss(commentData)
      );
      res.render("site/menu/productReviewComment", {
        review: review,
        posted: true,
      });
    } catch (e) {
      res.render("site/menu/productReviewComment", {
        review: review,
        error: e,
      });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
