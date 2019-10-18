let index=0;
let cv=null;

$(function(){
   window.onmousewheel=scrollBarMouseWheel();
   document.addEventListener('DOMMouseScroll', scrollBarMouseWheel());

  windowSize();

  /*监听窗口事件*/
  window.onresize = function () {
    windowSize();
  }

  initEvents();
})

function initEvents(){

    $(".container-core-nav>li").click(function(){
      index=$(this).index();
      containerSlide(-index*$(".section").innerHeight()+"px");
    })

    let slideIndex=0;
    let totalSlideIndex=$(".decoration-slide-down>li").length;

    setInterval(function(){
      let $itemLi= $(".decoration-slide-down>li");
      $itemLi.eq(slideIndex).removeClass("active");
      slideIndex++;
      slideIndex=slideIndex%totalSlideIndex;
      $itemLi.eq(slideIndex).addClass("active");
      $itemLi=null;
    },500);



    $(".factions-cv-btn").click(function(){
    let $item=$(this).parent(".factions-cv");
    cv=new Player($item.children("video"));
    cv.initCV(function(){
      initCV($item);
    })
    cv.releaseCV(function(){
      releaseCV($item);
      $item=null;
    })
  })

  function initCV($item){
    $item.children("img").hide();
    $item.children(".factions-cv-btn").children("img").hide();
  }

   function releaseCV($item){
     $item.children("img").show();
     $item.children(".factions-cv-btn").children("img").show();
   }

}

/*窗口滚动*/
function containerSlide(containerPosition) {
  $(".container-core").css("top", containerPosition);
  let $containerCoreNav=$(".container-core-nav");
  if(index===3){
    $containerCoreNav.addClass("container-core-nav-reverse");
  }else{
    $containerCoreNav.removeClass("container-core-nav-reverse");
  }
  $containerCoreNav.children(".active").removeClass("active");
  $containerCoreNav.children("li").eq(index).addClass("active");
  if(cv){
    cv.pauseCV();
  }
  $containerCoreNav=null;
 }

/*窗口变化*/
function windowSize() {
  let height = document.documentElement.clientHeight;
  $(".section").css("height", "" + height + "px");
}

/*鼠标滑轮滚动*/
function scrollBarMouseWheel(delay) {
  let totalIndex = document.querySelectorAll(".section").length;
  let delta;
  let timer = null;


  return function (e) {
    clearTimeout(timer);
    delta=e.wheelDelta?e.wheelDelta:-(e.detail);
    timer = setTimeout(function () {
      if (delta < 0) {
        if (index < totalIndex - 1) {
           console.log("下滑");
           index++;
        }
      } else {
          console.log("上滑");
        if (index != 0) {
         index--;
        }
      }

      containerSlide(-index*$(".section").innerHeight()+"px");
    }, delay | 300)
  }
}
