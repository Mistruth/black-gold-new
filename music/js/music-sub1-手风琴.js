//当点击了li  让音乐播放。 就让当前li 的外盒高度变高，再让current结构的li top边0；
//如果点击的li是在当前current的下面。那么是 从下往上出现fadeIN。top减小。  当前的li fadeOut。且top是负的。
//如果点击的li是在 当前 的  上面。。那么是从上面 往下出现。top原本是负的。。top就要增加


//1.要让页面的第一个li 是current在上面   初始化
//2.现在是current li 下面有 audio。
var count_playing = 0;//拥有current 样式的li  正在播放音乐的所在li 索引

var ul_musicList = document.querySelector('.music_list ul');
//首先产生一个用来克隆的普通结构 li
var normalLiForClone = document.createElement('li');
//给普通克隆节点  赋值 结构
normalLiForClone.innerHTML = "<div class='item_box'>\n" +
  "          <div class='mplayer'>\n" +
  "            <div class='control_btn control'>\n" +
  // "              <audio src='http://heijin.jsmo.xin/templates/music/YouMeanEverythingToMe.mp3'></audio>\n" +
  "              <i class='play'></i>\n" +
  "              <i class='pause'></i>\n" +
  "            </div>\n" +
  "          </div>\n" +
  "          <div class='timer'>\n" +
  "            <span class='time'>00:00</span>\n" +
  "            <span>/</span>\n" +
  "            <span>03:30</span>\n" +
  "            <div></div>\n" +
  "            <i class='left'> > </i>\n" +
  "            <i class='right'>> </i>\n" +
  "          </div>\n" +
  "          <div class='item_title'>\n" +
  "            <p>You Mean EveryThing To Me</p>\n" +
  "            <P>侯明昊</P>\n" +
  "          </div>\n" +
  "        </div>";
//再产生一个用来克隆的  current 结构   li
var currentLiForClone = document.createElement('li');
//给currentLi克隆节点  赋值 结构
currentLiForClone.innerHTML = "<div class='item_box'>\n" +
  "          <div class='record'>\n" +
  "            <div class='img'>\n" +
  "              <img src='images/song_02.jpg' alt=''>\n" +
  "              <div class='control_btn_current control'>\n" +
  "                <audio src='http://heijin.jsmo.xin/templates/music/12am.mp3'></audio>\n" +
  "                <i class='play'></i>\n" +
  "                <i class='pause'></i>\n" +
  "              </div>\n" +
  "            </div>\n" +
  "          </div>\n" +
  "          <div class='timer'>\n" +
  "            <!--<a href=\"\"></a>-->\n" +
  "            <span class='time'>00:00</span>\n" +
  "            <span>/</span>\n" +
  "            <span>04:58</span>\n" +
  "            <div></div>\n" +
  "            <i class='left'> > </i>\n" +
  "            <i class='right'>> </i>\n" +
  "          </div>\n" +
  "          <div class='item_title'>\n" +
  "            <p>12 am</p>\n" +
  "            <P>曾舜晞</P>\n" +
  "          </div>\n" +
  "          <div class='desc'>\n" +
  "            <i>/</i>\n" +
  "            <span>尚雯婕亲自包揽词曲创作，英国电子音乐人Anu Pillai担纲编曲。</span>\n" +
  "          </div>\n" +
  "        </div>";

function createList(data) {
  //每个li下面都要有一个普通结构li。一个current结构li。
  var li = null;
  var ul=null;
  var normalLi=null;
  var currentLi=null;
  for (var i=0;i<data.length;i++){
    li = $('<li></li>');
    ul=$('<ul></ul>');
    ul.addClass('small_ul');
    li.append(ul);
    //创建普通结构li
    normalLi=normalLiForClone.cloneNode(true);
    $(normalLi).addClass('normal');
    initCommon(normalLi,data[i]);
    //创建current结构li
    currentLi=currentLiForClone.cloneNode(true);
    //给current结构添加 current样式
    $(currentLi).addClass('current');
    //给current添加实际内容
    initCurrent(currentLi,data[i]);
    initCommon(currentLi,data[i]);
    ul.append($(normalLi));
    ul.append($(currentLi));
    $(ul_musicList).append(li);
  }
  changeArrow();
  play_click(data);
}
function initCommon(li, currentData) {
  var name = li.querySelectorAll('.item_title p')[0];
  var singer = li.querySelectorAll('.item_title p')[1];
  var time = li.querySelectorAll('.timer span')[2];
  //如果li下面有audio元素的话，那么就给设置audio属性
  if (li.querySelector('audio')){
    var audio = li.querySelector('audio');
    audio.src = currentData.src;
  }
  name.innerText = currentData.name;
  singer.innerText = currentData.singer;
  time.innerText = currentData.time;
}
function initCurrent(li, currentData) {
  
  var img = li.querySelector('.img img');
  img.src = currentData.bgImg;
  var desc = li.querySelector('.desc span');
  desc.innerText = currentData.desc;
  // 给current li 加上current的类名。有current的样式
  li.className = 'current';
}

