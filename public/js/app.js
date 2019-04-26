console.log('JS Check');
// If there are any alerts already, remove them
$('.alert').remove();

// Form Submit Event Handler
$('#signupForm').on('submit', (e) => {
  e.preventDefault();
  console.log(e)
  // If there are any alerts already, remove them
  $('.alert').remove();

  // Capture the form data for sending
  const formData = {
    name: $('#name').val().trim(),
    // lastName: $('#name').val().trim(),
    email: $('#email').val().trim(),
  }
  const request = {
    method: 'POST',
    url: '/signup',
    data: formData,
    beforeSend: handleSubmit,
    success: handleSuccess,
    error: handleError,
  }
  // send form to validation api
  $.ajax(request);

  function handleSubmit() {
    // Disable the form while ajax call is happening
    $('#signupForm :submit').attr("disabled", "disabled");
  }
  function handleError(err) {
    // Re-enable the form now that ajax call is over
    $('#signupForm :submit').removeAttr("disabled");
    console.log(err);
  };
  function handleSuccess(response) {
    // Re-enable the form now that ajax call is over
    $('#signupForm :submit').removeAttr("disabled");
    console.log(response);

    // Check response: error or success?
    if (response.error) {
      // if error present, append the alerts
      // loop the errors, with the type modification in the json response
    } else if (response.success) {
      // if success, delete form section contents and insert success
      $('.signup').empty();
      $('.signup').append('<h1>Success!</h1>');
    }
  };
});
  

  

  





