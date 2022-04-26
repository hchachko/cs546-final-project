const express = require("express");
const router = express.Router();
const reviewData = require("../../data/products/productReviews");
const reviewCommentData = require("../../data/products/productReviewsComments");
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
router.post("/:reviewId", async (req, res) => {
    if (req.session.user) {
        let review;
        try {
            if (!req.params.reviewId) throw "id needed";
            let reviewId = req.params.reviewId;
            if (typeof reviewId != "string") throw "ids must be a string";
            reviewId = reviewId.trim();
            if (reviewId.length == 0) throw "Detected an id with an empty string"
            if (!ObjectId.isValid(reviewId)) throw "Detected an id that is not a valid Object ID";
            review = await reviewData.get(reviewId);
        } catch (e) {
            res.status(400).render("site/homepage", { error: e });
            return;
        }
        try {
            const commentData = req.body.comment;
            if (!commentData) throw "You must leave a comment!";
            if (typeof commentData != "string") throw "Detected non-string input";
            if (commentData.trim().length == 0) throw "Detected empty comment";
            const comment = await reviewCommentData.create(req.params.reviewId, req.session.user.firstName, commentData);
            res.render("site/menuPages/productReviewComment", { review: review, posted: true });
        } catch (e) {
            res.render("site/menuPages/productReviewComment", { review: review, error: e});
        }
    } else {
      res.redirect("/");
    }
  });
  
module.exports = router;