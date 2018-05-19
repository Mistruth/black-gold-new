/**
 * Created by Administrator on 2018/5/2.
 */


//自己的
function animate3(element, obj, fn) {
  clearInterval(element.timeId)
  element.timeId = setInterval(function () {
    var flag = true;

    for (var k in obj) {

      var attr = k;
      var target = obj[k];

      if (attr == "zIndex") {
        element.style.zIndex = target;
      } else if (attr == "opacity") {
        var current = window.getComputedStyle(element)[attr];
        current = parseFloat(current);

        target = target * 1000;
        current = current * 1000;

        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current / 1000;
      } else {
        var current = window.getComputedStyle(element)[attr];
        current = parseInt(current);
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current + "px";
      }


      if (current != target) {
        flag = false;
      }
    }

    if (flag) {
      clearInterval(element.timeId);
      fn && fn();
    }
  }, 15)
}