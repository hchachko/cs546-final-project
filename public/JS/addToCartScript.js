(function () {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        const timeElement = document.getElementById('time');
        const noteElement = document.getElementById('note');
        const itemIdElement = document.getElementById('itemId');
        const userIdElement = document.getElementById('userId');
        let errorDiv = document.getElementById('Error');
        checkoutForm.addEventListener('submit', (event) => {
        try {
            //Time checking
            if (!timeElement.value) throw 'a time must be provided';
            let timeValue = timeElement.value;
            if (typeof timeValue !== 'string') throw 'a time must be provided';
            timeValue = timeValue.trim();
            if (timeValue.length == 0) throw 'a time must be provided';
            //ItemId checking
            if (!itemIdElement.value) throw 'issue with itemId';
            let itemIdValue = itemIdElement.value;
            if (typeof itemIdValue !== 'string') throw 'issue with itemId';
            itemIdValue = itemIdValue.trim();
            if (itemIdValue.length == 0) throw 'issue with itemId';
            //UserId checking
            if (!userIdElement.value) throw 'issue with userId';
            let userIdValue = userIdElement.value;
            if (typeof userIdValue !== 'string') throw 'issue with userId';
            userIdValue = userIdValue.trim();
            if (userIdValue.length == 0) throw 'issue with userId';
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;
        }
      });
    }
  })();
  