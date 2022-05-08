(function ($) {
  var addToCatalog = jQuery("#addToCatalogForm");
  var submitButton = jQuery("#catalogSubmitButton");
  var newCatalogAdded = jQuery("#new-catalog-added");

  var bookName = jQuery("#bookName");
  var numCopies = jQuery("#numCopies");
  var genre = jQuery("#genre");
  var image = jQuery("#image");
  var errorDiv2 = jQuery("#Error_2");
  errorDiv2.hide();

  addToCatalog.submit(function (event) {
    event.preventDefault();
    try {
      if (!bookName.val()) throw "you must provide a book name";
      let bookNameValue = bookName.val();
      if (typeof bookNameValue !== "string")
        throw "you must provide a book name";
      bookNameValue = bookNameValue.trim();
      if (bookNameValue.length == 0) throw "you must provide a valid book name";
      //Number of copies checking
      if (!numCopies.val()) throw "you must provide a number of copies";
      let numCopiesValue = numCopies.val();
      if (typeof numCopiesValue !== "string")
        throw "you must provide a number of copies";
      numCopiesValue = numCopiesValue.trim();
      if (numCopiesValue.length == 0)
        throw "you must provide a number of copies";
      let numCopiesConverted = parseInt(numCopiesValue);
      if (typeof numCopiesConverted != "number")
        throw "you must provide a positive integer input";
      if (!Number.isInteger(numCopiesConverted))
        throw "you must provide a positive integer input";
      if (numCopiesConverted < 1) "number of copies out of range";
      //Genre checking
      if (!genre.val()) throw "you must provide a genre";
      let genreValue = genre.val();
      if (typeof genreValue !== "string") throw "you must provide a genre";
      genreValue = genreValue.trim();
      if (genreValue.length == 0) throw "you must provide a genre";
      //Image checking
      if (!image.val()) throw "you must provide an image link";
      let imageValue = image.val();
      if (typeof imageValue !== "string")
        throw "you must provide an image link";
      imageValue = imageValue.trim();
      if (imageValue.length == 0) throw "you must provide a image link";
      errorDiv2.hidden = true;

      var requestConfig = {
        method: "POST",
        url: "/catalog/addToCatalog",
        contentType: "application/json",
        data: JSON.stringify({
          bookName: bookName.val(),
          numCopies: numCopies.val(),
          genre: genre.val(),
          image: image.val(),
        }),
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        // console.log("Gabby");
        if (responseMessage.error) {
          throw "Book cannot be added";
        } else {
          submitButton.hide();
          newCatalogAdded.append("<p>✅ New Book added successfully</p>");
        }
      });
    } catch (e) {
      event.preventDefault();
      errorDiv2.append("<p>Error: " + e + "</p>");
      errorDiv2.show();
    }
  });
})(window.jQuery);
