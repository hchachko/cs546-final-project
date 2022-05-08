(function () {
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        const likeDislikeElement = document.getElementById('likeDislike');
        const reviewRatingElement = document.getElementById('reviewRating');
        const reviewDescElement = document.getElementById('reviewDesc');
        let errorDiv = document.getElementById('Error');
        reviewForm.addEventListener('submit', (event) => {
        try {
            //Like/Dislike checking
            if (!likeDislikeElement.value) throw 'you must leave a like or dislike';
            let likeDislikeValue = likeDislikeElement.value;
            if (typeof likeDislikeValue !== 'string') throw 'you must leave a like or dislike';
            if (likeDislikeValue != "like" && likeDislikeValue != "dislike") throw 'you must leave a like or dislike';
            //Rating checking
            if (!reviewRatingElement.value) throw 'you must leave a rating';
            let reviewRatingValue = reviewRatingElement.value;
            if (typeof reviewRatingValue !== 'string') throw 'you must leave a rating';
            reviewRatingValue = reviewRatingValue.trim();
            if (reviewRatingValue.length == 0) throw 'you must provide a valid price';
            let rating = parseInt(reviewRatingValue);
            if (typeof rating != "number") throw "detected non-number input";
            if (!Number.isInteger(rating)) throw "detected non-integer input";
            if (!(1 <= rating && rating <= 5)) throw "review rating out of range";
            //Review Description checking
            if (!reviewDescElement.value) throw 'you must provide a description';
            let reviewDescValue = reviewDescElement.value;
            if (typeof reviewDescValue !== 'string') throw 'you must provide a description';
            reviewDescValue = reviewDescValue.trim();
            if (reviewDescValue.length == 0) throw 'you must provide a description';
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;

        }
      });
    }
  })();
  