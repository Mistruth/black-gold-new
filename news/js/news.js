/**
 * Created by apple on 2018/5/3.
 */
window.onload = function () {
  //头部区块开始
  //头部向下滑动时，top2跟着变小
  var newsTop = document.querySelector('.top');
  var newsTopW = document.querySelector('.top-wrap');

  var newsTop1 = document.querySelector('.top .top-1');
  var newsTop2 = document.querySelector('.top .top-2');
  var newsTopLeft = document.querySelector('.top .top-2-left');
  //newsTop2.style.marginTop = newsTop1.offsetHeight+'px';
  document.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset;
    if (scrollTop > 0) {
      animate(newsTop2, {height: 42});
      animate(newsTopW, {height: 337});
      newsTopLeft.style.top = 0;
      if (scrollTop > 150) {
        animate(newsTop2, {height: 0});
        animate(newsTopW, {height: 295});
        newsTopLeft.style.top = 0;
        newsTop2.style.overflow = "hidden";
      }
    }


    if (scrollTop <= 50) {
      animate(newsTop2, {height: 42});
      animate(newsTopW, {height: 337});
      newsTopLeft.style.top = 0;
      newsTop2.style.overflow = "visible";

      if (scrollTop <= 0) {
        animate(newsTop2, {height: 130});
        animate(newsTopW, {height: 425});
        newsTopLeft.style.top = -10 + 'px';
      }

    }
  });
  //头部区块结束


//新闻导航开始
//新闻导航结束
//新闻主体开始
  var mainUl = document.querySelector('.news-main ul.main-ul');
  var mainLi = mainUl.firstElementChild;
  mainUl.removeChild(mainLi);

