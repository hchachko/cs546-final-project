const mongoCollections = require("../config/mongoCollections");
const menu = mongoCollections.menu;
let { ObjectId } = require('mongodb');

module.exports = {
    getAll: async ()=>{
        const menuCollection = await menu();
        const menuList = await menuCollection.find({}).toArray();
        for (let x of menuList) {
            x['_id'] = x['_id'].toString();
        }
        return menuList;
    },
    async get(id){
        if (arguments.length != 1) throw "Usuage: get(id)";
        if (typeof id != 'string') throw "Non-string input detected";
        id = id.trim();
        if (id.length == 0) throw "Empty string input detected";
        if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
        const menuCollection = await menu();
        const menuItem = await menuCollection.findOne({ _id: ObjectId(id) });
        if (menuItem === null) throw 'No item with that id';
        menuItem['_id'] = menuItem['_id'].toString();
        return menuItem;
    }
}