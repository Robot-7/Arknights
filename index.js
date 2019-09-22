$(function () {

  /*加载控件事件*/
  initEvents();

  /*监听滚动条事件*/
  document.addEventListener('mousewheel', debounce());

  /*监听窗口事件*/
  window.onresize = function () {
    windowSize();
  }

})

/*事件加载*/
function initEvents() {

  /*背景视频对象*/
  let videoBg = new Player(".section-video-bg");

  /*播放视频对象*/
  let videoPlayer = new Player(".video-window-show");

  /*窗口变化*/
  windowSize();

  /*-------------------------------------顶部(header)--------------------------------------------------*/

  /*导航栏展开*/
  $(".header-left-nav").delegate(".left-nav-shrink", "click", function () {
    let $this = $(this);
    $this.removeClass("left-nav-shrink");
    $this.addClass("left-nav-unfold");
    $(".left-nav-extend").css("top", "20px");
  })

  /*导航栏收起*/
  $(".header-left-nav").delegate(".left-nav-unfold", "click", function () {
    let $this=$(this);
    $this.removeClass("left-nav-unfold");
    $this.addClass("left-nav-shrink");
    $(".left-nav-extend").css("top", "-600px");
  })

  /*选择pv*/
  $(".selection-video-choice").click(function () {
    let $this = $(this);
    let index = $this.index();
    let $videoWindow = $(".section-video-window");
    if (index === 1) {
      $(".video-info-pv1").hide();
      $(".video-info-pv2").show();
    } else {
      $(".video-info-pv1").show();
      $(".video-info-pv2").hide();
    }
    videoPlayer.selectPV(index % 2);
    if (!$(this).hasClass("selection-video-active")) {
      $(".selection-video-active").removeClass("selection-video-active");
      $this.addClass("selection-video-active");
    }
  })


  /*-------------------------------------第一版(home)--------------------------------------------------*/

  /*鼠标下滑动画效果*/
  animationMouseScroll()();

  /*添加背景pv封面*/
  videoBg.videoCover($(".section-video-bg-cover"));

  /*播放pv*/
  $(".section-video-play").click(function () {
    let $videoWindow = $(".section-video-window");
    $videoWindow.toggleClass("section-video-window-active");
    videoPlayer.player.play();
  })

  /*暂停pv*/
  $(".section-video-window").delegate(".video-window-show-mask", "click", function () {
    $(".section-video-window").removeClass("section-video-window-active");
    videoPlayer.player.pause();
  })

  /*“下载游戏”的展开及收缩*/
  $(".scanning-download-a").click(function () {
    $(".section-download-box").toggleClass("section-download-box-shrink");
    let width=document.documentElement.clientWidth;
    if(width>=1240){
      $(".ul-li-show").width(""+width*0.44*0.33+"px");
    }
  })

  /*-------------------------------------第二版(news)--------------------------------------------------*/

  /*新闻栏的轮播（非循环）*/
  $(".news-slide-nav li").click(function (){
    $(".slide-nav-active").removeClass("slide-nav-active");
    $(this).addClass("slide-nav-active");
    $(".news-slide-all").css("left", "" +  (-($(this).index() + 1))*100 + "%");
  })


  /*-------------------------------------第三版(factions)--------------------------------------------------*/

  /*展开角色集团内容*/
  $(".character-type-list li a").click(function () {

    $(".character-type-list li a").height(0);

    let $mask=$(this).parent("li").children(".type-list-on");
    $mask.height(0);

    let $factionsList= $(".character-type-list");
    $factionsList.removeClass("character-type-list-ready");

    setTimeout(function () {
      $(".character-type-list").css("display", "none");
      $(".section-character-bg").css("opacity", "0");
      $mask.height("100%");

      $factionsList.addClass("character-type-list-ready");
      $factionsList=null;
    }, 300)

    $(".section-factions-logo").css("opacity", "1");
    $(".character-list").css("display", "block");

  })

  /*关闭角色集团所展开的内容*/
  $(".section-factions-logo").click(function () {


    $(this).css("opacity", "0");
    $(".character-list").css("display", "none");
    $(".character-type-list").css("display", "block");
    $(".character-type-list li a").height("100%");
    $(".section-character-bg").css("opacity", "1");

    /*消除事件未加载完毕时hover造成的影响*/
    let $factionsList= $(".character-type-list");
    $factionsList.removeClass("character-type-list-ready");
    setTimeout(function(){
      $factionsList.addClass("character-type-list-ready");
      $factionsList=null;
    },500)

  })

  /*-------------------------------------第四版(story)--------------------------------------------------*/

  /*展开故事详情*/
  $(".story-mask").click(function () {
    let $liParent= $(this).parent(".story-details-inner").parent(".story-details");
    $liParent.addClass("st-active");
    $liParent.find(".story-mask").removeClass("story-mask");
    $liParent.siblings().addClass("st-no-active");
    setTimeout(function(){
      $liParent.find(".details-content").css({"opacity": "1", "height": "50%",});
      $liParent=null;
    },300)
  })

  /*关闭故事详情*/
  $(".details-close").click(function () {
    let $liParent= $(this).parent(".details-content").parent(".story-logo").parent(".story-details-inner").parent(".story-details");
    $liParent.removeClass("st-active");
    $liParent.children(".story-details-inner").children("a").eq(1).addClass("story-mask");
    $liParent.siblings().removeClass("st-no-active");
    $(this).parent(".details-content").css({"opacity": "0", "height": "0%",});
    $liParent=null;
  })

  /*hover故事图标*/
  $(".story-mask").hover(function () {
    let $innerParent=$(this).parent(".story-details-inner");
    $innerParent.find(".story-log-img").css("transform", "scale(1.1)");
    $innerParent.find(".story-title").addClass("story-title-show");
    $innerParent=null;
  }, function () {
    let $innerParent=$(this).parent(".story-details-inner");
    $innerParent.find(".story-log-img").css("transform", "scale(1)");
    $innerParent.find(".story-title").removeClass("story-title-show");
    $innerParent=null;
  })

  /*-------------------------------------第五版(archive)--------------------------------------------------*/




  /*-------------------------------------尾部(footer)--------------------------------------------------*/



}


