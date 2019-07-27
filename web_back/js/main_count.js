// 文章数量统计
$.get('http://localhost:8000/admin/article_count',function (res) {
  var n = 0;
  var timeArtAll = window.setInterval(function(){
    n++;
    if (n == 10) {
      $('#art_all_count').text(res.data.all_count);
      $('#art_day_count').text(res.data.day_count);
      clearInterval(timeArtAll);
    }
    $('#art_all_count').text(Math.ceil(res.data.all_count/10*n));
    $('#art_day_count').text(Math.ceil(res.data.day_count/10*n));
  },20);
})

// 评论数据统计
$.get('http://localhost:8000/admin/comment_count',function (res) {
  var n = 0;
  var timeComAll = window.setInterval(function(){
    n++;
    if (n == 10) {
      $('#com_all_count').text(res.data.all_count);
      $('#com_day_count').text(res.data.day_count);
      clearInterval(timeComAll);
    }
    $('#com_all_count').text(Math.ceil(res.data.all_count/10*n));
    $('#com_day_count').text(Math.ceil(res.data.day_count/10*n));
  },20);
})
