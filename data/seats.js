const mongoCollections = require("../config/mongoCollections");
const seats = mongoCollections.seats;

module.exports = {
  getAvailableSeats: async (day, hour) => {},
  createSchedule: async (numSeats) => {
    const seatCollection = await seats();
    let newItem = {
      Monday: [
        { "8am": numSeats },
        { "9am": numSeats },
        { "10am": numSeats },
        { "11am": numSeats },
        { "12pm": numSeats },
        { "1pm": numSeats },
        { "2pm": numSeats },
        { "3pm": numSeats },
        { "4pm": numSeats },
        { "5pm": numSeats },
        { "6pm": numSeats },
        { "7pm": numSeats },
        { "8pm": numSeats },
        { "9pm": numSeats },
        { "10pm": numSeats },
      ],
      Tuesday: [
        { "8am": numSeats },
        { "9am": numSeats },
        { "10am": numSeats },
        { "11am": numSeats },
        { "12pm": numSeats },
        { "1pm": numSeats },
        { "2pm": numSeats },
        { "3pm": numSeats },
        { "4pm": numSeats },
        { "5pm": numSeats },
        { "6pm": numSeats },
        { "7pm": numSeats },
        { "8pm": numSeats },
        { "9pm": numSeats },
        { "10pm": numSeats },
      ],
    };
    const insertItem = await seatCollection.insertOne(newItem);
    if (insertItem.insertedCount === 0) {
    }
  },
};
