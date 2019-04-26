// Get all pets info
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
    res.forEach(user => {
      let userHtml = `
        <tr>
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.email}</td>
        </tr>`;
      $('#userList').append(userHtml);
    });
  };
};