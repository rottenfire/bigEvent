axios.get('http://localhost:8000/admin/search',{
  params: {
    perpage: 5
  }
}).then(function(response) {
  console.log(response);
  var res = response.data;
  var focusHtmlString = template('focus_model', res);
  $('#focus_list').html(focusHtmlString);
})