const mongoCollections = require("../../config/mongoCollections");
const catalog = mongoCollections.catalog;
let { ObjectId } = require("mongodb");

module.exports = {
  createItem: async (bookName, numCopies, genre, image) => {
    if (!bookName || !numCopies || !genre || !image) throw "All fields must be provided";
    if (typeof bookName != "string" || typeof genre != "string" || typeof image != "string") throw "Detected non-string input(s)";
    if (typeof numCopies != "number") throw "Detected non-number input";
    if (!Number.isInteger(numCopies)) throw "Detected non-integer input";
    if (numCopies < 1) "numCopies rating out of range";
    bookName = bookName.trim();
    genre = genre.trim();
    image = image.trim();
    if (bookName.length == 0 || genre.length == 0 || image.length == 0) throw "Detected empty string input(s)";
    const catalogCollection = await catalog();
    let newItem = {
      bookName: bookName,
      numCopies: numCopies,
      genre: genre,
      users_borrowing: [],
      category: "book",
      image: image,
      likes: 0,
      dislikes: 0, 
      reviews: []
    };
    const insertItem = await catalogCollection.insertOne(newItem);
    if (insertItem.insertedCount === 0) {
      throw "Could not add item";
    }
    const newId = insertItem.insertedId;
    const newItemWithId = await catalogCollection.findOne({
      _id: ObjectId(newId),
    });
    newItemWithId["_id"] = newItemWithId["_id"].toString();
    return newItemWithId;
  },

  getAll: async () => {
    const catalogCollection = await catalog();
    const catalogList = await catalogCollection.find({}).toArray();
    for (let x of catalogList) {
      x["_id"] = x["_id"].toString();
    }
    return catalogList;
  },
  async get(id) {
    if (arguments.length != 1) throw "Usuage: get(id)";
    if (typeof id != "string") throw "Non-string input detected";
    id = id.trim();
    if (id.length == 0) throw "Empty string input detected";
    if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
    const catalogCollection = await catalog();
    const catalogItem = await catalogCollection.findOne({ _id: ObjectId(id) });
    if (catalogItem === null) throw "No item with that id";
    catalogItem["_id"] = catalogItem["_id"].toString();
    return catalogItem;
  },
  sortByMostLiked: async (catalog) => {
    if (catalog.isArray == false) throw "Catalog must be an array";
    //Sorting technique inspired from: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    const sortedCatalog = catalog.sort((x,y) => (x.likes <= y.likes) ? 1 : -1);
    return sortedCatalog;
  },
  sortByMostDisliked: async (catalog) => {
    if (catalog.isArray == false) throw "Catalog must be an array";
    //Sorting technique inspired from: https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
    const sortedCatalog = catalog.sort((x,y) => (x.dislikes <= y.dislikes) ? 1 : -1);
    return sortedCatalog;
  }
};
