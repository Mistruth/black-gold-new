//移动至导航的，三角形移动功能
function nav_angle_move() {
  var nav_lis = document.querySelectorAll('.nav_list>li');
  var nav_arrow = document.querySelector('.nav_list .nav_arrow');
  var position = nav_lis[0].offsetWidth / 2 - nav_arrow.offsetWidth / 2;
  var moveLeft = position;
  for (var i = 0; i < nav_lis.length; i++) {
    nav_lis[i].onmouseover = function() {
      moveLeft = this.offsetLeft + this.offsetWidth / 2 - nav_arrow.offsetWidth / 2
      animate(nav_arrow, { left: moveLeft });
    }
    nav_lis[i].onmouseout = function() {
      animate(nav_arrow, { left: position });
    }
    if (i == 0 || i == 3) {
      nav_lis[i].onclick = function() {
        position = moveLeft;
        for (var i = 0; i < nav_lis.length; i++) {
          nav_lis[i].className = '';
        }
        this.className = 'current';
      }
    }
  }
  var sub_lis = document.querySelectorAll('.nav_sbnav li');
  for (var i = 0; i < sub_lis.length; i++) {
    sub_lis[i].onclick = function() {
      for (var i = 0; i < nav_lis.length; i++) {
        var nav_li = nav_lis[i];
        nav_li.className = '';
      }
      this.parentNode.parentNode.className = 'current';
      position = moveLeft;
    }
  }
}
nav_angle_move();


//屏幕滚动后，导航变小 回到顶部模块出现
function nav_scroll_move() {
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function() {
    var t = document.documentElement.scrollTop;
    if (t > 0) {
      nav.className = 'nav container clearfix mini';
    } else {
      nav.className = 'nav container clearfix';
    }
  })
}
nav_scroll_move();

function toTop_scroll() {
  var toTop = document.querySelector('header .toTop');
  window.addEventListener('scroll', function() {
    var t = document.documentElement.scrollTop;
    if (t > 500) {
      toTop.style.display = 'block';
    } else {
      toTop.style.display = 'none';
    }
  })
}
toTop_scroll();



//点击搜索按钮 顶部消失，切换成搜索框
function nav_search_click() {
  var nav_search = document.querySelector('.nav_search');
  var nav_others = document.querySelector('.nav_others');
  var nav_list = document.querySelector('.nav_list');
  var newsearch = document.querySelector('.newsearch');
  var newsearch_ico = document.querySelector('.newsearch i');
  nav_search.addEventListener('click', function() {
    for (var i = 0; i < nav_others.children.length; i++) {
      animate(nav_others.children[i], { opacity: 0 });
    }
    for (var i = 0; i < nav_list.children.length; i++) {
      animate(nav_list.children[i], { opacity: 0 });
    }
    animate_speed(newsearch, { left: 300, opacity: 1 }, 15, 15);
  });

  newsearch_ico.addEventListener('click', function() {
    animate(newsearch, { opacity: 0 }, function() {
      newsearch.style.left = '550px';
    })
    for (var i = 0; i < nav_others.children.length; i++) {
      animate(nav_others.children[i], { opacity: 1 });
    }
    for (var i = 0; i < nav_list.children.length; i++) {
      animate(nav_list.children[i], { opacity: 1 });
    }
  });
}
nav_search_click();

// totop 回到顶部
function toTopMove() {
  var toTop = document.querySelector('.toTop');
  var timeId = null;
  toTop.addEventListener('click', function() {
    if (timeId) {
      clearInterval(timeId);
    }
    timeId = setInterval(function() {
      var current = document.body.scrollTop || document.documentElement.scrollTop;
      var step = 30;
      var target = 0;
      if ((current - target) < step) {
        clearInterval(timeId);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
      }
      current -= step;
      // window.pageYOffset = current;
      document.documentElement.scrollTop = current;
    })
  }, 5)
}
toTopMove();