//想法1.
//1.可以传一个当前页面所用的数组。在数组中找index的li。赋予实际的li的内容。
//2.在nav切换不同歌手时。
//3.有一个数组存放不同歌手的musicList（分别也是数组）。
//4.然后有一个全局的变量  记录了 当前是哪个歌手的musicList  。
//5.实时改变 count_playing .
var count_playing = 0;//拥有current 样式的li  正在播放音乐的所在li 索引
var ul_musicList = document.querySelector('.music_list ul');
//首先产生一个用来克隆的普通结构 li
var normalLiForClone = document.createElement('li');
//给普通克隆节点  赋值 结构
normalLiForClone.innerHTML =
  "<div class='item_box'>\n" +
  "          <div class='mplayer'>\n" +
  "            <div class='control_btn control'>\n" +
  "              <audio src='http://heijin.jsmo.xin/templates/music/YouMeanEverythingToMe.mp3'></audio>\n" +
  "              <i class='play'></i>\n" +
  "              <i class='pause'></i>\n" +
  "            </div>\n" +
  "          </div>\n" +
  "<a href='#' class='link fr'>\n" +
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
  "        </a>"+
  "        </div>" ;

//再产生一个用来克隆的  current 结构   li
var currentLiForClone = document.createElement('li');
//给currentLi克隆节点  赋值 结构
currentLiForClone.innerHTML =
  "<div class='item_box'>\n" +
  "          <div class='record'>\n" +
  "            <div class='img'>\n" +
  "              <img src='images/song_02.jpg' alt=''>\n" +
  "              <div class='control_btn control'>\n" +
  "                <audio src='http://heijin.jsmo.xin/templates/music/12am.mp3'></audio>\n" +
  "                <i class='play'></i>\n" +
  "                <i class='pause'></i>\n" +
  "              </div>\n" +
  "            </div>\n" +
  "          </div>\n" +
  "<a href='#' class='link fr'>\n" +
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
  "        </a>" +
  "        </div>";


/**
 *
 * @param index   要改变结构和样式的   li 的下标
 * @param flag    标记：  false----从current 换成last ， true--- 从last  换成 current
 */
function changeLi(index, flag, data) {
  //ul_musicList  是页面当前的ul
  //一定要动态生成lis       因为页面上的音乐列表会随着按  nav上的歌手名 变化
  var lis = ul_musicList.querySelectorAll('li');
  
  var refChild = lis[index].nextElementSibling;
  //如果flag是false  代表 从 current 变成普通li
  if (!flag) {
    //把当前index 的li 给删除掉。然后insertBefore （克隆普通li）
    ul_musicList.removeChild(lis[index]);
    var newNormal = normalLiForClone.cloneNode(true);
    $(newNormal).css({display: 'none'});
    ul_musicList.insertBefore(newNormal, refChild);
    $(newNormal).fadeIn();
  }
  //如果flag是true  代表 从  普通li  变成  current
  else {
    //把当前index的li给删除掉。然后insertBefore（克隆 currentli）
    ul_musicList.removeChild(lis[index]);
    var newCurrent = currentLiForClone.cloneNode(true);
    newCurrent.className = 'current';
    // index要从上往下出现  counting _playing要从上往下收  |||||现在变化的是普通 结构的li 要变成current结构的li
    if (count_playing == index) {
      $(newCurrent).css({display: 'none'});
      ul_musicList.insertBefore(newCurrent, refChild);
      $(newCurrent).slideDown(200);
    }
  }
  //给新插入的li  添加实际内容
  createLi(data, index);
  
}

function createList(data) {
  var li = null;
  for (var i = 0; i < data.length; i++) {
    if (i === 0) {
      //如果i===0,  默认初始化时，第一个li 是 current样式。
      li = currentLiForClone.cloneNode(true);
      ul_musicList.appendChild(li);
      initCurrent(li, data[i]);
    }
    else {
      //初始化时，普通的li
      li = normalLiForClone.cloneNode(true);
      ul_musicList.appendChild(li);
    }
    initCommon(li, data[i]);
  }
  changeArrow();
  //给li的播放按钮注册事件
  play_click(data);
}

