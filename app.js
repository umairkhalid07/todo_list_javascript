// query selectors for all input and form elements
const firstname_El = document.querySelector('#fname');
const lastname_El = document.querySelector('#lname');
const email_El = document.querySelector('#email');
const age_El = document.querySelector('#age');
const phnumber_El = document.querySelector('#phnumber');
const password1_El = document.querySelector('#password1');
const password2_El = document.querySelector('#password2');
const form = document.querySelector('#registration');
document.querySelector('#submit').disabled = true;

// utility function for checking empty input field
const isRequired = value => value === '' ? false : true;

// utility function for checking name length between given characters
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// utility function for checking range of given age numbers
const inRange = (value, min, max) => value < min || value > max ? false : true;

// utility function for checking length of phone number
const isValid = (length, range) => length != range ? false : true;

// utility function for checking email against regular expression
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// utility function for checking password against regualr expression
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    return re.test(password);
};

// function for showing error message
const showError = (input, message, show) => {
    if (show) {
        const formField = input.parentElement;

        formField.classList.remove('success');
        formField.classList.add('error');

        const error = formField.querySelector('small');
        error.textContent = message;
    }
};

// function for showing error message
const showSuccess = (input, show) => {
    if (show) {
        const formField = input.parentElement;

        formField.classList.remove('error');
        formField.classList.add('success');

        const error = formField.querySelector('small');
        error.textContent = 'Valid';
    }
}


// function for validating first name of user
const checkFirstname = (show) => {
    let valid = false;
    const min = 3, max = 25;
    const name = firstname_El.value.trim();

    if (!isRequired(name)) {
        showError(firstname_El, 'Name cannot be blank.', show);
    } else if (!isBetween(name.length, min, max)) {
        showError(firstname_El, `Name must be between ${min} and ${max} characters.`, show)
    } else {
        showSuccess(firstname_El, show);
        valid = true;
    }
    return valid;
}

// function for validating last name of user
const checkLastname = (show) => {
    let valid = false;
    const min = 3, max = 25;
    const name = lastname_El.value.trim();

    if (!isRequired(name)) {
        showError(lastname_El, 'Name cannot be blank.', show);
    } else if (!isBetween(name.length, min, max)) {
        showError(lastname_El, `Name must be between ${min} and ${max} characters.`, show)
    } else {
        showSuccess(lastname_El, show);
        valid = true;
    }
    return valid;
}

// function for validating email of user
const checkEmail = (show) => {
    let valid = false;
    const email = email_El.value.trim();

    if (!isRequired(email)) {
        showError(email_El, 'Email cannot be blank.', show);
    } else if (!isEmailValid(email)) {
        showError(email_El, 'Email is not valid.', show)
    } else {
        showSuccess(email_El, show);
        valid = true;
    }
    return valid;
}

// function for validating age of user
const checkAge = (show) => {
    let valid = false;
    const min = 18, max = 60;
    const age = age_El.value.trim();

    if (!isRequired(age)) {
        showError(age_El, 'Age cannot be blank.', show);
    } else if (!inRange(age, min, max)) {
        showError(age_El, `Age must be between ${min} and ${max} years.`, show)
    } else {
        showSuccess(age_El, show);
        valid = true;
    }
    return valid;
}

// function for validating phone number of user
const checkPhnumber = (show) => {
    let valid = false;
    const range = 11;
    const phnumber = phnumber_El.value.trim();

    if (!isRequired(phnumber)) {
        showError(phnumber_El, 'Contact number cannot be blank.', show);
    } else if (!isValid(phnumber.length, range)) {
        showError(phnumber_El, `Contact number must be of ${range} digits`, show);
    } else {
        showSuccess(phnumber_El, show);
        valid = true;
    }
    return valid;
}

// function for validating password of user
const checkPassword = (show) => {
    let valid = false;
    const password = password1_El.value.trim();

    if (!isRequired(password)) {
        showError(password1_El, 'Password cannot be blank.', show);
    } else if (!isPasswordSecure(password)) {
        showError(password1_El, 'Password must have at least 1 lowercase character, 1 uppercase characters, and 1 number.', show);
    } else {
        showSuccess(password1_El, show);
        valid = true;
    }
    return valid;
};

// function for validating re-entered password of user
const checkConfirmPassword = (show) => {
    let valid = false;
    const confirmPassword = password2_El.value.trim();
    const password = password1_El.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(password2_El, 'Please enter the password again', show);
    } else if (password !== confirmPassword) {
        showError(password2_El, 'Passwords do not match', show);
    } else {
        showSuccess(password2_El, show);
        valid = true;
    }
    return valid;
};

const checkConditions = () => {

     let isFirstNameValid = checkFirstname(false),
        isLastNameValid = checkLastname(false),
        isEmailValid = checkEmail(false),
        isAgeValid = checkAge(false),
        isPhNumberValid = checkPhnumber(false),
        isPasswordValid = checkPassword(false),
         isConfirmPasswordValid = checkConfirmPassword(false);

    let isFormValid = isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isAgeValid &&
        isPhNumberValid &&
        isPasswordValid &&
        isConfirmPasswordValid
    
    return isFormValid;
};

form.addEventListener("change", () => {
    document.getElementById('submit').disabled = !checkConditions();
});

// form event listener to call above validation functions
form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
   
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkFirstname(true);
            che
            break;
        case 'lname':
            checkLastname(true);
            break;
        case 'email':
            checkEmail(true);
            break;
        case 'age':
            checkAge(true);
            break;
        case 'phnumber':
            checkPhnumber(true);
            break;
        case 'password1':
            checkPassword(true);
            break;
        case 'password2':
            checkConfirmPassword(true);
            break;
    }
}));

