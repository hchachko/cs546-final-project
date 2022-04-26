const express = require("express");
const router = express.Router();
const seatData = require("../data/seats");

router.get("/", async (req, res) => {
  if (req.session.user) {
    const seats = await seatData.getAll();
    try {
      if (req.session.user.employee == "on") {
        res.render("site/seatReservation/manageReservations", {
          seats: seats,
        });
      } else {
        res.render("site/seatReservation/reserveSeat", {
          seats: seats,
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
  const seats = await seatData.getAll();
  if (req.session.user.employee == "on") {
    try {
      res.render("site/seatReservation/manageReservations", {
        seats: seats,
      });
    } catch (e) {
      res
        .status(400)
        .render("site/seatReservation/homepage", { error: e, seats: seats });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/createSchedule", async (req, res) => {
  if (req.session.user.employee == "on") {
    const seats = await seatData.getAll();
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
      res.render("site/seatReservation/manageReservations", {
        success: "Seats added Successfully.",
        seats: seats,
      });
    } catch (e) {
      res.status(400).render("site/seatReservation/manageReservations", {
        error: e,
        seats: seats,
      });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/reserveSeat", async (req, res) => {
  if (req.session.user.employee == null) {
    const seats = await seatData.getAll();
    try {
      res.render("site/seatReservation/reserveSeat", {
        seats: seats,
      });
    } catch (e) {
      res.status(400).render("site/homepage", { error: e, seats: seats });
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
      const seats = await seatData.getAll();

      if (day == undefined || hour == undefined) {
        throw "Day and hour must be provided";
      }
      if (typeof day != "string" || typeof hour != "string") {
        throw "Day and hour must be a valid string";
      }
      const reserve = await seatData.reserveSeat(day, hour);
      if (reserve == true) {
        res.render("site/seatReservation/reserveSeat", {
          success: "Your reservation has been received! Thank you.",
          seats: seats,
        });
      } else {
        res.render("site/seatReservation/reserveSeat", {
          error: "Sorry, that time is not available. Please choose another :)",
          seats: seats,
        });
      }
    } catch (e) {
      res
        .status(400)
        .render("site/seatReservation/reserveSeat", { error: e, seats: seats });
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
