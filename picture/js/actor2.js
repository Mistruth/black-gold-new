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

//=====================================================
function main_content() {
  var ps = document.querySelectorAll(".main_content1 p");
  for (var i = 0; i < ps.length; i++) {
    ps[i].onmouseover = function () {
      animate(this, {opacity: 1});
    }
    ps[i].onmouseout = function () {
      animate(this, {opacity: 0});
    }

  }

}
main_content()
//轮播图部分
//======================================================================================
//轮播图部分,点击上箭头。切换图片。
var lis = document.querySelectorAll(".uls  li");
var ul=document.querySelector(".uls");
var bigBox=document.querySelector(".zhang");
var box=document.querySelector(".carousel");
for(var i=0;i<lis.length;i++){
  lis[i].style.width=window.innerWidth+"px";
};
ul.style.width=window.innerWidth*(lis.length+10)+"px";
bigBox.style.width=window.innerWidth+"px";
box.style.width=window.innerWidth+"px";
window.onresize=function () {
  for(var i=0;i<lis.length;i++){
  lis[i].style.width=window.innerWidth+"px";
};
ul.style.width=window.innerWidth*(lis.length+10)+"px";
bigBox.style.width=window.innerWidth+"px";
box.style.width=window.innerWidth+"px";
}

var count=0;
$(function () {
  var $li=$(".uls li")
  $(".arrtop").click(function () {
    count++;
    if(count>$li.length-1){
      count=0;
      $li.eq(count).fadeIn().siblings().fadeOut();
    }else{
      $li.eq(count).fadeIn().siblings().fadeOut();
    }
    $(".cloud").stop().animate({left:count*246});
   //同步页数的转换
    $(".page").text("0"+(1+count));
  })
  //点击下箭头。切换图片。
  $(".arrdown").click(function () {
    count--;
    if(count<0){
      count=$li.length-1;
      $li.eq(count).fadeIn().siblings().fadeOut();
    }else{
      $li.eq(count).fadeIn().siblings().fadeOut();
    }
    //console.log(count);
   //同步横条
      $(".cloud").stop().animate({left:count*246});
    //同步页数。
    $(".page").text("0"+(1+count));
  })
  //点击横条切换图片。
 var $ols=$(".ols li");
  $ols.click(function () {
    //存储点击的下标
    $idx=$(this).index();
    //切换图片。
    $li.eq($idx).fadeIn().siblings().fadeOut();
    $(".cloud").stop().animate({left:$idx*246});
    $(".page").text("0"+(1+$idx));
  })
  //拖拽图片
   $(".zhang").mousedown(function () {
     $('.zhang').mousemove(function () {
      console.log("hahah");
     })
   })
  $(".zhang").mouseup(function () {
    console.log("123");
    $('.zhang').unbind("mousemove");
  })






})







//=========瀑布流开始========================
$('.fall').waterFall();
//瀑布流结束



//=========瀑布流内部区域动画效果结束========================