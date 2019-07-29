var currentEdit = '';

refreshTr();

// 给dialog内提交按钮绑定点击事件
$('#model_sub_btn').on('click', function () {
  var name = $('#cateName_input').val();
  var slug = $('#cateSlug_input').val();
  if (name === '' || slug === '') {
    console.log('名称和别名都不能为空');
    return;
  }
  console.log($(this).text());
  if ($(this).text() == '新增') {
    $.post('http://localhost:8000/admin/category_add', {
      name: name,
      slug: slug
    }, function (res) {
      console.log(res);
      if (res.code === 200) {
        $('#addModal').modal('hide');
        refreshTr();
      }
    });
  } else if ($(this).text() == '修改') {
    $.post('http://localhost:8000/admin/category_edit', {
      id: currentEdit,
      name: name,
      slug: slug,
    }, function (res) {
      $('#addModal').modal('hide');
      refreshTr();
    });
  }
});

// 新增分类按钮绑定点击事件
$('#addDialogBtn').on('click', function () {
  showAddDialog();
});

// 显示新增dialog后初始化内容
function showAddDialog() {
  $('#addModal').modal('show');
  $('#addModal #cateName_input').val('');
  $('#cateSlug_input').val('');
  $('#addModal .modal-title').text('新增分类');
  $('#addModal #model_sub_btn').text('新增');
}

// 显示新增dialog后初始化内容
function showEditDialog(data) {
  currentEdit = data.id;
  $('#addModal').modal('show');
  $('#addModal #cateName_input').val(data.name);
  $('#cateSlug_input').val(data.slug);
  $('#addModal .modal-title').text('修改分类');
  $('#addModal #model_sub_btn').text('修改');
}

// 删除按钮绑定事件
function deleteTr(id) {
  $('#delBtn').data('delId', id);
  $('#modal_del').modal('show');
}

// 给删除按钮绑定事件
$('#delBtn').on('click', function () {
  $.post('http://localhost:8000/admin/category_delete', {
    id: $(this).data('delId')
  }, function (res) {
    console.log('res:', res);
    if (res.code === 200) {
      console.log('删除成功');
      // alert(res.msg);
      refreshTr();
    }
  })
  $('#modal_del').modal('hide');
})

// 刷新文章类别列表
function refreshTr() {
  $.get('http://localhost:8000/admin/category_search', function (res) {
    console.log('res.data:', res.data);
    var htmlString = template('categoryTr', res);
    // console.log(htmlString);
    $('#cateBdy').html(htmlString);
  })
}