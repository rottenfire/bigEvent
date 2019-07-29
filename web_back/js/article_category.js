refreshCategory();

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
  $('#delBtn').off('click', deleteCategory);
  // console.log(id);
  $('#deleteCho').modal('show');
  $('#delBtn').on('click', deleteCategory);
  // $('#deleteCho').modal('hide');
  $('#canBtn').click(function () {});
}

function deleteCategory() {
  // $.post('http://localhost:8000/admin/category_delete', {
  //   id: id
  // }, function (res) {
  //   console.log('res:', res);
  //   if (res.code === 200) {
  //     console.log('删除成功');
  //     // alert(res.msg);
  //   }
  //   refreshCategory();
  // })
  console.log('123');
  $('#deleteCho').modal('hide');
  
}