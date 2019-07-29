// var pwd = '';
initUserInfo();

// 调用获取用户信息接口，将数据设置在相应的输入框中
function initUserInfo() {
  $.getJSON('http://localhost:8000/admin/userinfo_get', function (res) {
    console.log(res);
    // 请求成功，返回正确结果
    if (res.code === 200) {
      $('#inputUsername').val(res.data.username);
      $('#inputNickname').val(res.data.nickname);
      $('#inputEmail').val(res.data.email);
      $('#inputPwd').val(res.data.password);
      $('#imgPic').attr('src', res.data.user_pic);

      // pwd = res.data.password;
    }
  })
}

// 设置上传头像预览功能
$('#inputUserPic').on('change', function () {
  var file = this.files[0];
  var picUrl = URL.createObjectURL(file);
  // console.log(picUrl);
  $('#imgPic').attr('src', picUrl);
  // console.log($('#imgPic').attr('src'));
});

// 绑定修改按钮事件
$('#submit').on('click',function() {
  console.log($('#userForm')[0]);
  var fd = new FormData($('#userForm')[0]);
  $.ajax({
    url: 'http://localhost:8000/admin/userinfo_edit',
    type: 'post',
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      console.log(data);
      parent.location.href = 'index.html';
    } 
  })
});