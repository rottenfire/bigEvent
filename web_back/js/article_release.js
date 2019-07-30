getCategory();

// 获取文章类别,设置在select标签中
function getCategory() {
  $.getJSON('http://localhost:8000/admin/category_search', function (res) {
    // console.log(res);
    var cateSelString = template('categorySel', res);
    // console.log(cateSelString);
    $('#artCategory').html(cateSelString);
  });
}

// 发布文章接口请求
function toSubmit(state) {
  if (state === '已发布') {
    state = 1;
  } else if (state === '草稿') {
    state = 0;
  }
  var fd = new FormData(document.getElementById('addArticleForm'));
  fd.append('state', state);
  // 通过该方法获取textarea里的值
  fd.append('content', tinyMCE.activeEditor.getContent());
  console.log(fd);
  $.ajax({
    url: 'http://localhost:8000/admin/article_publish',
    type: 'post',
    data: fd,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log(data);
    }
  })
}

// 选择图片文件后的预览功能
function previewCover(file) {
  var urlS = URL.createObjectURL(file)
  $('#artPic').attr('src', urlS);
}

// 选择文件绑定change事件
$('#exampleInputFile').on('change', function () {
  var file = this.files[0];
  if (file) {
    previewCover(file);
  } else {
    $('#artPic').attr('src', '');
  }
});

// 绑定为发布按钮绑定事件
$('#submitBtn').on('click', function () {
  console.log('sub');
  toSubmit('已发布');
});

// 绑定为存为草稿按钮绑定事件
$('#draftBtn').on('click', function () {
  console.log('draft');
  toSubmit('草稿');
});