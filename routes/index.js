const userRoutes = require("./users");
const menuRoutes = require("./menuRoutes/menu");
const checkoutRoutes = require("./menuRoutes/checkoutRoute");
const productReviewsRoutes = require("./menuRoutes/productReviews");
const productReviewsCommentsRoutes = require("./menuRoutes/productReviewsComments");
const catalogRoutes = require("./catalogRoutes/catalog");
const bookReviewsRoutes = require("./catalogRoutes/bookReviews");
const bookReviewsCommentsRoutes = require("./catalogRoutes/bookReviewsComments");
const seatRoutes = require("./seats");
const favorites = require("./favorites");
const constructorMethod = (app) => {
  app.use("/menu", menuRoutes);
  app.use("/checkout", checkoutRoutes);
  app.use("/productReviews", productReviewsRoutes);
  app.use("/productReviewsComments", productReviewsCommentsRoutes);
  app.use("/catalog", catalogRoutes);
  app.use("/bookReviews", bookReviewsRoutes);
  app.use("/bookReviewsComments", bookReviewsCommentsRoutes);
  app.use("/seats", seatRoutes);
  app.use("/favorites", favorites);
  app.use("/", userRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
