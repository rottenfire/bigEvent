$('#logoutA').click(function() {
  $('#modalBox').modal('show');
  $('#logoutBtn').click(function() {
    $.post('http://localhost:8000/admin/logout',function () {
      window.location.href = 'login.html';
    })
  })
});


// 获取用户信息，更改用户名及头像
$.get('http://localhost:8000/admin/getuser',function (res) {
  console.log(res);
  $('#nickname').text(res.data.nickname);
  $('#user_pic').prop('src',res.data.user_pic);
  $('#per_pic').prop('src',res.data.user_pic);
})

