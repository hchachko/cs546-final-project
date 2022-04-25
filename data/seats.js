const mongoCollections = require("../config/mongoCollections");
const seats = mongoCollections.seats;

module.exports = {
  reserveSeat: async (day, hour) => {
    const seatCollection = await seats();
    const seatsList = await seatCollection.find({}).toArray();
    const dayObject = seatsList.find((o) => o["name"] === day);
    if (dayObject[hour] !== "0") {
      const updatedData = {
        [hour]: (parseInt(dayObject[hour]) - 1).toString(),
      };
      const updatedInfo = await seatCollection.updateOne(
        { _id: dayObject["_id"] },
        { $set: updatedData },
        { upsert: true }
      );
      if (updatedInfo.modifiedCount === 0) {
        throw "could not update data successfully";
      }
      return true;
    } else if (!dayObject[hour] || dayObject[hour] == null) {
      return false;
    }
  },
  createSchedule: async (day, numSeats) => {
    const seatCollection = await seats();
    let newItem = {
      name: day,
      "8am": numSeats,
      "9am": numSeats,
      "10am": numSeats,
      "11am": numSeats,
      "12pm": numSeats,
      "1pm": numSeats,
      "2pm": numSeats,
      "3pm": numSeats,
      "4pm": numSeats,
      "5pm": numSeats,
      "6pm": numSeats,
      "7pm": numSeats,
      "8pm": numSeats,
      "9pm": numSeats,
      "10pm": numSeats,
    };
    const insertItem = await seatCollection.insertOne(newItem);
    if (insertItem.insertedCount === 0) {
    }
  },
};
