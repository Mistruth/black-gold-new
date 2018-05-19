//-----------------头部 开始-----------------


//移动至导航的，三角形移动功能
function nav_angle_move() {
  var nav_lis = document.querySelectorAll('.nav_list>li');
  var nav_arrow = document.querySelector('.nav_list .nav_arrow');
  var position = nav_lis[0].offsetWidth / 2 - nav_arrow.offsetWidth / 2;
  var moveLeft = position;
  for (var i = 0; i < nav_lis.length; i++) {
    nav_lis[i].onmouseover = function () {
      moveLeft = this.offsetLeft + this.offsetWidth / 2 - nav_arrow.offsetWidth / 2
      animate(nav_arrow, {left: moveLeft});
    }
    nav_lis[i].onmouseout = function () {
      animate(nav_arrow, {left: position});
    }
    if (i == 0 || i == 3) {
      nav_lis[i].onclick = function () {
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
    sub_lis[i].onclick = function () {
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
  var toTop = document.querySelector('header .toTop');
  window.addEventListener('scroll', function () {
    var t = this.document.body.scrollTop || this.document.documentElement.scrollTop;
    if (t > 0) {
      nav.className = 'nav container clearfix mini';
      if (t > 500) {
        toTop.style.display = 'block';
        animate(toTop, {opacity: 1});
      } else {
        toTop.style.display = 'none';
      }
    } else {
      nav.className = 'nav container clearfix';
    }
  })
}

nav_scroll_move();


//点击搜索按钮 顶部消失，切换成搜索框
function nav_search_click() {
  var nav_search = document.querySelector('.nav_search');
  var nav_others = document.querySelector('.nav_others');
  var nav_list = document.querySelector('.nav_list');
  var newsearch = document.querySelector('.newsearch');
  var newsearch_ico = document.querySelector('.newsearch i');
  nav_search.addEventListener('click', function () {
    for (var i = 0; i < nav_others.children.length; i++) {
      animate(nav_others.children[i], {opacity: 0});
    }
    for (var i = 0; i < nav_list.children.length; i++) {
      animate(nav_list.children[i], {opacity: 0});
    }
    animate_speed(newsearch, {left: 300, opacity: 1}, 15, 15);
  });

  newsearch_ico.addEventListener('click', function () {
    animate(newsearch, {opacity: 0}, function () {
      newsearch.style.left = '550px';
    })
    for (var i = 0; i < nav_others.children.length; i++) {
      animate(nav_others.children[i], {opacity: 1});
    }
    for (var i = 0; i < nav_list.children.length; i++) {
      animate(nav_list.children[i], {opacity: 1});
    }
  });
}
nav_search_click();

//-----------------头部 结束-----------------


//-----------------banner 开始-----------------
var right = document.querySelector(".bi-right");
var left = document.querySelector(".bi-left");
var banner_bigbox = document.querySelector(".banner_bigbox");
var lis = banner_bigbox.children;
var banner = document.querySelector(".banner");
var banner_icon = document.querySelector(".banner-icon");
var banner = document.querySelector(".banner");
var cs = document.querySelector(".cs");

var count = 0
var timeId;

//右箭头按钮滚动图片
right.onclick = function (e) {
  e.stopPropagation();
  if (count >= lis.length - 1) {
    count = 0;
    banner_bigbox.style.left = 0;
  }
  count++;
  animate2(banner_bigbox, -count * 1920);
}

//左箭头滚动图片
left.onclick = function (e) {
  e.stopPropagation();
  if (count <= 0) {
    count = lis.length - 1;
    banner_bigbox.style.left = -count * 1920 + "px";
  }
  count--;
  animate2(banner_bigbox, -count * 1920);
}

//自动播放图片
var timeId;
timeId = setInterval(function () {
  right.click();
}, 3000);

cs.addEventListener("mouseover",function () {
  clearInterval(timeId);
});

cs.addEventListener("mouseout",function () {
  timeId = setInterval(function () {
    right.click();
  }, 3000);
});

banner.addEventListener("mouseover",function () {
  clearInterval(timeId);
});

banner.addEventListener("mouseout",function () {
  timeId = setInterval(function () {
    right.click();
  }, 3000);
});


//拖拽滚动图片
var d = 0;
var u = 0;
cs.addEventListener("mousedown", function (event) {
  d = event.pageX;
  var current = parseInt(window.getComputedStyle(banner_bigbox).left);
  console.log(current);
  cs.onmousemove = function (e) {
    var x = d - e.pageX;
    console.log(x);
    banner_bigbox.style.left = current - x + "px";
  }

});

cs.addEventListener("mouseup", function (event) {
  u = event.pageX;
  cs.onmousemove = null;
  if (d < u) {
    left.click();
  } else {
    right.click();
  }
});


//-----------------banner 结束-----------------


//-----------------回到顶部icon 开始-----------------
function toTopMove() {
  var toTop = document.querySelector('.toTop');
  var timeId = null;
  toTop.addEventListener('click', function () {
    if (timeId) {
      clearInterval(timeId);
    }
    timeId = setInterval(function () {
      var current = document.body.scrollTop || document.documentElement.scrollTop;
      var step = 20;
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

//-----------------回到顶部icon 结束-----------------