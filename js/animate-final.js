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