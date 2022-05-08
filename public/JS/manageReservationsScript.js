(function () {
    const createScheduleForm = document.getElementById('createSchedule');
    if (createScheduleForm) {
        const dayElement = document.getElementById('day');
        const numSeatsElement = document.getElementById('numSeats');
        let errorDiv = document.getElementById('Error');
        createScheduleForm.addEventListener('submit', (event) => {
        try {
            //Day checking
            if (!dayElement.value) throw 'a day must be selected';
            let dayValue = dayElement.value;
            if (typeof dayValue !== 'string') throw 'a day must be selected';
            dayValue = dayValue.trim();
            if (dayValue.length == 0) throw 'a day must be selected';
            //Number of Seats checking
            if (!numSeatsElement.value) throw 'you must specify the number of seats';
            let numSeatsValue = numSeatsElement.value;
            if (typeof numSeatsValue !== 'string') throw 'you must specify the number of seats';
            numSeatsValue = numSeatsValue.trim();
            if (numSeatsValue.length == 0) throw 'you must specify the number of seats';
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;
        }
      });
    }
  })();
  