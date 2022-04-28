const mongoCollections = require("../../config/mongoCollections");
const menu = mongoCollections.menu;
let { ObjectId } = require("mongodb");

module.exports = {
  createItem: async (itemName, price, image) => {
    if (itemName == undefined || price == undefined || image == undefined) throw "All fields must be provided";
    if (typeof itemName != "string" || typeof price != "string" || typeof image != "string") throw "Detected non-string input(s)";
    itemName = itemName.trim();
    price = price.trim();
    image = image.trim();
    if (itemName.length == 0 || price.length == 0 || image.length == 0) throw "Detected empty string(s)";
    const menuCollection = await menu();
    let newItem = {
      itemName: itemName,
      price: price,
      category: 'drink',
      image: image,
      likes: 0,
      dislikes: 0, 
      reviews: []
    };
    const insertItem = await menuCollection.insertOne(newItem);
    if (insertItem.insertedCount === 0) {
      throw "Could not add item";
    }
    const newId = insertItem.insertedId;
    const newItemWithId = await menuCollection.findOne({
      _id: ObjectId(newId),
    });
    newItemWithId["_id"] = newItemWithId["_id"].toString();
    return newItemWithId;
  },

  getAll: async () => {
    const menuCollection = await menu();
    const menuList = await menuCollection.find({}).toArray();
    for (let x of menuList) {
      x["_id"] = x["_id"].toString();
    }
    return menuList;
  },
  async get(id) {
    if (arguments.length != 1) throw "Usuage: get(id)";
    if (typeof id != "string") throw "Non-string input detected";
    id = id.trim();
    if (id.length == 0) throw "Empty string input detected";
    if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
    const menuCollection = await menu();
    const menuItem = await menuCollection.findOne({ _id: ObjectId(id) });
    if (menuItem === null) throw "No item with that id";
    menuItem["_id"] = menuItem["_id"].toString();
    return menuItem;
  },
};
