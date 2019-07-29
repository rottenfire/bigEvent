// 当前删除的条目ID
var currentDelId = '';

refreshTr();

// 文章搜索刷新
function refreshTr() {
  $.getJSON('http://localhost:8000/admin/search', function (res) {
    console.log(res.data);
    var htmlString = template('articleTr', res);
    // console.log(htmlString);
    $('#artTbody').html(htmlString);
  })
}

// 给删除按钮绑定事件
$('#artTbody').on('click', '#toDelBtn', function () {
  $('#modal_del').modal('show');
  // 设置当前删除的ID是哪个
  currentDelId = $(this).attr('data-delId');
})

// 给确认删除按钮绑定事件
$('#modal_del').on('click', '#delBtn', function () {
  $.get('http://localhost:8000/admin/article_delete', {
    id: currentDelId
  }, function (res) {
    console.log(res);
    $('#modal_del').modal('hide');
    refreshTr();
  });
})