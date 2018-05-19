//1==========================================================分页1的效果 ---------    1    -----按  nav 上的   歌手名 nav的current变化了   列表也变化了============
function play_click(data) {
  ////===================找元素
  var control_btns_current = document.querySelectorAll('.item_box .control_btn_current');//current结构的控制按钮
  var control_btns = document.querySelectorAll('.item_box .control_btn');//普通结构的控制按钮

////====================注册事件
  //两种情况。
  // 1.control_btns被按。
  // 2.control_btns_current被按。
  
  
  //1.control_btns被按。
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
        // count_playing  默认是0。
        // if (count_playing != i) {
        //说明是当前有在播放的音乐，然后又点击了  别的li  的播放按钮  那么需要变化之前在播放的li的播放情况（ 暂停之前的音乐 ）
        //找到之前的正在被播放的音乐
        //每个大li 下面 的普通li  下面有audio
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
        if (count_playing > i) {
          fadeUp(i);
        } else {
          fadeDown(i);
        }
        count_playing = i;
        // }
        //让音乐播放
        real_music.play();
        console.log(2);
        //让显示时间 变成金色
        real_music.time.style.color = '#ad986d';
        //切换成暂停的按钮 i  play
        //其实这里应该是current的按钮在变化
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
          var interval_img = Math.floor(currentTime / duration * 360);
          // $(disc_img).animate({transform:'rotate(' + (interval_img) + 'deg)'});
          disc_img.style.transform = 'rotate(' + (interval_img) + 'deg)';
        }, 10);
        // 如果音乐正在播放，那么就暂停。
        // else {
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
        // }
      }
    }(i)
  }
}