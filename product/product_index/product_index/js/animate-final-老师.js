/**
 * Created by HUCC on 2018/5/2.
 */
function animate_teacher(element, obj, fn) {
  //开启定时器,先清除
  clearInterval(element.timeId);
  //假设所有人的动画都完成

  element.timeId = setInterval(function () {
    var flag = true;

    for (var k in obj) {
      var attr = k;
      var target = obj[k];
      if(attr === "zIndex") {
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
        element.style.opacity = current/1000;

        //4. 如果没到终点，需要把flag改成false
        if(target != current) {
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
      fn && fn();//fn存在，才调用fn
    }

  }, 5);
}