const mongoCollections = require("../config/mongoCollections");
const menu = mongoCollections.menu;

module.exports = {
    getAll: async ()=>{
        const menuCollection = await menu();
        const menuList = await menuCollection.find({}).toArray();
        for (let x of menuList) {
            x['_id'] = x['_id'].toString();
        }
        return menuList;
    },
    async get(id){  //Still a work in progress (Harrison)
        if (arguments.length != 1) throw "Usuage: get(id)";
        if (typeof id != 'string') throw "Non-string input detected";
        id = id.trim();
        if (id.length == 0) throw "Empty string input detected";
        if (!ObjectId.isValid(id)) throw "id is not a valid Object ID";
        const menuCollection = await menu();
        const menu = await menuCollection.findOne({ _id: ObjectId(id) });
        if (menu === null) throw 'No item with that id';
        menu['_id'] = menu['_id'].toString();
        return menu;
    }
}