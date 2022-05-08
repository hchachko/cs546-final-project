(function () {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        const firstNameElement = document.getElementById('firstName');
        const lastNameElement = document.getElementById('lastName');
        const emailElement = document.getElementById('email');
        const passwordElement = document.getElementById('password');
        let errorDiv = document.getElementById('Error');
        signupForm.addEventListener('submit', (event) => {
        try {
            //First name checking
            if (!firstNameElement.value) throw 'you must provide your first name';
            let firstNameValue = firstNameElement.value;
            if (typeof firstNameValue !== 'string') throw 'you must provide your first name';
            firstNameValue = firstNameValue.trim();
            if (firstNameValue.length == 0) throw 'you must provide a valid first name';
            for (let i = 0; i < firstNameValue.length; i++) {
                if (
                  !(firstNameValue.charAt(i) > 64 && firstNameValue.charAt(i) < 91) &&
                  !(firstNameValue.charAt(i) > 96 && firstNameValue.charAt(i) < 123)
                ) {
                  throw "you must provide a valid first name";
                }
            }
            //Last name checking
            if (!lastNameElement.value) throw 'you must provide your last name';
            let lastNameValue = lastNameElement.value;
            if (typeof lastNameValue !== 'string') throw 'you must provide your last name';
            lastNameValue = lastNameValue.trim();
            if (lastNameValue.length == 0) throw 'you must provide a valid last name';
            for (let i = 0; i < lastNameValue.length; i++) {
                if (
                  !(lastNameValue.charAt(i) > 64 && lastNameValue.charAt(i) < 91) &&
                  !(lastNameValue.charAt(i) > 96 && lastNameValue.charAt(i) < 123)
                ) {
                  throw "last name must be valid";
                }
            }
            //Email checking
            if (!emailElement.value) throw 'you must provide an email';
            let emailValue = emailElement.value;
            if (typeof emailValue !== 'string') throw 'you must provide an email';
            emailValue = emailValue.trim();
            if (emailValue.length == 0) throw 'you must provide a valid email';
            if (emailValue.indexOf(".") == -1) throw "email must be a valid email address";
            const ext = emailValue.slice(emailValue.lastIndexOf(".") + 1);
            if (ext.length < 2) {
                throw "email must be a valid email address";
            } else {
                for (let i = 0; i < ext.length; i++) {
                    if (/[a-zA-Z]/.test(ext[i])) continue;
                    else throw "email must be a valid email address";
                }
            }
            //Password checking
            if (!passwordElement.value) throw 'you must provide a password';
            let passwordValue = passwordElement.value;
            if (typeof passwordValue !== 'string') throw 'you must provide a password';
            passwordValue = passwordValue.trim();
            if (passwordValue.length == 0) throw 'you must provide a valid password';
            if (passwordValue.length < 6) {
                throw "password must be at least 6 characters";
            }
            for (let i = 0; i < passwordValue.length; i++) {
                if (passwordValue.charAt(i) == " ") {
                    throw "password cannot have spaces";
                }
            }
            //Done! 
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;
        }
      });
    }
  })();
  