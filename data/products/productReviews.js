const mongoCollections = require('../../config/mongoCollections');
const menu = mongoCollections.menu;
let { ObjectId } = require('mongodb');

module.exports = {
    get: async(reviewId) => {
        if (!reviewId) throw "All fields must be provided";
        if (typeof reviewId != "string") "Detcted non-string input";
        reviewId = reviewId.trim();
        if (reviewId.length == 0) throw "Detected empty string"; 
        if (!ObjectId.isValid(reviewId)) throw "Detected invalid reviewId";
        const menuCollection = await menu();
        const product = await menuCollection.find({"reviews._id": ObjectId(reviewId)}).toArray();
        if (!product) throw "Product not found";
        for (let x of product[0].reviews) {
            if (x['_id'] == reviewId) return x;
        }
        throw "Review not found";
    },
    create: async (productId, reviewerName, likeDislike, rating, summary) => {
        if (!productId || !reviewerName || !likeDislike || !rating || !summary) throw "All fields must be provided";
        if (typeof productId != "string" || typeof reviewerName != "string" || typeof likeDislike != "string" || typeof summary != "string") throw "Detected non-string input(s)";
        if (likeDislike != "like" && likeDislike != "dislike") throw "Unexpected value from dropdown menu";
        if (typeof rating != "number") throw "Detected non-number input";
        if (!Number.isInteger(rating)) throw "Detected non-integer input";
        if (!(1 <= rating && rating <=5)) "Review rating out of range";
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
            Rating: rating,
            Summary: summary,
            Comments: []
        }
        product.reviews.push(review);
        let totalLikes = product.likes;
        let totalDislikes = product.dislikes;
        if (likeDislike === "like"){
            totalLikes++;
            product.likes = totalLikes;
        } 
        else{
            totalDislikes++;
            product.dislikes = totalDislikes;
        }
        const updatedInfo = await menuCollection.updateOne(
            { _id: ObjectId(productId) },
            { $set: product }
        );
        if (updatedInfo.modifiedCount === 0) throw "Could not update band successfully";
        return review;
    }
}
