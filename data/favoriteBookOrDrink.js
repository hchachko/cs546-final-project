const mongoCollections = require("../config/mongoCollections");
const favoriteBooksOrDrinks = mongoCollections.favoriteBooksOrDrinks;
let { ObjectId } = require("mongodb");

module.exports = {
  getAllfavoriteBooksOrDrinks: async (user_id) => {
    const id = ObjectId(user_id);
    if (id === undefined) {
      throw "must provide a valid id.";
    }
    if (typeof id != "string" || id.trim().length === 0) {
      throw "must provide a valid id.";
    }
    if (!ObjectId.isValid(id)) {
      throw "ID is not a valid Object ID";
    }
    const favoriteBooksOrDrinksCollection = await favoriteBooksOrDrinks();
    const booksNdrinks = await favoriteBooksOrDrinksCollection.findOne({
      _id: ObjectId(id),
    });
    if (!booksNdrinks) {
      throw "Could not find collection with id of " + id;
    }
    return booksNdrinks;
  },
  addToDrinks: async (user_id, favoriteDrinks) => {
    const id = ObjectId(user_id);
    if (id === undefined) {
      throw "Must provide a valid id.";
    }
    if (typeof user_id != "string" || user_id.trim().length === 0) {
      throw "must provide a valid id.";
    }
    if (!ObjectId.isValid(id)) {
      throw "ID is not a valid Object ID";
    }
    const drink_id = favoriteDrinks.drink_id;
    const drink_name = favoriteDrinks.drink_name;

    if (drink_id === undefined || drink_name === undefined) {
      throw "must provide a valid book id/name.";
    }
    if (
      typeof drink_id != "string" ||
      drink_id.trim().length === 0 ||
      typeof drink_name != "string" ||
      drink_name.trim().length === 0
    ) {
      throw "must provide a valid book id/name.";
    }
    if (!ObjectId.isValid(drink_id)) {
      throw "ID is not a valid Object ID";
    }

    const favoriteBooksOrDrinksCollection = await favoriteBooksOrDrinks();
    const booksNdrinks = await favoriteBooksOrDrinksCollection.findOne({
      userId: id,
    });
    if (!booksNdrinks) {
      throw "Could not find collection with id of " + id;
    }

    await favoriteBooksOrDrinksCollection.updateOne(
      { userId: id },
      {
        $push: { favoriteDrinks: { book_id: drink_id, book_name: drink_name } },
      }
    );
    return { addedToDrinks: true };
  },
};
