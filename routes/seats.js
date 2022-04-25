const express = require("express");
const router = express.Router();
const seatData = require("../data/seats");

router.get("/", async (req, res) => {
  if (req.session.user) {
    try {
      if (req.session.user.employee == "on") {
        res.render("site/manageReservations");
      } else {
        res.render("site/reserveSeat");
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
      res.render("site/manageReservations");
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
      const day = req.body.day;

      if (numSeats == undefined) {
        throw "Number of seats must be provided";
      }
      if (typeof numSeats != "string") {
        throw "Seats must be a valid string";
      }
      if (numSeats.trim().length == 0) {
        throw "Number of seats must not be empty";
      }
      const setSeats = await seatData.createSchedule(day, numSeats);
      res.render("site/manageReservations", {
        success: "Seats added Successfully.",
      });
    } catch (e) {
      res.status(400).render("site/manageReservations", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/reserveSeat", async (req, res) => {
  if (req.session.user.employee == null) {
    try {
      res.render("site/reserveSeat");
    } catch (e) {
      res.status(400).render("site/homepage", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/reserveSeat", async (req, res) => {
  if (req.session.user.employee == null) {
    try {
      const day = req.body.day;
      const hour = req.body.hour;

      if (day == undefined || hour == undefined) {
        throw "Day and hour must be provided";
      }
      if (typeof day != "string" || typeof hour != "string") {
        throw "Day and hour must be a valid string";
      }
      const reserve = await seatData.reserveSeat(day, hour);
      if (reserve == true) {
        res.render("site/reserveSeat", {
          success: "Your reservation has been received! Thank you.",
        });
      } else {
        res.render("site/reserveSeat", {
          error: "Sorry, that time is not available. Please choose another :)",
        });
      }
    } catch (e) {
      res.status(400).render("site/reserveSeat", { error: e });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