//自动生成li及里面的内容
  function creatLi(newsArr) {

    for (var i = 0; i < newsArr.length; i++) {
      var li = mainLi.cloneNode(true);
      mainUl.appendChild(li);
      var img = li.querySelector('img');
      var p = li.querySelector('p');
      var h6 = li.querySelector('h6 ');
      img.src = "upload/" + newsArr[i].img;
      p.innerText = newsArr[i].p;
      h6.innerText = newsArr[i].h6;
      var a = li.querySelector('a');
      var link = newsArr[i].link;
      if(typeof(link) === "string") {
        a.href = '';
        a.href = link;
      }
      //鼠标移上事件
      li.onmouseover = function () {
        var moreTxt = this.querySelector('.more-txt');
        var moreLine = this.querySelector('.more-line');
        moreTxt.style.border = "2px solid #ad986e";
        animate(moreLine, {left: 74, width: 50});
        animate(moreTxt, {paddingLeft: 20, width: 80});
      }

      //鼠标移出事件
      li.onmouseout = function () {
        var moreTxt = this.querySelector('.more-txt');
        var moreLine = this.querySelector('.more-line');
        moreTxt.style.border = "";
        animate(moreLine, {left: 56, width: 0});
        animate(moreTxt, {paddingLeft: 0});
      }
      //最后一个没有边框
      if ((newsArr[i].id + 1) / 3 == 1) {
        li.className = 'last';
      }
    }
  }

  creatLi(newsArr1);




  //创建导航自动创建内容的构造函数
  function CreateNews(arr) {
    this.arr = arr;
  }

  CreateNews.prototype.creatArea =function () {
    newsArr = this.arr;
    var ul = document.querySelector('.main-ul');
    var oldli = ul.firstElementChild;
    ul.innerHTML = "";

    for (var i = 0; i < newsArr.length; i++) {

        //右边

        var li = oldli.cloneNode(true);
        /*var lis = ul.children;
        console.log(lis);
            for(var j = 0; j < lis.length; j++){
              ul.removeChild(lis[j]);
              j--;
            }
        }*/
        var obj2 = newsArr[i];
        var liObj = new CreateNewsRight(obj2);
        liObj.render(li);
        ul.appendChild(li);

    }
  }
  function CreateNewsRight(obj) {
    this.id = obj.id;
    this.img = obj.img;
    this.h6 = obj.h6;
    this.p = obj.p;
    this.date = obj.date;
    this.link = obj.link;
  }
  CreateNewsRight.prototype.render = function (box) {
    var img = box.querySelector('img');
    var h6 = box.querySelector('h6');
    var p = box.querySelector('p');
    img.src = "upload/"+ this.img;
    h6.innerText = this.h6;
    p.innerText = this.p;
    var a = box.querySelector('a');
    var link = this.link;
    if(typeof(link) === "string"){
      a.href = '';
      a.href = link;
    }
    box.onmouseover = this.onmouseover;
    box.onmouseout = this.onmouseout;
  }
  CreateNewsRight.prototype.onmouseover = function () {
    var moreTxt = this.querySelector('.more-txt');
    var moreLine = this.querySelector('.more-line');
    moreTxt.style.border = "2px solid #ad986e";
    animate(moreLine, {left: 74, width: 50});
    animate(moreTxt, {paddingLeft: 20, width: 80});
  }
  CreateNewsRight.prototype.onmouseout = function () {
    var moreTxt = this.querySelector('.more-txt');
    var moreLine = this.querySelector('.more-line');
    moreTxt.style.border = "";
    animate(moreLine, {left: 56, width: 0});
    animate(moreTxt, {paddingLeft: 0});
  }
  var arr = [newsArr1,newsCompany,newsShang,newsZeng,newsHou,newsDi,newsJiang];
  var navul = document.querySelector('.news-n');
  var navli = navul.querySelectorAll("li");
  console.log(navul, navli);
  for(var i =0 ; i<navli.length;i++){
    navli[i].index = i;

    navli[i].onclick = function () {
      var navNow = document.querySelector('.nav-now');
      navNow.className = '';
      navli[this.index].firstElementChild.className = 'nav-now';

      var area = new CreateNews(arr[this.index]);
     area.creatArea();

    }
  }


  //鼠标向下滑动时，盒子以动画形式升上去
  /*document.addEventListener("scroll", function () {
    var lis = mainUl.querySelectorAll('li');
    var Y = window.pageYOffset + window.innerHeight;
    var linkAs = mainUl.querySelector('li a');
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].offsetTop > Y) {
        lis[i].style.visibility = "hidden";
      }else if(lis[i].offsetTop == Y){
        lis[i].style.visibility="visible";
        lis[i].firstElementChild.style.marginTop = '90px';
        lis[i].firstElementChild.style.opacity = 0;
        var link = lis[i].firstElementChild;
        animate_speed(link, {marginTop: 0,opacity:1},15,5);
      }else {
        lis[i].style.visibility="visible";
        lis[i].firstElementChild.style.margin = 0;
        lis[i].firstElementChild.style.opacity = 1;
      }
    }

  })*/
  /*var flag = true;
  if(flag) {

    document.addEventListener("scroll", function () {
      flag = false;
      var lis = mainUl.querySelectorAll('li');
      var Y = window.pageYOffset + window.innerHeight;
      var linkAs = mainUl.querySelector('li a');
      for (var i = 0; i < lis.length; i++) {
        if (lis[i].offsetTop < Y) {
          lis[i].style.visibility = "visible";
          lis[i].firstElementChild.style.margin = 0;
          lis[i].firstElementChild.style.opacity = 1;
        } else if (lis[i].offsetTop == Y) {
          lis[i].style.visibility = "visible";
          lis[i].firstElementChild.style.marginTop = '90px';
          lis[i].firstElementChild.style.opacity = 0;
          var link = lis[i].firstElementChild;
          animate(link, {marginTop: 0, opacity: 1}, function () {
            flag = true;
          });

        } else {
          lis[i].style.visibility = "hidden";
        }
      }

    })
  }*/


//新闻主体结束

}





