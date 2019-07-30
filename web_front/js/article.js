getCategory();


// 获得文章类别
function getCategory() {
  $.getJSON('http://localhost:8000/admin/category_search',function(res) {
    if(res.code === 200) {
      // 正确返回后设置文章详细内容
      console.log(res);
      toDetail(res.data);
    }
  });
}

// 调用文章详细内容接口，将返回数据生成html插入页面
function toDetail(cateData) {
  var id = window.location.search.substr(4);
  axios.get('http://localhost:8000/admin/search', {
    params: {
      id: id
    }
  }).then(function (response) {
    // console.log(response);
    var data = response.data.data;
    var cateName = '';
    for(var i = 0;i<cateData.length; i++) {
      if(cateData[i].id == data.type) {
        cateName = cateData[i].name;
        break;
      }
    }
    console.log(cateName);
    var detailHtmlString = `
    <h3 class="article_title">${data.title}</h3>
    <div class="article_info">${data.author} 发布于 ${data.date}&nbsp;&nbsp;&nbsp;分类: ${cateName}&nbsp;&nbsp;&nbsp;阅读:
        (${data.read})&nbsp;&nbsp;&nbsp;评论: (${data.comment})</div>
    <div class="article_con">
    ${data.content}
    </div>
    `
    $('#breadcrumb').after(detailHtmlString);

  });
}