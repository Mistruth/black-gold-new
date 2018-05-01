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



function carousel_points() {
  var points = document.querySelectorAll('.carousel_points>li');
  for (var i = 0; i < points.length; i++) {
    points[i].onmouseenter = function() {
      animate(this.children[0], { top: 0 });
      animate_speed(this.children[1], { width: 265 }, 10);
      animate_speed(this.children[3].children[0], { top: 10 }, 10);
    }
    points[i].onmouseleave = function() {
      animate(this.children[0], { top: 20 });
      animate_speed(this.children[1], { width: 205 }, 10);
      animate_speed(this.children[3].children[0], { top: 50 }, 10);
    }
  }
}
carousel_points();

// function opacityChange(element, target) {

//   element.timeId = setInterval(function() {
//     var current = window.getComputedStyle(element).opacity;
//     var step = 0.5;
//     if (target == 1) {
//       step += step;
//       current += step;
//     } else if (target == 0) {
//       step += step;
//       current -= step;
//     }
//     element.style.opacity = current;
//     if (current >= 1) {
//       element.style.opacity = 1;
//       clearInterval(element.timeId);
//     } else if (current <= 0) {
//       element.style.opacity = 0;
//       clearInterval(element.timeId);
//     }
//   }, 6);
// }