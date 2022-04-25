const userRoutes = require("./users");
const menuRoutes = require("./menu");
const productReviewRoutes = require("./productReview");
const constructorMethod = (app) => {
  app.use("/menu", menuRoutes);
  app.use("/productReview", productReviewRoutes);
  app.use("/", userRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
