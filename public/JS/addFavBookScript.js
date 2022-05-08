(function () {
    const addFavBookForm = document.getElementById('addFavBookForm');
    if (addFavBookForm) {
        const itemIdElement = document.getElementById('itemId');
        const genreElement = document.getElementById('genre');
        const itemNameElement = document.getElementById('itemName');
        const imageElement = document.getElementById('image');
        let errorDiv = document.getElementById('Error');
        addFavBookForm.addEventListener('submit', (event) => {
        try {
            //ItemId checking
            if (!itemIdElement.value) throw 'issue with itemId';
            let itemIdValue = itemIdElement.value;
            if (typeof itemIdValue !== 'string') throw 'issue with itemId';
            itemIdValue = itemIdValue.trim();
            if (itemIdValue.length == 0) throw 'issue with itemId';
            //Genre checking
            if (!genreElement.value) throw 'issue with genre';
            let genreValue = genreElement.value;
            if (typeof genreValue !== 'string') throw 'issue with genre';
            genreValue = genreValue.trim();
            if (genreValue.length == 0) throw 'issue with genre';
            //Item name checking
            if (!itemNameElement.value) throw 'you must provide an item name';
            let itemNameValue = itemNameElement.value;
            if (typeof itemNameValue !== 'string') throw 'you must provide an item name';
            itemNameValue = itemNameValue.trim();
            if (itemNameValue.length == 0) throw 'you must provide a valid item name';
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
  