/**
 * Created by HUCC on 2018/5/2.
 */
function animate(element, obj, fn) {
  //开启定时器,先清除
  clearInterval(element.timeId);
  //假设所有人的动画都完成

  element.timeId = setInterval(function() {
    var flag = true;

    for (var k in obj) {
      var attr = k;
      var target = obj[k];
      if (attr === "zIndex") {
        //处理zIndex
        element.style.zIndex = target;
      } else if (attr === "opacity") {

        //1. 获取到当前的opacity
        var current = window.getComputedStyle(element).opacity;

        //需要把target和current扩大1000倍
        current *= 1000;
        target *= 1000;

        //2. 计算step
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        //3. 在原来的基础上加上step
        current += step;
        element.style.opacity = current / 1000;

        //4. 如果没到终点，需要把flag改成false
        if (target != current) {
          flag = false;
        }

      } else {
        //1. 获取元素当前样式
        var current = window.getComputedStyle(element)[attr];
        current = parseInt(current);

        //2. 计算step, 保证step最少都是1px
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        //3. 在current的基础上增加step
        current += step;
        element.style[attr] = current + "px";

        //4. 如果到达了终点，需要清除定时器
        if (current != target) {
          flag = false;
        }
      }
    }
    if (flag) {
      clearInterval(element.timeId);
      fn && fn(); //fn存在，才调用fn
    }
  }, 15);
}




function animate_speed(element, obj, speed, speed2) {
  speed2 = speed2 || 10;
  speed = speed || 15;
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
      var flag = true; //假设所有的样式都达到终点
      for (var k in obj) {
        var target = obj[k];
        if (k === 'opacity') {
          var current = window.getComputedStyle(element)[k];
          current = parseFloat(current);
          current *= 1000; //扩大1000倍
          target *= 1000;
          step = (target - current) / speed2;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          current /= 1000;
          element.style.opacity = current;
        } else if (k === 'zIndex') {
          element.style.zIndex = target;
        } else {
          var current = window.getComputedStyle(element)[k];
          current = parseInt(current); //通过getComputedStyle获取到的属性包含px，这里需要除去
          var step = (target - current) / speed2;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[k] = current + 'px';
        }
        if (current != target) {
          flag = false;
        } //end if
      } //end for in
      if (flag) {
        clearInterval(element.timeId);
        //如果前面的为真,后面的也为真，那么取后面的那个值
      }
    }, speed) //setinterval
} //end func



function animate_stable(element, target, step, time, fn) {
  clearInterval(element.timeId);
  //设置每一个元素的计时器,把他放在对象上面，可以避免全局变量造成只有一个timeId的问题
  element.timeId = setInterval(function() {
    //获取当前坐标
    var current = element.offsetLeft;
    //设置当前步数
    step = target > current ? Math.abs(step) : -Math.abs(step);
    current += step;
    //设置判断条件
    if (Math.abs(target - current) > Math.abs(step)) {
      element.style.left = current + 'px';
    } else {
      clearInterval(element.timeId);
      element.style.left = target + 'px';
      fn && fn();
    }
  }, time)
}



/**
 *
 * 得到第一个元素子节点
 * @param parent
 * @returns {*}
 */
function getFirstElementChild(parent) {
  if (parent.firstElementChild) return parent.firstElementChild;
  else {
    var node, nodes = parent.childNodes,
      i = 0;
    while (node = nodes[i++]) {
      if (node.nodeType == 1) {
        return node;
      }
    }
    return null;
  }
}

/**
 *
 * 得到下一个兄弟元素节点。
 * @param element
 * @returns {Element}
 */
function getNextElementSibling(element) {
  if (element.nextElementSibling) return element.nextElementSibling;
  if (!'nextElementSibling' in document.documentElement) {
    Object.defineProperty(Element.prototype, 'nextElementSibling', {
      get: function() {
        var sibling = this.nextSibling;
        //得到null 和 undefind的nodeType会出错
        while (sibling && sibling.nodeType != 1)
          sibling = sibling.nextSibling;
        return sibling;
      }
    })
  }
}

