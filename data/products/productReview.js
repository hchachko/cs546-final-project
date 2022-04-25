const mongoCollections = require('../../config/mongoCollections');
const menu = mongoCollections.menu;
let { ObjectId } = require('mongodb');

module.exports = {
    //create a new menu item
    create: async (productId, reviewerName, summary) => {
        if (!productId || !reviewerName || !summary) throw "All fields must be provided";
        if (typeof productId != 'string' || typeof reviewerName != 'string' || typeof summary != 'string') throw "Detected non-string input(s)";
        productId = productId.trim()
        reviewerName = reviewerName.trim();
        summary = summary.trim();
        if (productId.length == 0 || reviewerName.length == 0 || summary.length == 0) throw "Detected empty string input(s)";
        if (!ObjectId.isValid(productId)) throw "Detected invalid productId";
        const menuCollection = await menu();
        let product = await menuCollection.findOne({_id: ObjectId(productId)});
        if (!product) throw "Product to review not found";
        const reviewId = new ObjectId();
        let review = {
            _id: reviewId,
            Reviewer_name: reviewerName,
            Summary: summary,
            Comments: []
        }
        product.reviews.push(review);
        const updatedInfo = await menuCollection.updateOne(
            { _id: ObjectId(productId) },
            { $set: product }
        );
        if (updatedInfo.modifiedCount === 0) throw 'Could not update band successfully';
        return review;
    }
}
