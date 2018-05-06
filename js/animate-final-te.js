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