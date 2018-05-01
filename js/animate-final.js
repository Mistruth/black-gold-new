//缓速动画封装
/**
 * 
 * @param {*} element 对象
 * @param {*} obj 对象，所添加的键值对
 * @param {*} fn 动画之后所执行的函数
 */
var animate = function(element, obj, fn) {
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
    var flag = true;
    for (var k in obj) {
      //获得当前属性的状态
      var current = window.getComputedStyle(element)[k]; //得到的是一个带PX的值，需要进行转换
      current = parseInt(current);
      //设置目标
      var target = obj[k];
      //设置步数
      var step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      //当前current
      current += step;
      //设置状态新的值
      element.style[k] = current + 'px';
      //确定是否停止
      if (current != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(element.timeId);
      fn && fn();
    }
  }, 15);
}


var animate_speed = function(element, obj, speed) {
  var speed = speed || 15;
  clearInterval(element.timeId);
  element.timeId = setInterval(function() {
    var flag = true;
    for (var k in obj) {
      //获得当前属性的状态
      var current = window.getComputedStyle(element)[k]; //得到的是一个带PX的值，需要进行转换
      current = parseInt(current);
      //设置目标
      var target = obj[k];
      //设置步数
      var step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      //当前current
      current += step;
      //设置状态新的值
      element.style[k] = current + 'px';
      //确定是否停止
      if (current != target) {
        flag = false;
      }
    }
    if (flag) {
      clearInterval(element.timeId);
    }
  }, speed);
}