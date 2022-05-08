(function () {
    const reserveSeatForm = document.getElementById('reserveSeat');
    if (reserveSeatForm) {
        const dayElement = document.getElementById('day');
        const hourElement = document.getElementById('hour');
        let errorDiv = document.getElementById('Error');
        reserveSeatForm.addEventListener('submit', (event) => {
        try {
            //Day checking
            if (!dayElement.value) throw 'a day must be selected';
            let dayValue = dayElement.value;
            if (typeof dayValue !== 'string') throw 'a day must be selected';
            dayValue = dayValue.trim();
            if (dayValue.length == 0) throw 'a day must be selected';
            //Hour checking
            if (!hourElement.value) throw 'a hour must be selected';
            let hourValue = hourElement.value;
            if (typeof hourValue !== 'string') throw 'a hour must be selected';
            hourValue = hourValue.trim();
            if (hourValue.length == 0) throw 'a hour must be selected';
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;
        }
      });
    }
  })();
  