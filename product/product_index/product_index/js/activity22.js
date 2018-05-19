//移动至导航的，三角形移动功能
function nav_angle_move() {
  var nav_lis = document.querySelectorAll('.nav_list>li');
  var nav_arrow = document.querySelector('.nav_list .nav_arrow');
  var position = 138;
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


//产品活动头部区域开始

var newsTop = document.querySelector('.top');
var newsTopW = document.querySelector('.top-wrap');

var newsTop1 = document.querySelector('.top .top-1');
var newsTop2 = document.querySelector('.top .top-2');
var newsTopLeft = document.querySelector('.top .top-2-left');
//newsTop2.style.marginTop = newsTop1.offsetHeight+'px';
document.addEventListener("scroll", function() {
  var scrollTop = window.pageYOffset;
  if (scrollTop > 0) {
    animate(newsTop2, { height: 22 });
    animate(newsTopW, { height: 300 });
    newsTopLeft.style.top = 0;
  }
  if (scrollTop > 310) {
    animate(newsTop2, { height: 0 });
    animate(newsTopW, { height: 295 });
    newsTopLeft.style.top = 0;
  }
  if (scrollTop <= 0) {
    animate(newsTop2, { height: 130 });
    animate(newsTopW, { height: 425 });
    newsTopLeft.style.top = -10 + 'px';
  }
  if (scrollTop >= 303) {
    animate(newsTop2, { height: 22 });
    animate(newsTopW, { height: 300 });
    newsTopLeft.style.top = 0;
  }
});
//产品活动头部区域结束












//产品活动区域开始
//找对象

var product = document.querySelector('.product_t1 ul');
var mainBox = product.firstElementChild;


//自动生成li及里面的内容
function creatbox() {
  for (var i = 1; i < arr1.length; i++) {
    var box = mainBox.cloneNode(true);
    if (arr1[i].id <= 3) {
      if (arr1[i].id == 2) {
        box.style.marginLeft = 20 + 'px';
      } else if (arr1[i].id == 3) {
        box.style.marginLeft = 610 + 'px';
      }
    } else {
      box.style.marginLeft = arr1[i].id % 2 == 1 ? 20 + 'px' : 0;
    }
    product.appendChild(box);
    box.style.marginBottom = 80 + 'px';
    var img = box.querySelector('img');
    var p1 = box.querySelector('.wrapper_1');
    var p2 = box.querySelector('.wrapper_2');
    if (arr1[i].id == 2) {
      p2.className = '.wrapper_2 lh63'
    }
    if (arr1[i].id > 3) {
      var num = box.querySelector(".wrap_date1 .m");
      num.innerText = '10';
      var year = box.querySelector(".wrap_date1 .year");
      year.innerText = '2017';

    }
    //文本内容
    var p3 = box.querySelector('.wrapper_4');
    var p4 = box.querySelector('.description');
    var p5 = box.querySelector('.wrapper_5');
    var date1 = box.querySelector('.wrap_date .m');
    var date2 = box.querySelector('.wrap_date .year');
    var link = box.querySelector("a");
    img.src = "imgs/" + arr1[i].img;
    p1.innerText = arr1[i].p1;
    p2.innerText = arr1[i].p2;
    p3.innerText = arr1[i].p3;
    p4.innerText = arr1[i].p4;
    p5.innerText = arr1[i].p5;
    date1.innerText = arr1[i].date1;
    date2.innerText = arr1[i].date2;
    link.href = arr1[i].link;
  }
}
creatbox();
//onmouseover事件
var product_img1s = document.querySelectorAll(".product_img1");
for (var i = 0; i < product_img1s.length; i++) {
  product_img1s[i].onmouseover = function() {
      //图片放大
      var img = this.querySelector("img");
      img.style.transform = 'scale(1.1)';
      img.style.transition = 'all 0.6s';
      //隐藏黄盒子
      var div = this.querySelector(".dynamic");
      animate_teacher(div, { opacity: 1 });
      //隐藏内容翻转显示
      var p = this.querySelector(".wrapper_5");
      p.style.overflow = "visible";
      animate_teacher(p, { height: 18 });
      //隐藏显示线条
      var xian = this.querySelector(".xian");
      xian.style.display = "block";
      animate(xian, { width: 530 });
      //翻转日期
      var date1 = this.querySelector(".wrap_date1");
      animate(date1, { top: 0 });
      //左边框
      var line1 = this.querySelector(".line1");
      line1.style.display = "block";
      animate(line1, { height: 276 });
      //上边框
      var line2 = this.querySelector(".line2");
      line2.style.display = "block";
      //右短边框
      var line5 = this.querySelector(".line5");
      animate(line2, { width: 590 }, function() {
        line5.style.display = "block";
        animate(line5, { height: 66 });
      });
      //右边框
      var line3 = this.querySelector(".line3");
      line3.style.display = "block";
      animate(line3, { height: 210 });
      //左短边框
      var line4 = this.querySelector(".line4");
      line4.style.display = "block";
      animate(line4, { height: 66 });


    }
    //onmouseout事件
  product_img1s[i].onmouseout = function() {
    //图片放大
    var img = this.querySelector("img");
    img.style.transform = 'scale(1)';
    img.style.transition = 'all 0.6s';
    //隐藏黄盒子
    var div = this.querySelector(".dynamic");
    animate_teacher(div, { opacity: 0 });
    //隐藏内容翻转显示
    var p = this.querySelector(".wrapper_5");
    animate_teacher(p, { height: 0 });
    p.style.overflow = "hidden";
    //隐藏显示线条
    var xian = this.querySelector(".xian");
    xian.style.display = "block";
    animate(xian, { width: 0 });
    //翻转日期
    var date1 = this.querySelector(".wrap_date1");
    animate(date1, { top: 20 });
    //左边框
    var line1 = this.querySelector(".line1");
    line1.style.display = "block";
    animate(line1, { height: 0 });
    //上边框
    var line2 = this.querySelector(".line2");
    line2.style.display = "block";
    //右短边框
    var line5 = this.querySelector(".line5");
    animate(line2, { width: 0 });
    animate(line5, { height: 0 });
    //右边框
    var line3 = this.querySelector(".line3");
    line3.style.display = "block";
    animate(line3, { height: 0 });
    //左短边框
    var line4 = this.querySelector(".line4");
    line4.style.display = "block";
    animate(line4, { height: 0 });
  }
}


//隐藏盒子
var divs = document.querySelectorAll(".dynamic");
for (var i = 0; i < divs.length; i++) {
  divs[i].addEventListener("mouseover", function() {
    animate_teacher(this, { opacity: 1 });
  });
  divs[i].addEventListener("mouseout", function() {
    animate_teacher(this, { opacity: 0 });
  });
}