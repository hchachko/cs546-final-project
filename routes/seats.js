const express = require("express");
const router = express.Router();
const seatData = require("../data/seats");

router.get("/", async (req, res) => {
  if (req.session.user) {
    try {
      //const seats = await seatData.getAll();
      if (req.session.user.employee == "on") {
        res.render("site/setHoursOpen", {
          firstName: req.session.user.firstName,
          employee: req.session.user.employee,
        });
      } else {
        res.render("site/reserveSeat", {
          firstName: req.session.user.firstName,
          //seats: seats,
        });
      }
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/createSchedule", async (req, res) => {
  if (req.session.user.employee == "on") {
    try {
      res.render("site/setHoursOpen", {
        firstName: req.session.user.firstName,
      });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/createSchedule", async (req, res) => {
  if (req.session.user.employee == "on") {
    try {
      const numSeats = req.body.numSeats;

      if (numSeats == undefined) {
        throw "Number of seats must be provided";
      }
      if (typeof numSeats != "string") {
        throw "itemName/price/category must be a valid string";
      }
      if (numSeats.trim().length == 0) {
        throw "Number of hours must not be empty";
      }

      const setSeats = await seatData.createSchedule(numSeats);
      res.render("site/setHoursOpen", {
        success: "Item added to menu Successfully.",
      });
    } catch (e) {
      res.status(400).render("site/menuPages/addToMenu", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
