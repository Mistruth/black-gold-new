/**
 *
 * 得到第一个元素子节点
 * @param parent
 * @returns {*}
 */
function getFirstElementChild(parent) {
  if (parent.firstElementChild) return parent.firstElementChild;
  else {
    var node, nodes = parent.childNodes, i = 0;
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
      get: function () {
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
 * @param ele
 * @param target
 * @param step
 * @param interval
 */
// function animate(ele, target, step, interval, count) {
//   var x = ele.offsetLeft;
//   //如果元素现在已经有setinterval定时器了，就清除它。
//   clearInterval(ele.control);
//   ele.style.position = 'absolute';
//   ele.control = setInterval(function () {
//     step = x < target ? Math.abs(step) : -Math.abs(step);
//     if (Math.abs(x - target) < Math.abs(step)) {
//       ele.style.left = target + 'px';
//       clearInterval(ele.control);
//       return;
//     }
//     x += step;
//     ele.style.left = x + 'px';
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
  ele.control = setInterval(function () {
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
  element.control = setInterval(function () {
    
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
  interval=interval||20;
  if (element.control)
    clearInterval(element.control);
  
  element.control = setInterval(function () {
    //flag去假设每次定时做动画时，属性值都一定到达了target值。
    var flag = true;
    
    for (var key in obj) {
      //如果属性是透明度要特殊处理
      var current = window.getComputedStyle(element)[key];
      var target = obj[key] ;
      if (key == 'opacity') {
        current *= 1000;
        target*=1000;
        var step = (target - current) / 10;
        //向上向下取整，保证最终能到终点。
        step = step < 0 ? Math.floor(step) : Math.ceil(step);
        current += step;
        element.style[key] = current / 1000;
      }
      else if (key == 'zIndex') {
        element.style.zIndex = obj[key];
      }
      else {
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
      if (current!=target) {
        flag = false;
      }
      //如果所有的要变化的属性都已经到达target值了。那么flag才会不变为false。
    }
      if (flag) {
        //所有属性 已经变化到target值了。那么就清除定时器。而且执行下一个动画。如果有。
        clearInterval(element.control);
        fn && fn();//如果存在fn的话，执行fn；
      }
    }
  ,
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
  element.control = setInterval(function () {
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
      }
      else if (key == 'zIndex') {
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
      fn && fn();//如果存在fn的话，执行fn；
    }
  }, interval);
}