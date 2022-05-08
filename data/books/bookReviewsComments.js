const mongoCollections = require('../../config/mongoCollections');
const catalog = mongoCollections.catalog;
let { ObjectId } = require('mongodb');

module.exports = {
    create: async (reviewId, commenterName, helpfulReview, commentData) => {
        if (!reviewId || !commenterName || !helpfulReview || !commentData) throw "All fields must be provided";
        if (typeof reviewId != "string" || typeof commenterName != "string" || typeof helpfulReview != "string" || typeof commentData != "string") throw "Detected non-string input(s)";
        reviewId = reviewId.trim();
        commenterName = commenterName.trim();
        commentData = commentData.trim();
        if (reviewId.length == 0 || commenterName.length == 0 || commentData.length == 0) throw "Detected empty string input(s)";
        if (helpfulReview != "helpful" && helpfulReview != "unhelpful") throw "Unexpected value from dropdown";
        if (!ObjectId.isValid(reviewId)) throw "Detected invalid reviewId";
        const catalogCollection = await catalog();
        const book = await catalogCollection.find({"reviews._id": ObjectId(reviewId)}).toArray();
        if (!book) throw "Book not found";
        let review;
        for (let x of book[0].reviews) {
            if (x['_id'] == reviewId) review = x;
        }
        if (!review) throw "Review not found";
        let filteredReviews = book[0].reviews.filter(removeOldReview);
        function removeOldReview(elem){
            if (elem['_id'] != reviewId) return elem;
        }
        const commentId = new ObjectId();
        const comment = {
            _id: commentId,
            Helpful_Review: helpfulReview,
            Commenter_name: commenterName,
            Comment_data: commentData
        }
        review.Comments.push(comment);
        filteredReviews.push(review);
        book[0].reviews=filteredReviews;
        const updatedInfo = await catalogCollection.updateOne(
            { _id: ObjectId(book[0]._id)},
            { $set: book[0] }
        );
        if (updatedInfo.modifiedCount === 0) throw "Could not update book successfully";
        return comment;
    }
}