function createLi(data, index) {
  var lis = ul_musicList.querySelectorAll('li');
  if (lis[index].className === 'current') {
    //如果要生成的li 是current li 那么
    initCurrent(lis[index], data[index]);
  }
  initCommon(lis[index], data[index]);
  changeArrow();
  //给li的播放按钮注册事件
  play_click(data);
}

function initCurrent(li, currentData) {
  
  var img = li.querySelector('.img img');
  img.src = currentData.bgImg;
  var desc = li.querySelector('.desc span');
  desc.innerText = currentData.desc;
  // 给current li 加上current的类名。有current的样式
  li.className = 'current';
}

function initCommon(li, currentData) {
  var name = li.querySelectorAll('.item_title p')[0];
  var singer = li.querySelectorAll('.item_title p')[1];
  var time = li.querySelectorAll('.timer span')[2];
  var audio = li.querySelector('audio');
  name.innerText = currentData.name;
  singer.innerText = currentData.singer;
  time.innerText = currentData.time;
  audio.src = currentData.src;
  audio.load();
  var link = li.querySelector('a');
  //因为不是所有的歌都做了详情页
  if (currentData.link) {
    link.href = currentData.link;
  }
}


//1==========================================分页1的效果 ---------    1   ------滚动效果===================================
//随着scrollTop增加。music-content覆盖在banner上。
//应该适合scrollTop挂钩
function scrollOutter() {
  var lastScrollTop = 0;//上一次的scrollTop。这样和当前的scrollTop比较可以知道是向上滑还是向下滑
  window.onscroll = function (event) {
    
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var title_step = 0.04 * scrollTop;
    var music_content_step = 0.08 * scrollTop;
    //如果没有之前的scrollTop ，那么就让他等于当前的scrollTop
    if (!lastScrollTop) lastScrollTop = scrollTop;
    var banner_title = document.querySelector('.banner .banner_title');
    var banner_subtitle = document.querySelector('.banner .banner_subtitle');
    var music_content = document.querySelector('section.music_content');
    var banner_title_bottom = parseInt(window.getComputedStyle(banner_title).bottom);
    var banner_subtitle_bottom = parseInt(window.getComputedStyle(banner_subtitle).bottom);
    var music_content_top = parseInt(window.getComputedStyle(music_content).top);
    if (scrollTop == 0) {
      finalAnimate(banner_subtitle, {bottom: 20});
      finalAnimate(banner_title, {bottom: 20});
      finalAnimate(music_content, {top: 416});
    }
    else if (scrollTop > lastScrollTop) {
      // 如果scrollTop在增大，那么
      lastScrollTop = scrollTop;
      if (banner_title_bottom < 90 && banner_subtitle_bottom < 90) {
        banner_subtitle.style.bottom = banner_subtitle_bottom + title_step + 'px';
        banner_title.style.bottom = banner_title_bottom + title_step + 'px';
        
      }
      if (music_content_top > scrollTop)
        music_content.style.top = music_content_top - music_content_step + 'px';
    } else {
      // 如果scrollTop在减小，那么
      lastScrollTop = scrollTop;
      //当title在原本bottom:20之上时。
      if (banner_title_bottom > 20 && banner_subtitle_bottom > 20) {
        // 如果当前bottom比scrollTop大的话
        if (banner_subtitle_bottom - scrollTop > 20) {
          banner_subtitle.style.bottom = banner_subtitle_bottom - title_step + 'px';
          banner_title.style.bottom = banner_title_bottom - title_step + 'px';
        }
        //否则，直接让bottom到原位20px
        else {
          finalAnimate(banner_subtitle, {bottom: 20});
          finalAnimate(banner_title, {bottom: 20});
        }
      }
      if (music_content_top < 416)
        if (music_content_top + scrollTop < 416) {
          music_content.style.top = music_content_top + music_content_step + 'px';
        }
        //否则直接让top到达416
        else {
          finalAnimate(music_content, {top: 416});
        }
      
    }
  }
}