/**
 * 兼容性的得到scrollLeft,scrollTop
 * 返回一个对象。scrollLeft,scrollTop是其属性
 * @returns {{scrollLeft: number, scrollTop: number}}
 */
function getScroll() {
  return {
    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop
  };
}

/**
 * 获得鼠标在页面中的位置
 * @param event
 * @returns {{pageX: *, pageY: *}}
 */
function getPage(event) {
  return {
    pageX: event.clientX + getScroll().scrollLeft,
    pageY: event.clientY + getScroll().scrollTop
  };
}

// 获取鼠标在盒子中的位置
// var ele=null;
// ele.onmouseover=function (event) {
//   //首先获得鼠标在页面中的位置。
//   var pageX=getPage(event).pageX;
//   var pageY=getPage(event).pageY;
//
//   //获得盒子在页面中的位置
//   var boxX=ele.offsetLeft;
//   var boxY=ele.offsetTop;
//
//   //获得鼠标在盒子当中的位置
//   var x=pageX-boxX;
//   var y=pageY-boxY;
// }

/**
 * 控制元素移动到指定的位置
//  * @param ele
//  * @param target
//  * @param step
//  * @param interval
//  */
// function animate(ele, target, step, interval, count) {
//   var x = ele.offsetLeft;
//   //如果元素现在已经有setinterval定时器了，就清除它。
//   clearInterval(ele.control);
//   ele.style.position = 'absolute';
//   ele.control = setInterval(function() {
//     step = x < target ? Math.abs(step) : -Math.abs(step);
//     if (Math.abs(x - target) < Math.abs(step)) {
//       ele.style.left = target + 'px';
//       clearInterval(ele.control);
//       return;
//     }
//     x += step;
//     ele.style.left = x + 'px';
//     console.log(count + 'count');
//   }, interval);
// }

/**
 * 加速版
 *
 * 移动到指定位置的
 *
 * @param ele
 * @param target
 * @param interval 定时器的时间间隔
 */
function accelerateAnimate(ele, target, interval) {
  //因为offsetLeft总是会得到整数，会被4舍5入。
  var x = ele.offsetLeft;
  if (ele.control)
    clearInterval(ele.control);
  ele.control = setInterval(function() {
    var step = (target - x) / 10;
    //元素已经到达目标点，就清除定时器。
    if (step == 0) {
      clearInterval(ele.control);
      return;
    }
    //因为如果step太小，-1~0 或者  0~1     下次再取得offsetLeft时，会把刚加上的step舍掉。所以要取整。
    //如果step 是负的，处于-1~0之间 向上取整 会变成0；
    step = step < 0 ? Math.floor(step) : Math.ceil(step);
    x += step;
    ele.style.left = x + 'px';
  }, interval);
}

function arbitraryStyleAnimate(element, target, styleToChange, interval) {
  var current = window.getComputedStyle(element)[styleToChange];
  //得到的current属性是带单位的。用parseInt去掉单位
  current = parseInt(current);
  if (element.control) clearInterval(element.control);
  element.control = setInterval(function() {

    var step = (target - current) / 10;
    if (step == 0) {
      clearInterval(element.control);
      return;
    }
    step = step < 0 ? Math.floor(step) : Math.ceil(step);
    current += step;
    element.style[styleToChange] = current + 'px';
  }, interval);
}


/**
 * 终极动画
 * 修改任意个属性
 * 利用flag控制！！,判断是否所有属性都已经到达target才清除定时器，和开启下一个动效
 * @param element
 * @param obj 是一个对象。保存了要做动画的属性键值对。
 * @param interval
 * @param fn    是当这次要控制的属性的所有动效都执行完了，再去做fn（）；可以再去调用一个动画函数。
 *
 **/

