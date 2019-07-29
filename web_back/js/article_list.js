// 当前删除的条目ID
var currentDelId = '';
var currentPage = 1;
var currentType = '';
var currentState = '';

refreshTr();
categorySel();

// 文章搜索刷新
function refreshTr() {
  $.getJSON('http://localhost:8000/admin/search', {
    page: currentPage,
    type: currentType
  }, function (res) {
    // console.log(res.data);
    var htmlString = template('articleTr', res);
    $('#artTbody').html(htmlString);
    $('.pagination').twbsPagination({
      currentPage: 1, // 初始页
      totalPages: res.totalPage, // 总页数，可以通过翻页，或者最后一页
      startPage: 1,
      visiblePages: 6, // 可见页面
      first: "首页",
      last: "尾页",
      prev: '<',
      next: '>',
      onPageClick: function (event, page) {
        console.log(event, page)
        currentPage = page;
        refreshTr();
      }
    });
  })
}

// 设置文章类型下拉框中的内容
function categorySel() {
  $.getJSON('http://localhost:8000/admin/category_search',function (res) {
    var categorySel = template('categorySel',res);
    $('#selCategory').html(categorySel);
  });
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

// 筛选按钮事件绑定
$('#btnSearch').on('click',function() {
  currentType = $('#selCategory').val();
  currentState = $('#selStatus').val();
  refreshTr();
});