(function () {
    const addToMenuForm = document.getElementById('addToMenuForm');
    if (addToMenuForm) {
        const itemNameElement = document.getElementById('itemName');
        const priceElement = document.getElementById('price');
        const imageElement = document.getElementById('image');
        let errorDiv = document.getElementById('Error');
        addToMenuForm.addEventListener('submit', (event) => {
        try {
            //Item name checking
            if (!itemNameElement.value) throw 'you must provide an item name';
            let itemNameValue = itemNameElement.value;
            if (typeof itemNameValue !== 'string') throw 'you must provide an item name';
            itemNameValue = itemNameValue.trim();
            if (itemNameValue.length == 0) throw 'you must provide a valid item name';
            //Price checking
            if (!priceElement.value) throw 'you must provide a price';
            let priceValue = priceElement.value;
            if (typeof priceValue !== 'string') throw 'you must provide a price';
            priceValue = priceValue.trim();
            if (price.length == 0) throw 'you must provide a valid price';
            //Image checking
            if (!imageElement.value) throw 'you must provide an image link';
            let imageValue = imageElement.value;
            if (typeof imageValue !== 'string') throw 'you must provide an image link';
            imageValue = imageValue.trim();
            if (imageValue.length == 0) throw 'you must provide a image link';
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;

        }
      });
    }
  })();
  