function finalAnimate(element, obj, interval, fn) {
  interval = interval || 20;
  if (element.control)
    clearInterval(element.control);

  element.control = setInterval(function() {
      //flag去假设每次定时做动画时，属性值都一定到达了target值。
      var flag = true;

      for (var key in obj) {
        //如果属性是透明度要特殊处理
        var current = window.getComputedStyle(element)[key];
        var target = obj[key];
        if (key == 'opacity') {
          current *= 1000;
          target *= 1000;
          var step = (target - current) / 10;
          //向上向下取整，保证最终能到终点。
          step = step < 0 ? Math.floor(step) : Math.ceil(step);
          current += step;
          element.style[key] = current / 1000;
        } else if (key == 'zIndex') {
          element.style.zIndex = obj[key];
        } else {
          //得到的current属性是带单位的。用parseInt去掉单位
          current = parseInt(current);
          //让step是target值和当前值的差值的 1/10.这样可以加速变化。
          var step = (target - current) / 10;
          //如果当前没有到达target值。即obj【key】 那么flag就为false；
          //这样就知道这次定时完成的动画不能清除定时器，还要至少在进行一次动画。

          //因为如果step在0~1之间。current会有小数。但是至少是1px去变化的。
          step = step < 0 ? Math.floor(step) : Math.ceil(step);
          current += step;
          element.style[key] = current + 'px';
        }
        if (current != target) {
          flag = false;
        }
        //如果所有的要变化的属性都已经到达target值了。那么flag才会不变为false。
      }
      if (flag) {
        //所有属性 已经变化到target值了。那么就清除定时器。而且执行下一个动画。如果有。
        clearInterval(element.control);
        fn && fn(); //如果存在fn的话，执行fn；
      }
    },
    interval
  )
}


/**
 * 终极匀速动画
 * @param element
 * @param obj
 * @param interval
 * @param fn
 */
function animateEase(element, obj, interval, fn) {
  if (element.control)
    clearInterval(element.control);
  var startstatus = {};
  element.control = setInterval(function() {
    //flag去假设每次定时做动画时，属性值都一定到达了target值。
    var flag = true;
    for (var key in obj) {
      // 如果属性是透明度要特殊处理

      if (key == 'opacity') {
        var current = window.getComputedStyle(element)[key] * 100;
        var target = obj[key] * 100;
        if (startstatus.length < obj.length) {
          var step = (target - current > 0 ? Math.abs(target - current) : -Math.abs(target - current)) / 10;
          startstatus[key] = step;
        }
        if (current == target) {
          continue;
        } else flag = false;
        current += startstatus[key];
        element.style[key] = current / 100;
      } else if (key == 'zIndex') {
        element.style.zIndex = obj[key];
        continue;
      }
      //得到的current属性是带单位的。字符串形式,用parseInt去掉单位
      else {
        var current = parseInt(window.getComputedStyle(element)[key]);
        var target = obj[key];
        if (startstatus.length < obj.length) {
          var step = (target - current > 0 ? Math.abs(target - current) : -Math.abs(target - current)) / 10;
          startstatus[key] = step;
        }
        //如果当前没有到达target值。即obj【key】 那么flag就为false；
        //这样就知道这次定时完成的动画不能清除定时器，还要至少在进行一次动画。
        if (target - current) {
          flag = false;
        }

        if (Math.abs(target - current) < Math.abs(startstatus[key])) {
          element.style[key] = target;
          continue;
        }
        current += startstatus[key];
        element.style[key] = current + 'px';
      }
      //如果所有的要变化的属性都已经到达target值了。那么flag才会不变为false。
    }
    if (flag) {
      //所有属性 已经变化到target值了。那么就清除定时器。而且执行下一个动画。如果有。
      clearInterval(element.control);
      fn && fn(); //如果存在fn的话，执行fn；
    }
  }, interval);
}



// Up In效果
/**
 * 
 * @param {*} target 
 */
function waterFall_F1(target) {
  var current = window.getComputedStyle(target).marginTop;
  current = parseInt(current);
  // target.style.opacity = 0;
  target.style.top = current + 50 + 'px';
  animate_speed(target, {
    top: 0,
    opacity: 1
  }, 15, 25);
}

function UpIn(elements, a, b) {
  function fn() {
    var scroll_top = document.documentElement.scrollTop;
    if (scroll_top > a && scroll_top < b) {
      for (var i = 0; i < elements.length; i++) {
        (function(i) {
          waterFall_F1(elements[i]);
        })(i);
      }
      setTimeout(function() {
        window.removeEventListener('scroll', fn);
      }, 500);
    }
  }
  window.addEventListener('scroll', fn)
}