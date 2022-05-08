(function () {
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        const helpfulReviewElement = document.getElementById('helpfulReview');
        const commentElement = document.getElementById('comment');
        let errorDiv = document.getElementById('Error');
        commentForm.addEventListener('submit', (event) => {
        try {
            //Helpful Review checking
            if (!helpfulReviewElement.value) throw 'you must note if this review was helpful or not';
            let helpfulReviewValue = helpfulReviewElement.value;
            if (typeof helpfulReviewValue !== 'string') throw 'you must note if this review was helpful or not';
            if (helpfulReviewValue != "helpful" && helpfulReviewValue != "unhelpful") throw 'you must note if this review was helpful or not';
            //Comment checking
            if (!commentElement.value) throw 'you must leave a comment';
            let commentValue = commentElement.value;
            if (typeof commentValue !== 'string') throw 'you must leave a comment';
            commentValue = commentValue.trim();
            if (commentValue.length == 0) throw 'you must leave a comment';
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;

        }
      });
    }
  })();
  