(function ($) {
  var addToMenu = jQuery("#addToMenuForm");
  var submitButton = jQuery("#drinkSubmitButton");
  var newDrinkAdded = jQuery("#new-drink-added");

  var itemNameElement = jQuery("#itemName");
  var priceElement = jQuery("#price");
  var imageElement = jQuery("#image");
  var errorDiv = jQuery("#Error_1");
  errorDiv.hide();

  addToMenu.submit(function (event) {
    event.preventDefault();
    try {
      //Item name checking
      if (!itemNameElement.val()) throw "you must provide an item name";
      let itemNameValue = itemNameElement.val();
      if (typeof itemNameValue !== "string")
        throw "you must provide an item name";
      itemNameValue = itemNameValue.trim();
      if (itemNameValue.length == 0) throw "you must provide a valid item name";
      //Price checking
      if (!priceElement.val()) throw "you must provide a price";
      let priceValue = priceElement.val();
      if (typeof priceValue !== "string") throw "you must provide a price";
      priceValue = priceValue.trim();
      if (price.length == 0) throw "you must provide a valid price";
      //Image checking
      if (!imageElement.val()) throw "you must provide an image link";
      let imageValue = imageElement.val();
      if (typeof imageValue !== "string")
        throw "you must provide an image link";
      imageValue = imageValue.trim();
      if (imageValue.length == 0) throw "you must provide a image link";
      errorDiv.hidden = true;

      var requestConfig = {
        method: "POST",
        url: "/menu/addToMenu",
        contentType: "application/json",
        data: JSON.stringify({
          itemName: itemNameElement.val(),
          price: priceElement.val(),
          image: imageElement.val(),
        }),
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        //hide the button on the form
        //if drink cannot be addded throw error
        if (responseMessage.error) {
          throw "Drink cannot be added";
        } else {
          console.log(responseMessage);
          submitButton.hide();
          newDrinkAdded.append("<p>✅ New drink added successfully</p>");
        }
      });
    } catch (e) {
      event.preventDefault();
      errorDiv.append("<p>Error: " + e + "</p>");
      errorDiv.show();
    }
  });
})(window.jQuery);
