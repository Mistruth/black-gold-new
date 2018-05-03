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


//屏幕滚动后，导航变小
function nav_scroll_move() {
  var nav = document.querySelector('.nav');
  window.onscroll = function() {
    var t = this.document.body.scrollTop || this.document.documentElement.scrollTop;
    if (t > 0) {
      nav.className = 'nav container clearfix mini';
    } else {
      nav.className = 'nav container clearfix';
    }
  }
}

nav_scroll_move();




//轮播图下面points详情的动画效果
function carousel_points() {
  var carousel_points = document.querySelector('.carousel_points');
  var carousel_window = document.querySelector('.carousel_window');
  var carousel_box = document.querySelector('.carousel_window .carousel_box');
  var lis_points = carousel_points.children;
  var lis_Imgs = carousel_box.children;
  for (var i = 0; i < 3; i++) {
    carousel_points.appendChild(lis_points[i].cloneNode(true));
  }

  for (var i = 0; i < lis_points.length; i++) {
    lis_points[i].onmouseover = function() {
      animate(this.children[0], { top: 0, opacity: 1 });
      animate_speed(this.children[1], { width: 265 }, 10);
      animate_speed(this.children[3].children[0], { top: 10 }, 10);
    }
    lis_points[i].onmouseout = function() {
      animate(this.children[0], { top: 20, opacity: 0 });
      animate_speed(this.children[1], { width: 205 }, 10);
      animate_speed(this.children[3].children[0], { top: 50 }, 10);
    }
  }
}
carousel_points();


//给轮播图增加图片
function addImg() {
  var ul = document.querySelector('.carousel_window .carousel_box');
  var bg_imgs = document.querySelectorAll('.item_bg');
  var bg_dets = document.querySelectorAll('.item_det');
  var carousel_window = document.querySelector('.carousel_window');
  var carousel_box = document.querySelector('.carousel_window .carousel_box');
  var lis_points = carousel_points.children;
  var lis_Imgs = carousel_box.children;

  for (var i = 0; i < lis_Imgs.length; i++) {
    lis_Imgs[i].style.width = document.documentElement.offsetWidth + 'px';
  }

  ul.style.width = document.documentElement.offsetWidth * lis_Imgs.length + 'px';
  carousel_window.style.width = document.documentElement.offsetWidth + 'px';

  window.onresize = function() {
    for (var i = 0; i < lis_Imgs.length; i++) {
      lis_Imgs[i].style.width = document.documentElement.offsetWidth + 'px';
    }

    ul.style.width = document.documentElement.offsetWidth * lis_Imgs.length + 'px';
    carousel_window.style.width = document.documentElement.offsetWidth + 'px';

  }

  for (var i = 0; i < bg_imgs.length; i++) {
    bg_imgs[i].style.backgroundImage = "url(images/bg_" + (i + 1) + ".png)";
    bg_dets[i].style.backgroundImage = "url(images/bg_" + (i + 1) + "_det.png";
  }
}
addImg();



//轮播图切换的动画效果
function carousel() {
  var l_btn = document.querySelector('.points_larrow');
  var r_btn = document.querySelector('.points_rarrow');
  var count_imgs = 0;
  var count_points = 0;
  var carousel_points = document.querySelector('.points_window .carousel_points');
  var points_move = 465;
  var carousel_window = document.querySelector('.carousel_window');
  var carousel_box = document.querySelector('.carousel_window .carousel_box');
  var lis_points = carousel_points.children;
  var lis_Imgs = carousel_box.children;

  //动态创建最后一个li img
  carousel_box.appendChild(carousel_box.firstElementChild.cloneNode(true));

  //给左箭头注册事件
  l_btn.onclick = function() {
    if (count_points <= 0) {
      count_points = lis_points.length - 3; //因为多加了三个克隆的points
      carousel_points.style.left = -count_points * points_move + 'px';
    }
    if (count_imgs <= 0) {
      count_imgs = lis_Imgs.length - 1;
      carousel_box.style.left = -count_imgs * carousel_window.offsetWidth + 'px';
    }
    count_imgs--;
    count_points--;
    animate_speed(carousel_box, { left: -count_imgs * carousel_window.offsetWidth }, 15);
    animate_speed(carousel_points, { left: -count_points * points_move }, 15);

    // lis_points.
  }


  //给右箭头注册事件
  r_btn.onclick = function() {
    if (count_points >= lis_points.length - 3) {
      count_points = 0;
      carousel_points.style.left = -count_points * points_move + 'px';
    }
    if (count_imgs >= lis_Imgs.length - 1) {
      count_imgs = 0;
      carousel_box.style.left = -count_imgs * carousel_window.offsetWidth + 'px';
    }
    count_imgs++;
    count_points++;
    animate_speed(carousel_box, { left: -count_points * carousel_window.offsetWidth }, 15);
    animate_speed(carousel_points, { left: -count_points * points_move }, 15);
  }

  //给每个points注册事件




}
carousel();



//第一个points具有onmouseover的效果
// function firstEmerge() {
// }