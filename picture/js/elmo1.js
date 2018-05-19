//移动至导航的，三角形移动功能
function nav_angle_move() {
  var nav_lis = document.querySelectorAll('.nav_list>li');
  var nav_arrow = document.querySelector('.nav_list .nav_arrow');
  var position = 280;
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

function toTopMove() {
  var toTop = document.querySelector('.toTop');
  var timeId = null;
  toTop.addEventListener('click', function() {
    if (timeId) {
      clearInterval(timeId);
    }
    timeId = setInterval(function() {
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
//=============艺人图集开始========================================



// 动态创建li
(function() {
  var data = [{
    text: '「The One That Ran Away」',
    subText: '尚雯婕－LAURE SHANG',
    img: 'images/shang1.jpg'
  }, {
    img: 'image/8.jpg'
  }, {
    img: 'image/3.jpg'
  }, {
    img: 'image/4.jpg'
  }, {
    img: 'image/5.jpg'
  }, {
    img: 'image/6.jpg'
  }, {
    img: 'image/7.jpg'
  }, {
    img: 'image/8.jpg'
  }, {
    img: 'image/9.jpg'
  }, {
    img: 'image/10.jpg'
  }, {
    img: 'image/11.jpg'
  }, {
    img: 'image/12.jpg'
  }, {
    img: 'image/13.jpg'
  }, {
    img: 'image/14.jpg'
  }, {
    img: 'image/15.jpg'
  }, {
    img: 'image/16.jpg'
  }, {
    img: 'image/17.jpg'
  }, {
    img: 'image/18.jpg'
  }, {
    img: 'image/19.jpg'
  }, {
    img: 'image/20.jpg'
  }, {
    img: 'image/21.jpg'
  }, {
    img: 'image/22.jpg'
  }, {
    img: 'image/23.jpg'
  }, {
    img: 'image/24.jpg'
  }]

  var target = document.querySelector('.main_content1')
  waterFall(4, data, 286, target);
  window.addEventListener('scroll', function() {
    var uls = this.document.querySelectorAll('.main_content1 ul');
    var t = window.pageYOffset;
    //console.log(t);
    var e = this.window.innerHeight;
    //console.log(e);

    var minHeight = uls[getUlMin(4, target)].offsetHeight;

    //console.log(minHeight);
    if (t + e > minHeight) {
      creatRow(4, data, 286, target);
    }

  })


  function waterFall(col, data, width, target) {
    for (var i = 0; i < col; i++) {
      var ul = document.createElement('ul');
      ul.style.width = width + 'px';
      target.appendChild(ul);
    }
    creatRow(col, data, width, target);
    window.addEventListener('load', function() {
      creatRow(col, data, width, target);
    });
  }

  function creatRow(col, data, width, target) {
    var uls = target.querySelectorAll('.main_content1 ul');
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      var div = document.createElement('div');
      var p = document.createElement('p');
      li.style.marginTop = '10px';
      li.style.marginBottom = '10px';
      li.appendChild(img);
      li.appendChild(div);
      li.appendChild(p);
      img.style.width = width + 'px';
      img.src = data[i].img;
      div.innerText = data[0].text;
      p.innerText = data[0].subText;
      div.style.height = '30px';
      uls[getUlMin(col, target)].appendChild(li);
    }
  }


  function getUlMin(col, target) {
    var uls = target.querySelectorAll('.main_content1 ul');
    var index = 0;
    var min = uls[0].offsetHeight;
    for (var i = 0; i < col; i++) {
      // console.log(uls[i].offsetHeight);
      if (uls[i].offsetHeight < min) {
        min = uls[i].offsetHeight;
        index = i;
      }
    }
    return index;
  }

  var f_li = document.querySelector(".main_content1 ul li");
  f_li.addEventListener("click", function() {
    window.location.href = 'actor2.html';
  })
  var s_ul = document.querySelectorAll(".main_content1 ul")[1];
  var s_li = s_ul.querySelectorAll("li")[0];
  s_li.addEventListener("click", function() {
    window.location.href = 'actor_hou.html';
  })
})();