//1==========================================================分页1的效果 ---------    1    -----按  nav 上的   歌手名 nav的current变化了   列表也变化了============
function play_click(data) {
  ////===================找元素
  var control_btns_current=document.querySelectorAll('.item_box .control_btn_current');//current结构的控制按钮
  var control_btns = document.querySelectorAll('.item_box .control_btn');//普通结构的控制按钮

////====================注册事件
  //两种情况。control_btns被按。
  // control_btns_current被按。
  
  for (var i = 0; i < control_btns.length; i++) {
  
    //如果普通结构的按钮被按，那么肯定当前不是在被播放的li。
    control_btns[i].onclick = function (i) {
      //得到音频
      var real_music = control_btns[i].querySelector('audio');
      real_music.play_control = null//音乐 时间定时器的标识。
      real_music.imgRotate = null;//背景图片变化的 定时器 标识
      real_music.time = document.querySelectorAll('.time')[i];//得到显示时间
      real_music.playing = control_btns[i].querySelector('.play');//得到播放按钮
      real_music.pausing = control_btns[i].querySelector('.pause');////得到暂停按钮
      
      return function () {
        //如果音乐是暂停状态。不论是否之前有被播放过
        if (real_music.paused) {
          // count_playing  默认是0。
          if (count_playing != i) {
            //说明是当前有在播放的音乐，然后又点击了  别的li  的播放按钮  那么需要变化之前在播放的li的播放情况（ 暂停之前的音乐 ）
            //找到之前的正在被播放的音乐
            var last_real_music = document.querySelectorAll('audio')[count_playing];
            if (!last_real_music.paused) {
              //如果上一首 还在播放    让之前的音乐暂停。
              last_real_music.pause();
              clearInterval(last_real_music.play_control);
              //如果之前在播放的音乐是第一首 ，那么还需要停止转音乐的定时器。
              clearInterval(last_real_music.imgRotate);
              //让标志 i 渐变 动画。变成播放图形。
              finalAnimate(last_real_music.pausing, {opacity: 0, top: 16}, 20);
              finalAnimate(last_real_music.playing, {opacity: 1, top: -1}, 20);
            }
            if (count_playing>i){
              fadeUp(i);
            } else{
              fadeDown(i);
            }
            count_playing = i;
          }
          //让音乐播放
          real_music.play();
          console.log(2);
          //让显示时间 变成金色
          real_music.time.style.color = '#ad986d';
          //切换成暂停的按钮 i  play
          finalAnimate(real_music.playing, {opacity: 0, top: -16}, 20);
          finalAnimate(real_music.pausing, {opacity: 1, top: -1}, 20);
          
          //得到所播放音乐的时长  单位是秒。要取整
          var duration = Math.floor(real_music.duration);
          //让显示时间 随着音乐秒数增加，变化。
          real_music.play_control = setInterval(function () {
            //获得audio 已经播放的时长。单位是秒 要取整
            var currentTime = Math.ceil(real_music.currentTime);
            var current_minutes = '0' + Math.floor(currentTime / 60);
            var current_seconds = currentTime % 60;
            if (current_seconds < 10) {
              current_seconds = '0' + current_seconds;
            }
            
            real_music.time.innerText = current_minutes + ':' + current_seconds;
            //如果音乐已经到最后一秒了。那么就停止计时器。背景图片不旋转，圆环完整了
            if (currentTime == duration) {
              clearInterval(real_music.play_control);
            }
          }, 1000);
          
          //让图片转动时有box-shadow  因为当前页面只会有一个li是有。img的。所以只要【0】即可
          //获取图片的盒子
          var img_div = document.querySelectorAll('.img')[0];
          img_div.style.boxShadow = '5px 5px 20px rgba(0,0,0,.4)';
          //获取图片元素
          var disc_img = img_div.firstElementChild;
          real_music.imgRotate = setInterval(function () {
            var currentTime = real_music.currentTime;
            if (currentTime == duration) {
              clearInterval(real_music.imgRotate);
            }
            var interval_img=Math.floor(currentTime/duration*360);
            // $(disc_img).animate({transform:'rotate(' + (interval_img) + 'deg)'});
            disc_img.style.transform = 'rotate(' + (interval_img) + 'deg)';
          }, 10);
        }
        // 如果音乐正在播放，那么就暂停。
        else {
          //暂停音乐
          real_music.pause();
          //停止时间变化。圆环变化。背景图旋转变化。
          clearInterval(real_music.imgRotate);
          var img_div = document.querySelectorAll('.img')[0];
          img_div.style.boxShadow = 'none';
          clearInterval(real_music.play_control);
          //让标志 i 渐变 动画。变成播放图形。
          finalAnimate(real_music.pausing, {opacity: 0, top: 16}, 20);
          finalAnimate(real_music.playing, {opacity: 1, top: -1}, 20);
          //让显示时间 变成金色
          real_music.time.style.color = '#535252';
        }
      }
    }(i)
  }
}

