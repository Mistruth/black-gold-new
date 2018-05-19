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
    lis_Imgs[i].style.height = document.documentElement.offsetHeight + 'px';
  }

  ul.style.width = document.documentElement.offsetWidth * (lis_Imgs.length + 1) + 'px';
  carousel_window.style.width = document.documentElement.offsetWidth + 'px';
  carousel_window.style.height = document.documentElement.offsetHeight + 'px';


  window.onresize = function() {
    for (var i = 0; i < lis_Imgs.length; i++) {
      lis_Imgs[i].style.width = document.documentElement.offsetWidth + 'px';
      lis_Imgs[i].style.height = document.documentElement.offsetHeight + 'px';

    }

    ul.style.width = document.documentElement.offsetWidth * (lis_Imgs.length + 1) + 'px';
    carousel_window.style.width = document.documentElement.offsetWidth + 'px';
    carousel_window.style.height = document.documentElement.offsetHeight + 'px';

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
  // onmousedown事件下，不要添加mouseup事件
  var spaceX;
  carousel_window.addEventListener('mousedown', function(e) {
    spaceX = e.clientX;
    var current = parseInt(window.getComputedStyle(carousel_box).left);
    carousel_window.onmousemove = function(e) {
      var x = spaceX - e.clientX;
      carousel_box.style.left = current - x + 'px';
    }
  })
  carousel_window.addEventListener('mouseup', function(e) {
    // carousel_window.removeEventListener('mousemove', fn);
    carousel_window.onmousemove = null;
    if (e.clientX - spaceX > 0) {
      l_btn.click();
    } else {
      r_btn.click();
    }
  })
}
carousel();





// scroll时轮播图的滚动

// function carousel_scroll() {
//   var carousel_window = document.querySelector('.carousel_window');
//   window.addEventListener('scroll', function() {
//       var scroll_top = this.document.documentElement.scrollTop;
//     }
//   })
// }
// carousel_scroll();

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
// window.addEventListener('scroll', function() {
//     console.log(document.documentElement.scrollTop);

//   })
// UpIn 效果
function sectionsUpIn() {
  // 黑金艺人部分
  var boxs = document.querySelectorAll('.box_wrapper .box');
  var product_btn = document.querySelectorAll('.product_btn');
  var product_h = document.querySelectorAll('.product_h');
  var product_b = document.querySelectorAll('.product_b');
  var newsMain = document.querySelectorAll('.news-main');
  var newsTop = document.querySelectorAll('.news-top');
  var musicHeader = document.querySelectorAll('section.music .header');
  var musicList = document.querySelectorAll('section.music .list');
  var musicRound = document.querySelectorAll('section.music .disc_grandparent');
  var loadNum = document.querySelector('.black_gold .bgold_t');
  var bgold_b_img = document.querySelectorAll('.bgold_b_img');
  var bgold_b_title = document.querySelectorAll('.bgold_b_title');
  var bgold_b_detail = document.querySelectorAll('.bgold_b_detail');
  var bgold_b_more = document.querySelectorAll('.bgold_b_more');
  UpIn(boxs, 520, 1100);
  UpIn(product_btn, 700, 1300);
  UpIn(product_h, 800, 1700);
  UpIn(product_b, 900, 1750);
  UpIn(newsTop, 1400, 2300);
  UpIn(newsMain, 1450, 2350);
  UpIn(musicHeader, 2100, 2750);
  UpIn(musicList, 2150, 3400);
  UpIn(musicRound, 2150, 3450);
  UpIn(bgold_b_img, 3200, 3800);
  UpIn(bgold_b_title, 3200, 3800);
  UpIn(bgold_b_detail, 3300, 3800);
  UpIn(bgold_b_more, 3400, 3800);


  // window.addEventListener('scroll', fn);

  // function fn() {
  //   var t = document.documentElement.scrollTop;
  //   if (t > 3200 && t < 3400) {
  //     bg_num_run();
  //   }
  //   setTimeout(function() {
  //     window.removeEventListener('scroll', fn);
  //   }, 500)
  // }
}
sectionsUpIn();



