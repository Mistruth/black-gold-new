/**
 * Created by apple on 2018/5/10.
 */
;(function (window) {


  var nav = document.querySelector('.nav-main');
  var ul = nav.querySelector('ul');
  var lineW = nav.querySelector('.line');
  var line = nav.querySelector('.scroll');
  var details = document.querySelector('.details');
  var navW = document.querySelector('.details-nav');
  //在HTML中做了标记，记录在大数组的下标
  var arrcount = details.title;
  details.title = '';
  var arrsrc = newsAll[arrcount];

  //自动生成内容

   function createNav(arr) {
     //自动生成右侧目录
     var li = ul.firstElementChild;
     var h3 = document.querySelector('.details-top h3');
     ul.innerHTML = '';
     for (var i = 0; i < arr.length; i++){
       //如果标题相同，是自己，不需要做目录，拿到自己在数组的下标给count
       if(h3.innerText == arr[i].h6){
         window.count = arr[i].id;
         //var num = count;
       continue;
      }

       var newli = li.cloneNode(true);
       var h6 = newli.querySelector("h6");
       var p = newli.querySelector("p");
       h6.innerText = arr[i].h6;
       p.innerText = arr[i].p;
       var a = newli.querySelector('a');
       var link = arr[i].link;
       if(typeof(link) === "string"){
         a.href = '';
         a.href = link;
       }
       ul.appendChild(newli);

     }
   }
   createNav(arrsrc);


  //左右箭头
  function setContent(arrow,arr,count) {
    var but = arrow;
    var a = but.querySelector('a');

    var p = but.querySelector('p');
    if(count<0){
      count = arr.length - 1;
    }
    if(count>arr.length - 1){
      count = 0;
    }
    p.innerText = arr[count].p;
    var link = arr[count].link;
    if(typeof(link) === "string"){
      a.href = '';
      a.href = link;
    }

  }
  //鼠标放到箭头上出现动画效果
  function setArrow(arrow) {

    var but = arrow;
    var line = but.querySelector('.line');
    var span = but.querySelector('span');
    var b = but.querySelector('b');
    var p = but.querySelector('p');
    but.onmouseover = function () {
      span.style.display = 'none';
      animate(but,{width:150});
      animate(line,{width:150});
      animate(b,{left:75});
      animate(p,{bottom:0});
    }

  }
  //鼠标离开恢复原样
  function oldArrow(arrow) {
    var but = arrow;
    var line = but.querySelector('.line');
    var span = but.querySelector('span');
    var b = but.querySelector('b');
    var p = but.querySelector('p');
    but.onmouseout = function () {
      animate(but,{width:100});
      animate(line,{width:100});
      animate(b,{left:-15});
      animate(p,{bottom:-20},function () {
        span.style.display = 'block';

      });
    }
  }
  var prev = document.querySelector('.prev');
  var next = document.querySelector('.next');

  setContent(prev,arrsrc,count-1);
  setContent(next,arrsrc,count+1);
  setArrow(prev);
  setArrow(next);
  oldArrow(prev);
  oldArrow(next);


  //获取滚动条的高度
 /* if (ul.offsetHeight < ul.scrollHeight) {
    var s = ul.offsetHeight / ul.scrollHeight;
    var h = nav.offsetHeight * s;
    line.style.height = h + "px";
    //当内容滚动时，滚动条跟着滚动
    ul.onscroll = function (e) {
      var s = this.scrollTop / (this.scrollHeight - this.offsetHeight);
      var h = (lineW.offsetHeight - line.offsetHeight) * s;
      line.style.top = h + "px";
      e.stopPropagation();
    }
  }
  //当鼠标拖动滚动条时，内容跟着滚动
  line.onmousedown = function (e) {
    var h = details.offsetTop + 60 + line.offsetTop;
    console.log(details.offsetTop);
    var Y = e.pageY - h;
    document.onmousemove = function (event) {
      var y = event.pageY - h - Y;
      if (y < 0 || y > lineW.offsetHeight - line.offsetHeight) {
        return;
      }
      //console.log('y的最大值' + (lineW.offsetHeight - line.offsetHeight));
      //console.log(y);
      line.style.top = y + "px";
      ul.scrollTop = (y / (lineW.offsetHeight - line.offsetHeight)) * ul.offsetHeight;
      //ul.style.top = -(y / (lineW.offsetHeight - line.offsetHeight)) * ul.offsetHeight + 'px';
    }
  }
//取消鼠标拖动事件
  document.onmouseup= function () {
    document.onmousemove = null;
  }
*/

})(window);