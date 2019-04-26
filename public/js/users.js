// Get all pets info
if ($('#userList').length) {
  const api = '/api/users';
  const request = {
    method: 'GET',
    url: api,
    success: handleSuccess,
    error: handleError
  };
  $.ajax(request);
  
  function handleError(err) {
    console.log(err);
  };
  function handleSuccess(res) {
    if (res.length > 0) {
      let counter = 1;
      res.forEach(user => {
        let userHtml = `
          <tr> 
            <td>${counter}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
          </tr>`;
        $('#userList').append(userHtml);
        counter++;
      });
    };
  };
}