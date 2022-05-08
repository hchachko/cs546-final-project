const mongoCollections = require("../../config/mongoCollections");
const cart = mongoCollections.cart;
let { ObjectId } = require("mongodb");

module.exports = {
  addToCart: async (itemId, userId, note, time) => {
    if (itemId == undefined || userId == undefined || note == undefined) throw "All fields must be provided";
    if (typeof itemId != "string" || typeof userId != "string" || typeof note != "string" || typeof time != "string") throw "Detected non-string input(s)";
    itemId = itemId.trim();
    userId = userId.trim();
    note = note.trim();
    if (itemId.length == 0 || userId.length == 0 || time.length == 0) throw "Detected empty string(s)";
    const cartCollection = await cart();
    let newItem = {
      itemId: itemId,
      userId: userId,
      note: note,
      time: time
    };
    const insertItem = await cartCollection.insertOne(newItem);
    if (insertItem.insertedCount === 0) {
      throw "Could not add item";
    }
    const newId = insertItem.insertedId;
    const newItemWithId = await cartCollection.findOne({
      _id: ObjectId(newId),
    });
    newItemWithId["_id"] = newItemWithId["_id"].toString();
    return newItemWithId;
  },

  getAll: async () => {
    const cartCollection = await cart();
    const cartList = await cartCollection.find({}).toArray();
    for (let x of cartList) {
      x["_id"] = x["_id"].toString();
    }
    return cartList;
  },

  async get(id) {
    if (arguments.length != 1) throw "Usuage: get(id)";
    if (typeof id != "string") throw "Non-string input detected";
    id = id.trim();
    if (id.length == 0) throw "Empty string input detected";
    const cartCollection = await cart();
    const drinkList = await cartCollection.find({userId: id}).toArray();
    for (let x of drinkList) {
      x["_id"] = x["_id"].toString();
    }
    return drinkList;
  },
};
