const mongoCollections = require("../config/mongoCollections");
const menu = mongoCollections.menu;
let { ObjectId } = require("mongodb");

module.exports = {
  //create a new menu item
  createItem: async (itemName, price, category, image) => {
    if (itemName == undefined || price == undefined || category == undefined) {
      throw "All fields must be provided";
    }
    if (
      typeof itemName != "string" ||
      typeof price != "string" ||
      typeof category != "string" ||
      typeof image != "string"
    ) {
      throw "item/name/category/image must be a valid string";
    }
    if (
      itemName.trim().length == 0 ||
      price.trim().length == 0 ||
      category.trim().length == 0 ||
      image.trim().length == 0
    ) {
      throw "item name/price/category/image must not be empty";
    }
    const menuCollection = await menu();
    let newItem = {
      itemName: itemName,
      price: price,
      category: category,
      image: image,
      reviews: [],
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
