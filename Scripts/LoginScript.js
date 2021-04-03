// SignIn/SignOut Transition

document.querySelector('.img-btn').addEventListener('click', function()
{
    document.querySelector('.cont').classList.toggle('s-signup');
}
);

// function Main_App()
// {
    
//      location.href = "/HTML/main.html";
// } 


//moment.js with validate.js for user input
(function(){
    validate.extend(validate.validators.datetime, {
    // The value is not null or undefined but otherwise it could be anything.
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

//Validation User Creation Form
var constraints = {
    name: {
        presence:true
    },
    email: {
      // If email is required
      presence: true,
      // and you want to check if this is an email
      email: true
    },
    password: {
        // Is password required?
        presence: true,
        // Is password at least 4 characters long?
        length: {
          maximum: 4
        }
    },
      "confirm-password": {
        // Do you need to confirm your password?
        presence: true,
        // It needs to be equal to the other password
        equality: {
          // Input we want it to be equal to
          attribute: "password",
          // Error message if passwords don't match
          message: "^Las contraseñas no coinciden"
        }
    },
      username: {
        // You need to pick a username
        presence: true,
        // It must be between 6 and 20 characters long
        length: {
          minimum: 6,
          maximum: 20
        },
        format: {
          // We only a-z and 0-9
          pattern: "[a-z0-9]+",
          // We don't care if the username is uppercase or lowercase
          flags: "i",
          message: "Solo puede contener 0-9 y a-z"
        }
    },
      birthdate: {
        // The user needs to give a birthday
        presence: true,
        // Must be born at least 18 years ago
        date: {
          latest: moment().subtract(18, "años"),
          message: "^Necesitas tener 18 años para tener tu Poke cuenta"
        }
    }
};

var form = document.querySelector("form#signup");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

    // Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
for (var i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener("change", function(ev) {
    var errors = validate(form, constraints) || {};
    showErrorsForInput(this, errors[this.name])
  });
}

  function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }
 
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      // Since the errors can be null if no errors were found we need to handle that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Function that shows the errors for a specific input
function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      _.each(errors, function(error) {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
    }
  }

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error with the planned markup
// [message]
function addError(messages, error) {
    // Create error message container
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    // You can add what ever styling classes you want to your errors
    block.classList.add("text-danger");
    // Assign error message
    block.innerText = error;
    // Adds our ready error block to the desired location
    messages.appendChild(block);
  }

  
  function showSuccess() {
    // Action to execute if the form is valid.
    alert("Success!");
  }
})();