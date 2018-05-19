/**
 * Created by MAIBENBEN on 2018/5/6.
 */
/**
 * Created by z-ko on 2017/6/20.
 */
(function ($) {
  $.fn.waterFall = function () {
    //确定每一行有多少个
    var columns = 4;
    //获取每个元素的宽度
    var width = this.children().width();
    //获取每个元素之间的间隙
    var space = (this.width() - width * columns) / (columns - 1);
    //定义一个空数组来存第一行元素的高度
    var heightArr = [];
    //让元素各就各位
    this.children().each(function (index, element) {
      //设置第一行的位置
      if (index < columns) {
        $(element).css({
          top: 0,
          left: index * (width + space),
        });
        heightArr.push($(element).height());
      }
      else {
        //获取高度最小的那个元素
        var minHeight = heightArr[0];
        var minIndex = 0;
        $.each(heightArr, function (index, element) {
          if (minHeight > element) {
            minHeight = element;
            minIndex = index;
          }
        });
        //将数组最小的值加上添加上去的元素的高度
        heightArr[minIndex] += $(element).height() + space;
        //设置新的top和left
        var top = minHeight + space;
        var left = minIndex * (width + space);
        //设置其他行的位置
        $(element).css({
          top: top,
          left: left
        });
      }
      //获取最高的位置
      var maxHeight = heightArr[0];
      $.each(heightArr, function (index, element) {
        maxHeight = maxHeight < element ? element : maxHeight;
      });
      //设置items的高度为最高的那行
      $(this).parent().height(maxHeight);
    });
  }
})(jQuery);


//let ul=$(".fall");
//let lis="";
//for(var i=0;i<13;i++){
//  lis+='<li>' +
//    ''
//}
//$(window).on("scroll",()=>{
//  let height=ul.height();
//let scrollTop=$(document).scrollTop();
//if(scrollTop-height>=120){
//  ul.appendChild(lis);
//  ul.waterFall();
//}
//})