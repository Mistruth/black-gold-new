
function changeArrow() {
  
  var line_div=document.querySelector('.wrapper');
  var line=line_div.querySelector('.line');
////================ 注册事件
    line_div.onmouseover = function () {
      var left = this.querySelector('.left');
      var right = this.querySelector('.right');
      finalAnimate(left, {opacity: 1, right: -35});
      left.style.color = '#ad986d';
      line.style.backgroundColor = '#ad986d';
      finalAnimate(right, {opacity: 0, right: -47});
    }
    line_div.onmouseout = function () {
      var left = this.querySelector('.left');
      var right = this.querySelector('.right');
      finalAnimate(left, {opacity: 0, right: 1});
      left.style.color = '#535252';
      line.style.backgroundColor = '#535252';
      finalAnimate(right, {opacity: 1, right: -35});
    }
}
changeArrow();

//点击播放按钮  音乐播放。
var control_btn=document.querySelector('.mplayer .control_btn');
var real_music=document.querySelector('audio');
var play=$(control_btn).find('.play');
var pause=$(control_btn).find('.pause');
control_btn.onclick = function () {
  //如果音乐是暂停状态。不论是否之前有被播放过
  if (real_music.paused) {
    //让音乐播放
    real_music.play();
    //切换成暂停的按钮 i  play
    play.animate({opacity: 0, top: -6});
    pause.animate({opacity: 1, top: -1});
   
  }
  // 如果音乐正在播放，那么就暂停。
  else {
    //暂停音乐
    real_music.pause();
    //让标志 i 渐变 动画。变成播放图形。
    pause.animate({opacity: 0, top: 16});
    play.animate({opacity: 1, top: -1});
    
    
  }
}
function changeSwitch(){
  var prev=document.querySelector('.prev');
  var next=document.querySelector('.next');
  
 
  if (prev) {
    var desc_prev=prev.querySelector('.desc');
    var arrow_prev=prev.querySelector('.arrow');
    prev.onmouseenter=function(){
      finalAnimate(desc_prev,{color: '#bda77a',top:20, opacity: 1, left:20});
    
    }
    prev.onmouseleave=function(){
      finalAnimate(desc_prev,{color: '#bda77a',top:50, opacity: 0, left:0});
    }
    // $(prev).click(function () {
    //
    // })
  }
  if (next){
    var desc_next=next.querySelector('.desc');
    var arrow_next=next.querySelector('.arrow');
    next.onmouseover=function(){
      finalAnimate(desc_next,{color: '#bda77a',top:20, opacity: 1, left:0});
    
    }
    next.onmouseout=function () {
      finalAnimate(desc_next,{color: '#bda77a',top:50, opacity: 0, left:20});
    }
  }
  
}
changeSwitch();