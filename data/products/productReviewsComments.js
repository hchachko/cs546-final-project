const mongoCollections = require('../../config/mongoCollections');
const menu = mongoCollections.menu;
let { ObjectId } = require('mongodb');

module.exports = {
    create: async (reviewId, commenterName, commentData) => {
        if (!reviewId || !commenterName || !commentData) throw "All fields must be provided";
        if (typeof reviewId != "string" || typeof commenterName != "string" || typeof commentData != "string") throw "Detected non-string input(s)";
        reviewId = reviewId.trim()
        commenterName = commenterName.trim();
        commentData = commentData.trim();
        if (reviewId.length == 0 || commenterName.length == 0 || commentData.length == 0) throw "Detected empty string input(s)";
        if (!ObjectId.isValid(reviewId)) throw "Detected invalid productId";
        const menuCollection = await menu();
        const product = await menuCollection.find({"reviews._id": ObjectId(reviewId)}).toArray();
        if (!product) throw "Product not found";
        let review;
        for (let x of product[0].reviews) {
            if (x['_id'] == reviewId) review = x;
        }
        if (!review) throw "Review not found";
        let filteredReviews = product[0].reviews.filter(removeOldReview);
        function removeOldReview(elem){
            if (elem['_id'] != reviewId) return elem;
        }
        const commentId = new ObjectId();
        const comment = {
            _id: commentId,
            Commenter_name: commenterName,
            Comment_data: commentData
        }
        review.Comments.push(comment);
        filteredReviews.push(review);
        product[0].reviews=filteredReviews;
        const updatedInfo = await menuCollection.updateOne(
            { _id: ObjectId(product[0]._id)},
            { $set: product[0] }
        );
        if (updatedInfo.modifiedCount === 0) throw "Could not update product successfully";
        return comment;
    }
}
