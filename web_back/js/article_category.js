refreshCategory();

// 给删除按钮绑定事件
$('#delBtn').on('click', function () {
  $.post('http://localhost:8000/admin/category_delete', {
    id: $(this).data('delId')
  }, function (res) {
    console.log('res:', res);
    if (res.code === 200) {
      console.log('删除成功');
      // alert(res.msg);
      refreshCategory();
    }
  })
  $('#modal_del').modal('hide');
})


// 刷新页面
function refreshCategory() {
  $.get('http://localhost:8000/admin/category_search', function (res) {
    console.log('res.data:', res.data);
    var htmlString = template('categoryTr', res);
    // console.log(htmlString);
    $('#cateBdy').html(htmlString);
  })
}

// 删除按钮绑定事件
function deleteTr(id) {
  $('#delBtn').data('delId', id);
  $('#modal_del').modal('show');
}