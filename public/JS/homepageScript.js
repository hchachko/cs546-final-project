(function () {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailElement = document.getElementById('email');
        const passwordElement = document.getElementById('password');
        let errorDiv = document.getElementById('Error');
        loginForm.addEventListener('submit', (event) => {
        try {
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
            errorDiv.hidden = true;
        } catch (e) {
            event.preventDefault();
            errorDiv.hidden = false;
            errorDiv.innerHTML = 'Error: ' + e;
        }
      });
    }
  })();
  