//当点击了li  让音乐播放。 就让当前li 的外盒高度变高，再让current结构的li top边0；


//2==========================================================分页1的效果 ---------    2    -----按  nav 上的   歌手名 nav的current变化了   列表也变化了============
//如果点击的li是在当前current的下面。那么是 从下往上出现fadeIN。top减小。  当前的li fadeOut。且top是负的。
//即count——playing <index
// 当前的大 li 高度都要变大 为183px。
function fadeUp(index) {
  //counting_playing 且他的大li  高度要变小。current结构的top要直接到-111px;普通li 要fadeout
  //index 的li 要top渐变为0，他的大li 高度要变大。
  var playing_li=$('.music_list .big_ul>li')[count_playing];//这个是大li
  $(playing_li).animate({height:111});
  $(playing_li).find('.current').css('top','-111');
  //不确定count——playing的普通li 要什么效果
  var index_li=$('.music_list .big_ul>li')[index];
  $(index_li).animate({height:183});
  $(index_li).find('.current').css({top:111});
  $(index_li).find('.current').animate({top:0});
}

//如果点击的li是在 当前 的  上面。。那么是从上面 往下出现。让index LI 变成-183px 。。top就要增加
//即count——playing >index
function fadeDown(index) {
  //counting_playing 且他的大li  高度要变小。current结构的top要直接到-111px;普通li 要fadeout
  //index 的li 要top渐变为0，他的大li 高度要变大。
  
  var playing_li=$('.music_list .big_ul>li')[count_playing];//这个是大li
  $(playing_li).animate({height:111});
  $(playing_li).find('.current').css('top','-111');
  //不确定count——playing的普通li 要什么效果
  var index_li=$('.music_list .big_ul>li')[index];
  $(index_li).animate({height:183});
  $(index_li).find('.current').css({top:-183});
  $(index_li).find('.current').animate({top:0});
}

//3==========================================================分页1的效果 ---------    4    -----按  nav 上的   歌手名 nav的current变化了   列表也变化了============
//通过createList 动态产生音乐列表 加到ul下。
//给不同歌手筛选出不同的ARR来产生音乐列表   作为data【】
var nav_lis = document.querySelectorAll('.top_title li');
var last_nav_li = 0;//记录上一次被选中的li
var all_music = [];

var shang_list = [];
var hou_list = [];
var zeng_list = [];
var dimaxi_list = [];
//筛选不同歌手的音乐列表。
for (var key in musicList) {
  all_music.push(musicList[key]);
  switch (musicList[key].singer) {
    case '尚雯婕':
      shang_list.push(musicList[key]);
      break;
    case '曾舜晞':
      zeng_list.push(musicList[key]);
      break;
    case '迪玛希':
      dimaxi_list.push(musicList[key]);
      break;
    case '侯明昊':
      hou_list.push(musicList[key]);
      break;
  }
}

var all_singer_list = [all_music, shang_list, dimaxi_list, zeng_list, hou_list];//全部选项的音乐列表。
//注册事件
$(nav_lis).click(function () {
  var i=$(this).index();
  if (last_nav_li == i) {
    //如果点的li就是当前的li 那么不需要变化
    return;
  } else {
    ul_musicList.innerHTML = null;
    createList(all_singer_list[i]);
    last_nav_li = i;
    //设置默认的播放音乐的下标
    count_playing = 0;
  }
})

//一开始 默认是 【全部】 选项，所以直接传 musicList
createList(all_music);


//4==========================================分页1的效果 ---------    2    -----放在li上 箭头移动  颜色变化======================
////=================找元素
function changeArrow() {
  var ul = document.querySelector('.music_list ul');
  var lis = ul.querySelectorAll('li');
  var line = document.querySelector('.timer div');
////================ 注册事件
  for (var i = 0; i < lis.length; i++) {
    lis[i].onmouseover = function () {
      var left = this.querySelector('.left');
      var right = this.querySelector('.right');
      finalAnimate(left, {opacity: 1, right: -15});
      left.style.color = '#ad986d';
      line.style.backgroundColor = '#ad986d';
      finalAnimate(right, {opacity: 0, right: -47});
    }
    lis[i].onmouseout = function () {
      var left = this.querySelector('.left');
      var right = this.querySelector('.right');
      finalAnimate(left, {opacity: 0, right: 17});
      left.style.color = '#535252';
      line.style.backgroundColor = '#535252';
      finalAnimate(right, {opacity: 1, right: -15});
    }
  }
}