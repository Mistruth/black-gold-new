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
  var toTop = document.querySelector('header .toTop');
  window.onscroll = function() {
    var t = this.document.body.scrollTop || this.document.documentElement.scrollTop;
    if (t > 0) {
      nav.className = 'nav container clearfix mini';
      if (t > 500) {
        animate(toTop, { opacity: 1 });
      } else {
        animate(toTop, { opacity: 0 });
      }
    } else {
      nav.className = 'nav container clearfix';
    }
  }
}

nav_scroll_move();



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
      points_animate_up(this);
    }
    lis_points[i].onmouseout = function() {
      points_animate_down(this);
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

  ul.style.width = document.documentElement.offsetWidth * (lis_Imgs.length + 1) + 'px';
  carousel_window.style.width = document.documentElement.offsetWidth + 'px';

  window.onresize = function() {
    for (var i = 0; i < lis_Imgs.length; i++) {
      lis_Imgs[i].style.width = document.documentElement.offsetWidth + 'px';
    }

    ul.style.width = document.documentElement.offsetWidth * (lis_Imgs.length + 1) + 'px';
    carousel_window.style.width = document.documentElement.offsetWidth + 'px';
  }

  for (var i = 0; i < bg_imgs.length; i++) {
    bg_imgs[i].style.backgroundImage = "url(images/bg_" + (i + 1) + ".png)";
    bg_dets[i].style.backgroundImage = "url(images/bg_" + (i + 1) + "_det.png";
  }
}
addImg();



//轮播图的动画效果
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
  var lis_points_len = lis_points.length;

  //动态创建最后一个li img
  carousel_box.appendChild(carousel_box.firstElementChild.cloneNode(true));

  //第一个li points的默认up效果
  points_animate_up(lis_points[0])


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
    animate(carousel_box, { left: -count_imgs * carousel_window.offsetWidth });
    animate(carousel_points, { left: -count_points * points_move },
      function() {
        points_animate(lis_points, count_points);
      }
    );
  }

  //给右箭头注册事件
  r_btn.onclick = function() {
    if (count_points >= lis_points.length - 3) {
      count_points = 0;
      carousel_points.style.left = -count_points * points_move + 'px';
    }
    if (count_imgs >= lis_Imgs.length - 1) {
      count_imgs = 0;
      carousel_box.style.left = 0;
    }
    count_imgs++;
    count_points++;
    animate(carousel_box, { left: -count_imgs * carousel_window.offsetWidth });
    animate(carousel_points, { left: -count_points * points_move }, function() {
      points_animate(lis_points, count_points);
    });
  }


  // 定时播放
  // setInterval(function() {
  //   r_btn.click();
  // }, 5000);



  // 给每个points注册事件
  for (var i = 0; i < lis_points_len; i++) {
    lis_points[i].index = i;
    lis_points[i].addEventListener('click', function() {

      //这里不能用i
      if (this.index >= 6) {
        count_imgs = this.index - 5;
        count_points = this.index - 5;
        carousel_box.style.left = 0 + 'px';
        carousel_points.style.left = 0 + 'px';
      } else {
        count_imgs = this.index;
        count_points = this.index;
      }
      animate(carousel_box, { left: -count_imgs * carousel_window.offsetWidth });
      animate(carousel_points, { left: -count_points * points_move }, function() {
        points_animate(lis_points, count_points);
      });
    })
  }
  //拖动轮播图，可以滑动轮播图
  // carousel_window.addEventListener('mousedown', function(e) {
  //     var spaceX = e.clientX;
  //     var current = window.getComputedStyle(carousel_box).left;
  //     current = parseInt(current);
  //     carousel_window.addEventListener('mousemove', fn(e, spaceX, current));
  //   })
  //   // hah
  // function fn(e, spaceX, current) {
  //   var spaceX = spaceX;
  //   var x = spaceX - e.clientX;
  //   var current = current;
  //   carousel_box.style.left = current - x + 'px';
  // }
  //
  //拖动轮播图，可以滑动轮播图

  carousel_window.onmousedown = function(e) {
    var spaceX = e.clientX;
    var current = parseInt(window.getComputedStyle(carousel_box).left);
    carousel_window.onmousemove = function(e) {
      var x = spaceX - e.clientX;
      carousel_box.style.left = current - x + 'px';
    }
  }
  carousel_window.addEventListener('mouseup', function(e) {
    // carousel_window.removeEventListener('mousemove', fn);
    carousel_window.onmousemove = null;
    if (e.clientX < window.innerWidth / 2) {
      r_btn.click();
    } else {
      l_btn.click();
    }
  })
}
carousel();



// 鼠标在轮播图上面移动，轮播图的背景图片有移动的效果
// function carousel_bg_move() {
//   var carousel_window = document.querySelector('.carousel_window');
//   var item_bgs = document.querySelectorAll('.item_bg');

//   carousel_window.addEventListener('mousemove', function(e) {
//     var x = e.clientX;
//     for (var i = 0; i < item_bgs.length; i++) {
//       item_bgs[i].style.backgroundPositionX = -x / 50 + 'px';
//     }
//   });
//   carousel_window.addEventListener('mouseout', function() {
//     for (var i = 0; i < item_bgs.length; i++) {
//       animate(item_bgs[i], { backgroundPositionX: 0 });
//     }
//   });
// }

// carousel_bg_move();





//点击





//num变换加载
function bg_num_run() {
  var bg_nums = document.querySelectorAll(".bg_num");
  var data = [2014, 268, 126, 470];
  window.onload = function() {
    numRunFun(bg_nums[0], 0, data[0], 40);
    numRunFun(bg_nums[1], 0, data[1], 5);
    numRunFun(bg_nums[2], 0, data[2], 2.5);
    numRunFun(bg_nums[3], 0, data[3], 10);
  }
}
bg_num_run();

/**  
 * 数字滚动  
 * @param {Object} num      开始值  
 * @param {Object} maxNum   最大值,最终展示的值  
 */
function numRunFun(element, num, maxNum, speed) {
  speed = speed || 10;
  var numText = num;
  var golb; // 为了清除requestAnimationFrame  
  function numSlideFun() {
    numText += speed; // 速度的计算可以为小数  
    if (numText >= maxNum) {
      numText = maxNum;
      cancelAnimationFrame(golb);
    } else {
      golb = requestAnimationFrame(numSlideFun);
    }
    element.innerHTML = ~~(numText)
  }
  numSlideFun();
}
// 运行  
//points动画效果封装
function points_animate_up(element) {
  animate(element.children[0], { top: 0, opacity: 1 });
  animate_speed(element.children[1], { width: 265 }, 10);
  animate_speed(element.children[3].children[0], { top: 10 }, 10);
}

function points_animate_down(element) {
  animate(element.children[0], { top: 20, opacity: 0 });
  animate_speed(element.children[1], { width: 205 }, 10);
  animate_speed(element.children[3].children[0], { top: 50 }, 10);
}
//实现整体points动画效果封装
function points_animate(element, count) {
  for (var i = 0; i < element.length; i++) {
    points_animate_down(element[i]);
  }
  points_animate_up(element[count]);
}