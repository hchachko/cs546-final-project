const mongoCollections = require("../config/mongoCollections");
const favoriteBooksOrDrinks = mongoCollections.favoriteBooksOrDrinks;
let { ObjectId } = require("mongodb");

module.exports = {
  getAllfavoriteBooksOrDrinks: async (user_id) => {
    const id = ObjectId(user_id);
    if (id === undefined) {
      throw "must provide a valid id.";
    }
    if (typeof user_id != "string" || user_id.trim().length === 0) {
      throw "must provide a valid id.";
    }
    if (!ObjectId.isValid(id)) {
      throw "ID is not a valid Object ID";
    }
    const favoriteBooksOrDrinksCollection = await favoriteBooksOrDrinks();
    const booksNdrinks = await favoriteBooksOrDrinksCollection.findOne({
      userId: ObjectId(id),
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
    const drink_image = favoriteDrinks.drink_image;

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
    for (let i = 0; i < booksNdrinks.favoriteDrinks.length; i++) {
      if (booksNdrinks.favoriteDrinks[i].drink_id === drink_id) {
        throw "Drink already exists in favorites.";
      }
    }
    await favoriteBooksOrDrinksCollection.updateOne(
      { userId: id },
      {
        $push: {
          favoriteDrinks: {
            drink_id: drink_id,
            drink_name: drink_name,
            drink_image: drink_image,
          },
        },
      }
    );
    return { addedToDrinks: true };
  },
  addToBooks: async (user_id, favoriteBooks) => {
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
    const book_id = favoriteBooks.book_id;
    const book_name = favoriteBooks.book_name;
    const book_image = favoriteBooks.book_image;

    if (book_id === undefined || book_name === undefined) {
      throw "must provide a valid book id/name.";
    }
    if (
      typeof book_id != "string" ||
      book_id.trim().length === 0 ||
      typeof book_name != "string" ||
      book_name.trim().length === 0
    ) {
      throw "must provide a valid book id/name.";
    }
    if (!ObjectId.isValid(book_id)) {
      throw "ID is not a valid Object ID";
    }

    const favoriteBooksOrDrinksCollection = await favoriteBooksOrDrinks();
    const booksNdrinks = await favoriteBooksOrDrinksCollection.findOne({
      userId: id,
    });
    if (!booksNdrinks) {
      throw "Could not find collection with id of " + id;
    }
    for (let i = 0; i < booksNdrinks.favoriteBooks.length; i++) {
      if (booksNdrinks.favoriteBooks[i].book_id === book_id) {
        throw "Book already exists in favorites.";
      }
    }
    await favoriteBooksOrDrinksCollection.updateOne(
      { userId: id },
      {
        $push: {
          favoriteBooks: {
            book_id: book_id,
            book_name: book_name,
            book_image: book_image,
          },
        },
      }
    );
    return { addedToBooks: true };
  },
};
