// 从url中获取参数ID
var idArr = window.location.search.split('=');
var id = idArr[idArr.length - 1];
// console.log(id);

getArticleCategory();

// 获取文章类型并设置在select标签中
function getArticleCategory () {
  $.getJSON('http://localhost:8000/admin/category_search',function(res) {
    var categoryString = template('artTypeModel', res);
    $('#artTypeSel').html(categoryString);
    // 请求到文章类别后再请求文章信息
    artSetDetail();
  });
}

// 根据ID获取文章详细信息
function artSetDetail() {
  $.getJSON('http://localhost:8000/admin/search',{id: id},function(res) {
    console.log(res);
    $('#inputTitle').val(res.data.title);
    $('#artPic').attr('src', res.data.cover);
    $('#artTypeSel').val(res.data.type);
    $('#dateinput').val(res.data.date);
    $('#rich_content').val(res.data.content);
    $('#artId').val(id);
  });
}

// 访问文章编辑接口，将编辑后的文章信息发送至服务端
function doEdit() {
  var fd = new FormData(document.getElementById('artDetailForm'));
  // console.log($('#rich_content').val());
  fd.append('content', tinyMCE.activeEditor.getContent());
  $.ajax({
    url: 'http://localhost:8000/admin/article_edit',
    type: 'post',
    data: fd,
    processData: false,
    contentType: false,
    success: function(res) {
      console.log(res);
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

// 修改按钮事件绑定
$('#editBtn').on('click',function() {
  if(!$('#exampleInputFile')[0].files[0]) {
    alert('请上传封面图片');
    return;
  }
  doEdit();
});