// scrollOutter();

//2==========================================分页1的效果 ---------    2    -----放在li上 箭头移动  颜色变化======================
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

//3==========================================================分页1的效果 -----    3    ---按播放按钮  时间动态变化  播放按钮变成暂停按钮  按了别的li的播放按钮，要让别的li的播放暂停  播放时图片有阴影=====================


//   一按播放按钮   如果是当前的li被按 那么不用克隆节点。只需要暂停或者播放
//   如果是另外一个li被按，那么当前的li 删除，换成普通的li （通过克隆）。再让被按的li 删除普通li ， 克隆current li节点。
//通过判断被点的li 的className是否是current 。

function play_click(data) {
  ////===================找元素
  var control_btns = document.querySelectorAll('.item_box .control_btn');
////====================注册事件
  for (var i = 0; i < control_btns.length; i++) {
    control_btns[i].onclick = function (i) {
      //得到音频
      var real_music = control_btns[i].querySelector('audio');
      real_music.play_control = null//音乐 时间定时器的标识。
      real_music.imgRotate = null;//背景图片变化的 定时器 标识
      real_music.time = document.querySelectorAll('.time')[i];//得到显示时间
      real_music.playing = control_btns[i].querySelector('.play');//得到播放按钮
      real_music.pausing = control_btns[i].querySelector('.pause');////得到暂停按钮
      real_music.real_playing = false;//因为 有bug，，，标记 是否是真的在播放
      return function (e) {
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
            
            //如果flag是false  代表 从 current 变成普通li
            changeLi(count_playing, 0, data);
            // }
            count_playing = i;
            changeLi(count_playing, 1, data);
          }
          else {
            //如果i===count_playing ， 那么说明至少在上面点了两遍 或者就是页面默认的第一个 current li。
            //让他在真的播放
            real_music.real_playing = true;
          }
          //让音乐播放
          real_music.play();
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
          // console.log(real_music.real_playing);
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
            // var interval_img=Math.floor(currentTime/duration*360);
            // $(disc_img).animate({transform:'rotate(' + (interval_img) + 'deg)'});
            disc_img.style.transform = 'rotate(' + (currentTime) + 'deg)';
          }, 10);
          
          if (!real_music.real_playing) {
            real_music.pause();
            real_music.load();
            clearInterval(real_music.play_control);
            clearInterval(real_music.imgRotate);
          }
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
          real_music.real_playing = true;
        }
      }
    }(i)
  }
}


//4==========================================================分页1的效果 ---------    4    -----按  nav 上的   歌手名 nav的current变化了   列表也变化了============
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
for (var i = 0; i < nav_lis.length; i++) {
  nav_lis[i].onclick = function (i) {
    return function () {
      console.log(all_singer_list[i]);
      if (last_nav_li == i) {
        //如果点的li就是当前的li 那么不需要变化
        return;
      } else {
        ul_musicList.innerHTML = null;
        createList(all_singer_list[i]);
        nav_lis[last_nav_li].className = '';
        last_nav_li = i;
        count_playing = 0;
        
        nav_lis[i].className = 'current';
      }
    }
  }(i)
}
//一开始 默认是 【全部】 选项，所以直接传 musicList
createList(all_music);


//通过判断地址栏的hash值。来得到 从首页过来的 想到 哪个歌手 的列表。
function changeSinger() {
  if (window.location.hash){
    var singer_hash=window.location.hash.slice(1);
    nav_lis[singer_hash].click();
  }
}
changeSinger();

var toAll=document.querySelector('a.toAll');
/**
 * 让点导航的黑金音乐 能够重新刷新。到达全部的音乐列表
 */
toAll.onclick=function () {
  //如果现在的音乐列表不是 全部的，那么就要到全部的。
  location.reload();
}
