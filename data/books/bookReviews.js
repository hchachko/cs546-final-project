const mongoCollections = require('../../config/mongoCollections');
const catalog = mongoCollections.catalog;
let { ObjectId } = require('mongodb');

module.exports = {
    get: async(reviewId) => {
        if (!reviewId) throw "All fields must be provided";
        if (typeof reviewId != "string") "Detcted non-string input";
        reviewId = reviewId.trim();
        if (reviewId.length == 0) throw "Detected empty string"; 
        if (!ObjectId.isValid(reviewId)) throw "Detected invalid reviewId";
        const catalogCollection = await catalog();
        const book = await catalogCollection.find({"reviews._id": ObjectId(reviewId)}).toArray();
        if (!book) throw "Book not found";
        for (let x of book[0].reviews) {
            if (x['_id'] == reviewId) return x;
        }
        throw "Review not found";
    },
    create: async (bookId, reviewerName, likeDislike, rating, summary) => {
        if (!bookId || !reviewerName || !likeDislike || !rating || !summary) throw "All fields must be provided";
        if (typeof bookId != "string" || typeof reviewerName != "string" || typeof likeDislike != "string" || typeof summary != "string") throw "Detected non-string input(s)";
        if (likeDislike != "like" && likeDislike != "dislike") throw "Unexpected value from dropdown menu";
        if (typeof rating != "number") throw "Detected non-number input";
        if (!Number.isInteger(rating)) throw "Detected non-integer input";
        if (!(1 <= rating && rating <=5)) "Review rating out of range";
        bookId = bookId.trim()
        reviewerName = reviewerName.trim();
        summary = summary.trim();
        if (bookId.length == 0 || reviewerName.length == 0 || summary.length == 0) throw "Detected empty string input(s)";
        if (!ObjectId.isValid(bookId)) throw "Detected invalid bookId";
        const catalogCollection = await catalog();
        let book = await catalogCollection.findOne({_id: ObjectId(bookId)});
        if (!book) throw "book to review not found";
        const reviewId = new ObjectId();
        let review = {
            _id: reviewId,
            Reviewer_name: reviewerName,
            Rating: rating,
            Summary: summary,
            Comments: []
        }
        book.reviews.push(review);
        let totalLikes = book.likes;
        let totalDislikes = book.dislikes;
        if (likeDislike === "like"){
            totalLikes++;
            book.likes = totalLikes;
        } 
        else{
            totalDislikes++;
            book.dislikes = totalDislikes;
        }
        const updatedInfo = await catalogCollection.updateOne(
            { _id: ObjectId(bookId) },
            { $set: book }
        );
        if (updatedInfo.modifiedCount === 0) throw "Could not update book successfully";
        return review;
    }
}
