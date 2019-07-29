// 当前删除的条目ID
var currentDelId = '';
// 当前页码数
var currentPage = 1;
// 当前需筛选的文章类型
var currentType = '';
// 当前需筛选的文章状态
var currentState = '';
// 当前总page数
var currentTotalPage = 0;
// 定义是否为首次生成pagination
var firstPagination = true;

refreshTr();
categorySel();

// 调用文章搜索接口，刷新文章列表
function refreshTr() {
  $.getJSON('http://localhost:8000/admin/search', {
    page: currentPage,
    type: currentType,
    state: currentState
  }, function (res) {
    console.log('totalPage:',res.totalPage);
    // 使用文章列表模板template设置文章列表
    var htmlString = template('articleTr', res);
    $('#artTbody').html(htmlString);
    // 使用pagination插件
    if(res.totalPage !== currentTotalPage){
      currentTotalPage = res.totalPage;
      $(".pagination").twbsPagination('destroy');
      firstPagination = true;
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
          // 如果是首次生成pagination则不重复刷新页面
          if (firstPagination) {
            firstPagination = false;
            return;
          }
          refreshTr();
        }
      });
    }
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
  firstPagination = true;
  refreshTr();
});