/*窗口滚动*/
function windowScroll(beginHeight, endHeight, status) {
  let timer;
  let height = Math.abs(endHeight - beginHeight);
  let interval = height / 100;
  if (status) {
    timer = setInterval(function () {
      beginHeight += interval;
      window.scroll(0, beginHeight);
      if (beginHeight >= endHeight) {
        window.scroll(0, endHeight);
        clearInterval(timer);
      }
    }, 1)
  } else {
    timer = setInterval(function () {
      beginHeight -= interval;
      window.scroll(0, beginHeight);
      if (beginHeight <= endHeight) {
        window.scroll(0, endHeight);
        clearInterval(timer);
      }
    }, 1)
  }
}

/*窗口变化*/
function windowSize() {
  let documentElement=document.documentElement;
  let height = documentElement.clientHeight;
  let width=documentElement.clientWidth;
  $(".section").css("height", "" + height + "px");
  if(width>=1240){
    $(".ul-li-show").width(""+width*0.44*0.33+"px");
  }
  documentElement=null;
}

/*函数防抖*/
function debounce(delay) {
  let preScrollTop = 0;
  let timer = null;
  let index = 0;

  return function (event) {

    /*event.returnValue = false;*/
    clearTimeout(timer);
    timer = setTimeout(function () {

      let height = document.documentElement.clientHeight;
      let delta = event.detail;
      /*let lastIndex = index;*/
     /* if (delta < 0) {
        index--;
        windowScroll(lastIndex * height, index * height, false);
      } else if (delta > 0) {
        index++;
        windowScroll(lastIndex * height, index * height, true);
      }*/

    }, delay | 100)
  }
}

/*鼠标下滑动画效果（第一版）*/
function animationMouseScroll(){
  let top = 0;
  return function(){
    setInterval(function () {
      let $this = $(".video-scroll-mouse");
      if (top == 180) {
        top = -20;
        $this.css("opacity", "0");
      }
      if (top == 0) {
        $this.css("opacity", "1");
      }
      top += 20;
      $this.css("top", "" + top + "px");
    }, 500)
  }
}
