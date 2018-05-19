//移动至导航的，三角形移动功能
function nav_angle_move() {
    var nav_lis = document.querySelectorAll('.nav_list>li');
    var nav_arrow = document.querySelector('.nav_list .nav_arrow');
    var position = nav_lis[0].offsetWidth / 2 - nav_arrow.offsetWidth / 2;
    var moveLeft = position;
    for (var i = 0; i < nav_lis.length; i++) {
        nav_lis[i].onmouseover = function () {
            moveLeft = this.offsetLeft + this.offsetWidth / 2 - nav_arrow.offsetWidth / 2
            animate(nav_arrow, { left: moveLeft });
        }
        nav_lis[i].onmouseout = function () {
            animate(nav_arrow, { left: position });
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
        }
    }
}
nav_angle_move();


//屏幕滚动后，导航变小
function nav_scroll_move() {
    var nav = document.querySelector('.nav');
    window.onscroll = function () {
        var t = this.document.body.scrollTop || this.document.documentElement.scrollTop;
        if (t > 0) {
            nav.className = 'nav container clearfix mini';
        }
       else {
            nav.className = 'nav container clearfix';
        }
    }
}
nav_scroll_move();
//=============艺人图集开始========================================
function gd() {
  //找到所有头部标签
  var title=document.querySelectorAll(".main_content .title");
  //找到所有底部的标签
  var subtitle=document.querySelectorAll(".main_content .subtitle");
  //找到所有的li，并且给每个li注册mouseover事件
  var lis=document.querySelectorAll(".main_content li");
  for(var i=0;i<lis.length;i++){

    lis[i].addEventListener("mouseover",function () {
      animate(this.children[1],{opacity:1});
      animate(this.children[2],{opacity:1});

    })
    //给每个li注册mouseout事件
    lis[i].addEventListener("mouseout",function () {
      animate(this.children[1],{opacity:0});
      animate(this.children[2],{opacity:0});


    })
  }
}
gd();
//=============艺人图集结束========================================