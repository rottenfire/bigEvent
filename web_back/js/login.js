$('#subBtn').click(signIn);
$(document).keydown(function (e) {
  if(e.keyCode == 13) {
    signIn();
  }
});


function signIn () {
  var inpTxt = $('#inpTxt').val();
  var inpPwd = $('#inpPwd').val();
  if(inpTxt == '' || inpPwd == '') {
    $('#modalMsg').text('用户名或密码不能为空');
    $('#myModal').modal('show')
    return;
  }

  $.ajax({
    url: 'http://localhost:8000/admin/login',
    type: 'post',
    data: {user_name: inpTxt,password: inpPwd},
    success: function (result) {
      if(result.code === 200) {
        window.location.href="index.html";
      }
      else if(result.code === 400) {
        $('#modalMsg').text('用户名或密码错误');
        $('#myModal').modal('show')
      }
    }
  })
}

