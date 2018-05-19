/**
 * Created by apple on 2018/5/8.
 */

;
(function() {

  var nav = document.querySelector('.news-n');
  var navs = nav.querySelectorAll('li');
  var first = new CreateNews(news);
  first.creatArea();


  for (var i = 0; i < navs.length; i++) {
    if (i === navs.length - 1) {
      var newslink = navs[i].querySelector('a');
      newslink.href = "news/news.html";
    }
    navs[i].index = i;
    navs[i].onclick = function() {
      var arr = newshome[this.index];
      var now = document.querySelector('.news-n .nav-now');
      now.className = '';
      navs[this.index].firstElementChild.className = "nav-now";
      var nownav = new CreateNews(arr);
      nownav.creatArea();
    }
  }


})();