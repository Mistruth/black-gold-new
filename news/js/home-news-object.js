/**
 * Created by apple on 2018/5/9.
 */

(function(window) {
  //创建导航自动创建内容的构造函数
  function CreateNews(arr) {
    this.arr = arr;
  }
  window.CreateNews = CreateNews;
  //生成左边和右边的区块
  CreateNews.prototype.creatArea = function() {
      newsArr = this.arr;
      var bigbox = document.querySelector('.news-main .left');
      var ul = document.querySelector('.news-main .right');

      for (var i = 0; i < newsArr.length; i++) {
        //左边
        if ((i + 1) % 5 === 1) {
          var oldbox = bigbox.firstElementChild;
          var box = oldbox.cloneNode(true);
          bigbox.removeChild(oldbox);
          var obj = newsArr[i];
          //a链接
          var link = newsArr[i].link;
          // console.log(link);
          if (typeof(link) === "string") {
            box.href = '';
            box.href = "news/" + link;
          }
          var boxObj = new CreateNewsLeft(obj);
          boxObj.render(box);
          bigbox.appendChild(box);
        } else {
          //右边
          var oldli = ul.firstElementChild;
          var li = oldli.cloneNode(true);
          var lis = ul.children;
          // console.log(lis);
          if ((i + 1) % 5 === 2) {
            if (lis.length === 1) {
              ul.removeChild(lis[0]);
            } else {
              for (var j = 0; j < lis.length; j++) {
                ul.removeChild(lis[j]);
                j--;
              }
            }
          }
          var obj2 = newsArr[i];
          //a链接
          var a = li.querySelector('a');
          var link = newsArr[i].link;
          if (typeof(link) === "string") {
            a.href = '';
            a.href = "news/" + link;
          }
          var liObj = new CreateNewsRight(obj2);
          liObj.render(li);
          ul.appendChild(li);
        };
      }
    }
    //左侧开始

  //左侧生成构造函数
  function CreateNewsLeft(obj) {
    this.img = obj.img;
    this.h6 = obj.h6;
    this.p = obj.p;
  }
  CreateNewsLeft.prototype.onmouseover = Leftover;
  CreateNewsLeft.prototype.onmouseout = Leftout;
  //左侧渲染
  CreateNewsLeft.prototype.render = function(box) {
      var img = box.querySelector('img');
      var h6 = box.querySelector('h6');
      var p = box.querySelector('p');
      img.src = "upload/" + this.img;
      h6.innerText = this.h6;
      p.innerText = this.p;
      box.onmouseover = this.onmouseover;
      box.onmouseout = this.onmouseout;
    }
    //左侧鼠标事件
  function Leftover() {
    var moreTxt = this.querySelector('.more-txt');
    var moreLine = this.querySelector('.more-line');
    var topline = this.querySelector('.top-line');
    moreTxt.style.border = "2px solid #ad986e";
    animate(moreLine, { left: 74, width: 50 });
    animate(moreTxt, { paddingLeft: 20, width: 80 });
    animate(topline, { width: 450 });
  }

  function Leftout() {
    var moreTxt = this.querySelector('.more-txt');
    var moreLine = this.querySelector('.more-line');
    var topline = this.querySelector('.top-line');
    moreTxt.style.border = "";
    animate(moreLine, { left: 56, width: 0 });
    animate(moreTxt, { paddingLeft: 0 });
    animate(topline, { width: 40 });
  }
  //左侧结束


  //右侧开始
  //右侧生成
  function CreateNewsRight(obj) {
    this.id = obj.id;
    this.img = obj.img;
    this.h6 = obj.h6;
    this.p = obj.p;
    this.date = obj.date;
  }
  CreateNewsRight.prototype.onmouseover = Rightover;
  CreateNewsRight.prototype.onmouseout = Rightout;
  //右侧鼠标事件
  function Rightover() {
    var up = this.querySelector('.up');
    var time = this.querySelector('.time');
    var num = this.querySelector('.num span');
    var date = this.querySelector('.date');
    var txt = this.querySelector('.txt');
    var p = this.querySelector('.txt p');
    var bg = this.querySelector('.bg');
    var line = this.querySelector('.line');
    up.style.border = "3px solid #ad986e";

    animate(time, { height: 150 });
    animate(txt, { height: 50 });
    animate(date, { opacity: 1, top: 25 });
    animate(num, { width: 40, height: 40, opacity: 0, fontSize: 40 });
    animate(bg, { opacity: 0.6 });
    animate(line, { left: 280, bottom: 161 });
  }

  function Rightout() {
    var up = this.querySelector('.up');
    var time = this.querySelector('.time');
    var num = this.querySelector('.num span');
    var date = this.querySelector('.date');
    var txt = this.querySelector('.txt');
    var p = this.querySelector('.txt p');
    var bg = this.querySelector('.bg');
    var line = this.querySelector('.line');
    up.style.border = "";

    animate(time, { height: 77 });
    animate(txt, { height: 86 });
    animate(date, { opacity: 0, top: -25 });
    animate(num, { width: 20, height: 20, opacity: 1, fontSize: 18 });
    animate(bg, { opacity: 1 });
    animate(line, { left: 375, bottom: 256 });
  }
  //右侧渲染
  CreateNewsRight.prototype.render = function(box) {
      var num = box.querySelector('.num span');
      var img = box.querySelector('img');
      var h6 = box.querySelector('h6');
      var p = box.querySelector('p');
      var date = box.querySelector('.date');
      num.innerText = "0" + (this.id + 1);
      img.src = "upload/" + this.img;
      h6.innerText = this.h6;
      p.innerText = this.p;
      date.innerText = this.date;
      box.onmouseover = this.onmouseover;
      box.onmouseout = this.onmouseout;
    }
    // 右侧结束
})(window);