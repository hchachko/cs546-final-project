const express = require("express");
const router = express.Router();
const menuData = require("../data/products/menu");
const reviewData = require("../data/products/productReview");
let { ObjectId } = require("mongodb");

router.get("/:id", async (req, res) => {
    if (req.session.user) {
      try {
        if (!req.params.id) throw "id needed";
        if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
        const menuItem = await menuData.get(req.params.id);
        res.render("site/menuPages/menuItemReview", { menuItem: menuItem });
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
      if (!ObjectId.isValid(req.params.id)) throw "id is not a valid Object ID";
      menuItem = await menuData.get(req.params.id);
    } catch (e) {
      res.status(400).render("site/error", {error: e});
      return;
    }
    try {
      const reviewLikeDislike = req.body.reviewLikeDislike;
      const reviewDesc = req.body.reviewDesc;
      if (!reviewLikeDislike || !reviewDesc) throw "You must like/dislike and leave a review description!";
      if (typeof reviewLikeDislike != 'string' || typeof reviewDesc != 'string') throw "Detected non-string input";
      if (reviewDesc.trim().length == 0) throw "Detected empty review";
      if (reviewLikeDislike.trim() != "on") throw "Issue with radio button input";
      //const review = await reviewData.get()
      res.render("site/menuPages/menuItemReview", { menuItem: menuItem });
    } catch (e) {
      res.render("site/menuPages/menuItemReview", { menuItem: menuItem, error: e });
    }
  } else {
    res.redirect("/");
  }
});
  
module.exports = router;