//产品活动 
// function productUp

//num变换加载
function bg_num_run() {
  var bg_nums = document.querySelectorAll(".bg_num");
  var data = [2014, 268, 126, 470];
  numRunFun(bg_nums[0], 0, data[0], 40);
  numRunFun(bg_nums[1], 0, data[1], 5);
  numRunFun(bg_nums[2], 0, data[2], 2.5);
  numRunFun(bg_nums[3], 0, data[3], 10);
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




function product_spe() {
  //产品活动区域 内容显示与隐藏
  var ul = document.querySelector('.product_t');
  var lis = ul.children;
  var li_cter = lis[1];
  for (var i = 0; i < 6; i++) {
    var li = li_cter.cloneNode(true);
    var img = li.querySelector('img');
    if (i == 0) {
      img.src = 'images/product' + (i + 3) + '.png';
    } else {
      img.src = 'images/product' + (i + 3) + '.jpg';
    }
    ul.appendChild(li);
  }

  for (var j = 0; j < lis.length; j++) {
    lis[j].addEventListener("mouseover", function() {
      var p = this.querySelector(".hidden");
      var span = this.querySelector(".xian");
      var div = this.querySelector(".date1");
      //var spany =this.querySelector(".product_yt1_x");
      animate(p, { opacity: 1 });
      span.style.display = "block";
      //spany.style.display="block";
      animate(span, { width: 538, opacity: 1 });
      //animate(spany,{width:538});
      animate(div, { top: 0 });

    });
    lis[j].addEventListener("mouseout", function() {
      var p = this.querySelector(".hidden");
      var span = this.querySelector(".xian");
      //var spany =this.querySelector(".product_yt1_x");
      var div = this.querySelector(".date1");
      animate(p, { opacity: 0 });
      animate(span, { opacity: 0, width: 215 });
      //animate(spany,{width:0});
      animate(div, { top: 20 });
    });
  }

  var arrows = document.querySelectorAll('.product_btn .arrow');
  var count = 0;
  arrows[1].addEventListener('click', function() {
    arrows[0].style.color = '#8b7b59';
    arrows[1].style.color = '#8b7b59';
    if (count == 5) {
      arrows[1].style.color = '#474545';
    }
    if (count == 6) {
      arrows[1].style.color = '#474545';
      return;
    }
    count++;
    animate(ul, { left: -count * 600 });
  })
  arrows[0].addEventListener('click', function() {
    arrows[0].style.color = '#8b7b59';
    arrows[1].style.color = '#8b7b59';
    if (count == 1) {
      arrows[0].style.color = '#474545';
    }
    if (count == 0) {
      arrows[0].style.color = '#474545';
      return;
    }
    count--;
    animate(ul, { left: -count * 600 });
  })



}
product_spe();



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


// liuyunliuyun
//点击list 里面的li，让当前的li 在中间 其他的li没有放大的当前效果。
//中间record 图片透明度渐进的变化。 图片切换
//调上下的按钮 disabled要变化
//音乐描述要变化

// 1.要把当时的音乐时长清零,显示时间也要清零。2。切换audio的src
//如果切换音乐，要让 显示时间 的计时器停止。让显示时间变成00：00
//图片可以回到原来位置。
//播放按钮 要变成播放键


//查找元素
function liuyun() {
  var lis = document.querySelectorAll('.music .list li');
  var li = lis[0]; //第一个音乐列表的li
  var count_music_carousel = 0; //记录是第几个li
  //得到调上下的switch元素，
  var last = document.querySelector('.music .disc_parent .switch .last i');
  var next = document.querySelector('.music .disc_parent .switch .next i');
  var real_music = document.querySelector('.music .disc .middle .control audio'); //得到音频
  var desc = document.querySelector('.disc_grandparent .description');
  var song_name = desc.querySelector('.song_name');
  var singer_name = desc.querySelector('.singer_name');
  var disc_img = document.querySelector('.music .disc img');
  var play_control = null //音乐定时器的标识。
  var imgRotate = null; //背景图片变化的 定时器 标识
  var circle_control = null; //圆环表换的定时器标识
  var time = document.querySelector('.music .disc .time .progress'); //得到显示时间
  var control_btn = document.querySelector('.music .disc .middle .control .control_btn'); //控制播放
  // var flag_playing = false;//标记音乐是否正在播放
  var play = document.querySelector('.music .disc .middle .control .play'); //得到播放按钮
  var pause = document.querySelector('.music .disc .middle .control .pause'); ////得到暂停按钮
  var dashArray = document.querySelector('.music .disc .middle svg .dash2'); //得到第二个实线环。去设置stroke-dasharray参数
  var count_circle = 0; //计数 圆环  虚线的长度
  //查找元素结束


  for (var i = 0; i < lis.length; i++) {

    lis[i].index = i;
    //设置每个li的初始top值。
    lis[i].style.top = i * li.offsetHeight + 'px';
    //给每个li设置mouseover事件
    lis[i].onmouseover = function() {
        changeCurrentStyle(this, { opacity: 1, fontSize: 46, left: 0 }, { left: 70 });

      }
      //给每个li设置mouseout事件
    lis[i].onmouseout = function() {
      //如果mouseover的li项不是当前被点中的li项，那么就取消current样式
      if (this.index != count_music_carousel) {
        changeCurrentStyle(this, { opacity: 0, fontSize: 20, left: 70 }, { left: 0 });
      }
    }

    //给每个li设置点击事件，轮播效果。
    lis[i].onclick = function() {
      //如果点击的是当前的li 那么就直接退出
      if (count_music_carousel == this.index) {
        return;
      }
      common(this.index);


      //去除掉之前的被点击的li的current样式。
      changeCurrentStyle(lis[count_music_carousel], { opacity: 0, fontSize: 20, left: 70 }, { left: 0 });
      changeCurrentStyle(this, { opacity: 1, fontSize: 46, left: 0 }, { left: 70 });
      // 如果是第一个被点击。则不需要变化top值。只需要让样式变化成 current类。
      if (this.index == 0) {
        //得到调上下的switch元素，让last按钮 禁用。
        last.className = 'disable';
      } else if (this.index == lis.length - 1) {
        //如果已经是最后一个 li项。得到调上下的switch元素，让next按钮 禁用。
        next.className = 'disable';
      } else {
        last.className = '';
        next.className = '';
        for (var j = 0; j < lis.length; j++) {
          finalAnimate(lis[j], { top: (j - this.index + 1) * li.offsetHeight }, 20);
        }
      }
      //让记录当前的li项下标变成index
      count_music_carousel = this.index;
      console.log(count_music_carousel + 'carousel');
    }
  }
  last.onclick = function() {

    //让next按钮 不禁用
    next.className = '';
    //如果当前li是第一个，那么不做事情返回
    if (count_music_carousel == 0) {
      return;
    }
    //如果当前的是第二个或者最后一个的话，按上一曲，top也不用动。只要改变样式即可。让count--
    else if (count_music_carousel == 1 || count_music_carousel == lis.length - 1) {
      //让之前的li取消掉current样式。
      changeCurrentStyle(lis[count_music_carousel], { opacity: 0, fontSize: 20, left: 70 }, { left: 0 });
      count_music_carousel--;
      changeCurrentStyle(lis[count_music_carousel], { opacity: 1, fontSize: 46, left: 0 }, { left: 70 });
      if (count_music_carousel == 0) {
        //得到调上下的switch元素，让last按钮 禁用。
        last.className = 'disable';
      }
      common(count_music_carousel);
    }
    //从第3个开始，按上一曲，top要改变，top+一个li的高度。
    else {
      //改变样式
      changeCurrentStyle(lis[count_music_carousel], { opacity: 0, fontSize: 20, left: 70 }, { left: 0 });
      count_music_carousel--;
      changeCurrentStyle(lis[count_music_carousel], { opacity: 1, fontSize: 46, left: 0 }, { left: 70 });
      //让li改变top值
      for (var i = 0; i < lis.length; i++) {
        //去掉得到的top值 单位。
        var current_top = parseInt(lis[i].style.top);
        finalAnimate(lis[i], { top: (current_top + li.offsetHeight) }, 20);
      }
      common(count_music_carousel);
    }
  }
  next.onclick = function() {
    //让last按钮 不禁用
    last.className = '';
    //如果当前li是最后一个，那么不做事情返回
    if (count_music_carousel == lis.length - 1) {
      return;
    }
    //如果当前的是倒数第二个的话，或者第一个时，按下一曲，top也不用动。只要改变样式即可。让count++
    else if (count_music_carousel == lis.length - 2 || count_music_carousel == 0) {
      //让之前的li取消掉current样式。
      changeCurrentStyle(lis[count_music_carousel], { opacity: 0, fontSize: 20, left: 70 }, { left: 0 });
      count_music_carousel++;
      changeCurrentStyle(lis[count_music_carousel], { opacity: 1, fontSize: 46, left: 0 }, { left: 70 });
      //得到调上下的switch元素，让next按钮 禁用 因为已经是最后一首。
      if (count_music_carousel == lis.length - 1) {
        next.className = 'disable';
      }
      common(count_music_carousel);
    }
    //从倒数第3个开始，按下一曲，top要改变，top-一个li的高度。
    else {
      //改变样式
      changeCurrentStyle(lis[count_music_carousel], { opacity: 0, fontSize: 20, left: 70 }, { left: 0 });
      count_music_carousel++;
      changeCurrentStyle(lis[count_music_carousel], { opacity: 1, fontSize: 46, left: 0 }, { left: 70 });
      //移动位置
      for (var i = 0; i < lis.length; i++) {
        //去掉得到的top值 单位。
        var current_top = parseInt(lis[i].style.top);
        finalAnimate(lis[i], { top: (current_top - li.offsetHeight) }, 20);
      }
      common(count_music_carousel);
    }
  }

  function changeCurrentStyle(li, obj_num, obj_desc) {
    //得到之前音乐项li的数字。
    var song_number = li.querySelector('span');
    //得到 之前音乐项li 乐名和歌手名的div元素
    var song_desc = li.querySelector('.song');
    //让数字消失。
    finalAnimate(song_number, obj_num, 20);
    //让乐名和歌手名的div元素 移动到最左
    finalAnimate(song_desc, obj_desc, 20);
  }

  //点击了播放按钮，音乐能够跟着播放。
  // 1.显示时间能够跟着变化
  // 2.圆环能够跟着变化
  // 3.播放按钮能够变成暂停按钮
  //4.唱片跟着旋转

  control_btn.onclick = function() {
    //如果音乐是暂停状态。不论是否之前有被播放过
    if (real_music.paused) {
      //让音乐播放
      real_music.play();
      //切换成暂停的按钮 i  play
      finalAnimate(play, { opacity: 0, top: -6 }, 20);
      finalAnimate(pause, { opacity: 1, top: 2 }, 20);

      //得到所播放音乐的时长  单位是秒。要取整
      var duration = Math.floor(real_music.duration);
      //让显示时间 随着音乐秒数增加，变化。
      play_control = setInterval(function() {
        //获得audio 已经播放的时长。单位是秒 要取整
        var currentTime = Math.ceil(real_music.currentTime);
        var current_minutes = '0' + Math.floor(currentTime / 60);
        var current_seconds = currentTime % 60;
        if (current_seconds < 10) {
          current_seconds = '0' + current_seconds;
        }
        time.innerText = current_minutes + ':' + current_seconds;
        //如果音乐已经到最后一秒了。那么就停止计时器。背景图片不旋转，圆环完整了
        if (currentTime == duration) {
          clearInterval(play_control);
        }
      }, 1000);
      imgRotate = setInterval(function() {
        var currentTime = real_music.currentTime;
        if (currentTime == duration) {
          clearInterval(imgRotate);
        }
        var interval_img = Math.floor(currentTime / duration * 360);
        // disc_img.style.transform = 'rotate(' + (interval_img) + 'deg)';
        disc_img.style.transform = 'rotate(' + (currentTime) + 'deg)';
      }, 5);
      //得到圆环定时器的间隔时间。单位是毫秒，所以要*1000.因为和音乐的时长成比例变化
      var interval = duration / (2 * Math.PI * 130) * 2.3 * 1000;

      circle_control = setInterval(function() {

        count_circle++;
        dashArray.style['stroke-dasharray'] = (count_circle * 2.3) + " 999";
      }, interval);
    }
    /* // 如果音乐已经播放过，但是处于暂停状态，那么就继续播放。
    else if(currentTime>0&&real_music.paused){
      real_music.play();
    }*/
    // 如果音乐正在播放，那么就暂停。
    else {
      //暂停音乐
      real_music.pause();
      //停止时间变化。圆环变化。背景图旋转变化。
      clearInterval(imgRotate);
      clearInterval(play_control);
      clearInterval(circle_control);
      //让标志 i 渐变 动画。变成播放图形。
      finalAnimate(pause, { opacity: 0, top: 10 }, 20);
      finalAnimate(play, { opacity: 1, top: 2 }, 20);

    }
  }

  function common(index) {
    //将当前的music信息对象存到curLi里面
    var curLi = musicList[index];
    //切换audio的src
    real_music.src = curLi.src;
    animate(disc_img, { opacity: 0.6 }, function() {
        //换背景图片
        disc_img.src = curLi.bgImg;
        //让背景图片回正
        disc_img.style.transform = 'rotate(0deg)';
        //让背景图片渐进显示出来
        animate(disc_img, { opacity: 1 });
      })
      //让显示时间变成初始的0
    time.innerText = '00:00';
    //让播放按钮变成播放状态
    finalAnimate(pause, { opacity: 0, top: 10 }, 20, function() {
      finalAnimate(play, { opacity: 1, top: 2 }, 20);
    })

    //停止显示时间的动画。play_control
    clearInterval(play_control);
    clearInterval(imgRotate);
    clearInterval(circle_control);
    //让圆环回到原位
    count_circle = 0;
    dashArray.style['stroke-dasharray'] = count_circle * 2.3 + " 999";
    //切换音乐描述
    song_name.innerText = curLi.name;
    singer_name.innerText = curLi.singer;
  }
}
liuyun();

// var interval_img=Math.floor(currentTime/duration*360);
//             disc_img.style.transform = 'rotate(' + (interval_img) + 'deg)';


function qr() {
  //二维码开始
  var erWeiMa = document.querySelector(".erweima");
  var erWeiMa_a = document.querySelector(".erweima_a");
  var erWeiMa_box = document.querySelector(".erweima_box");
  // console.log(erWeiMa_box);
  //设置大盒子的高度
  var erWeiMa_height = window.innerHeight;
  erWeiMa.style.height = erWeiMa_height + 'px';

  erWeiMa_a.addEventListener("click", function(e) {
    erWeiMa.style.display = "block";
    e.stopPropagation();
  });

  document.addEventListener("click", function() {
    erWeiMa.style.display = "none";
  });

  erWeiMa_box.addEventListener("click", function(e) {
    e.stopPropagation();
  });
  //二维码结束
}
qr();