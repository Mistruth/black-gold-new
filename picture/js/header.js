/**
 * Created by MAIBENBEN on 2018/5/9.
 */
//筋斗云开始
//1.获取cloud元素，所有的li元素。
function vain() {
 var cloud=document.querySelector(".cloud");
  var lis=document.querySelectorAll(".nav-ul li");
  var position=0;
  //2.给每个li注册一个mouseover事件，修改cloud的left位置
  for(var i=0;i<lis.length;i++){
    lis[i].addEventListener("mouseover",function () {
      animate(cloud,{left:this.offsetLeft});
    })
    //lis[i].addEventListener("mouseout",function () {
    //  animate(cloud,{left:position});
    //})
    //lis[i].addEventListener("click",function () {
    //  this.style.backgroundColor="col";
    //  position=this.offsetLeft;
    //})
  }

}
vain();