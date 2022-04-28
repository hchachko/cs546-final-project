const userRoutes = require("./users");
const menuRoutes = require("./menuRoutes/menu");
const productReviewsRoutes = require("./menuRoutes/productReviews");
const productReviewsCommentsRoutes = require("./menuRoutes/productReviewsComments");
const catalogRoutes = require("./catalogRoutes/catalog");
const seatRoutes = require("./seats");
const constructorMethod = (app) => {
  app.use("/menu", menuRoutes);
  app.use("/productReviews", productReviewsRoutes);
  app.use("/productReviewsComments", productReviewsCommentsRoutes);
  app.use("/catalog", catalogRoutes);
  app.use("/seats", seatRoutes);
  app.use("/", userRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
