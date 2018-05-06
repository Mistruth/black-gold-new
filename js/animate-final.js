//缓速动画封装
/**
 * 
 * @param {*} element 对象
 * @param {*} obj 对象，所添加的键值对
 * @param {*} fn 动画之后所执行的函数
 */
//增加opacity和zindex
function animate(element, obj, fn) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
      var flag = true; //假设所有的样式都达到终点
      for (var k in obj) {
        if (k === 'opacity') {
          var current = window.getComputedStyle(element)[k];
          current = parseFloat(current);
          current *= 1000; //扩大1000倍
          obj[k] *= 1000;
          step = (obj[k] - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          current /= 1000;
          element.style.opacity = current;
          if (current != obj[k]) {
            flag = false;
          } //end if
        } else if (k === 'zIndex') {
          element.style.zIndex = obj[k];
        } else {
          var current = window.getComputedStyle(element)[k];
          current = parseInt(current); //通过getComputedStyle获取到的属性包含px，这里需要除去
          var step = (obj[k] - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[k] = current + 'px';
          if (current != obj[k]) {
            flag = false;
          } //end if
        }

      } //end for in
      if (flag) {
        clearInterval(element.timeId);
        fn && fn(); //如果前面的为真,后面的也为真，那么取后面的那个值
      }
    }, 15) //setinterval
} //end func


function animate_speed(element, obj, speed, speed2) {
  speed2 = speed2 || 10;
  speed = speed || 15;
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
      var flag = true; //假设所有的样式都达到终点
      for (var k in obj) {
        if (k === 'opacity') {
          var current = window.getComputedStyle(element)[k];
          current = parseFloat(current);
          current *= 1000; //扩大1000倍
          obj[k] *= 1000;
          step = (obj[k] - current) / speed2;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          current /= 1000;
          element.style.opacity = current;
        } else if (k === 'zIndex') {
          element.style.zIndex = obj[k];
        } else {
          var current = window.getComputedStyle(element)[k];
          current = parseInt(current); //通过getComputedStyle获取到的属性包含px，这里需要除去
          var step = (obj[k] - current) / speed2;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[k] = current + 'px';
        }
        if (current != obj[k]) {
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