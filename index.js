window.index = 0;

$(function () {

  /*加载控件事件*/
  initEvents();


  //火狐浏览器
  document.addEventListener('DOMMouseScroll', scrollBarMouseWheel());
  document.onmousewheel = scrollBarMouseWheel();

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
    let $this = $(this);
    $this.removeClass("left-nav-unfold");
    $this.addClass("left-nav-shrink");
    $(".left-nav-extend").css("top", "-600px");
  })

  /*点击导航栏*/
  $(".nav-extend-ul li").click(function () {
    window.index = $(this).index();
    console.log(window.index);
    if (window.index < 5) {
      containerSlide((-window.index  * 100) + "%", (window.index  * 18) + "%");
    }

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
    let width = document.documentElement.clientWidth;
    if (width < 1240) {
      width = 1240;
    }
    $(".ul-li-show").width("" + width * 0.44 * 0.33 + "px");
  })

  /*-------------------------------------第二版(news)--------------------------------------------------*/

  let index=0;
  let length=document.querySelectorAll(".news-slide-nav li").length;
  let timer;

  /*点击切换（非循环）*/
  $(".news-slide-nav li").click(function () {
    $(".slide-nav-active").removeClass("slide-nav-active");
    $(this).addClass("slide-nav-active");
    $(".news-slide-all").css("left", "" + (-($(this).index() + 1)) * 100 + "%");
    index=$(this).index();
  })

  /*新闻栏的自动轮播*/
  timer=setInterval(newsSlide,2000);

  $(".news-slide-show").hover(function () {
      clearInterval(timer);
  },function(){
      timer=setInterval(newsSlide,2000);
  })

  function newsSlide(){
    $(".news-slide-nav li").eq(index).trigger("click");
    index=(index+1)%length;
  }


  /*-------------------------------------第三版(factions)--------------------------------------------------*/

  let audioPlayer=null;
  let timer02=null;


  /*展开角色集团内容*/
  $(".character-type-list li a").click(function () {

    $(".character-type-list li a").height(0);

    $(".character-no-active").css("display","block");

    let $mask = $(this).parent("li").children(".type-list-on");
    $mask.height(0);

    let $factionsList = $(".character-type-list");
    $factionsList.removeClass("character-type-list-ready");

    let index=$(this).parent("li").index();

    $(".character-list").eq(index).addClass("character-list-active");
    $(".section-factions-logo").eq(index).addClass("section-factions-logo-active");

    setTimeout(function () {
      $(".character-type-list").css("display", "none");
      $(".section-character-bg").css("opacity", "0");
      $mask.height("100%");

      $factionsList.addClass("character-type-list-ready");
      $factionsList = null;
    }, 300)




  })

  /*关闭角色集团所展开的内容*/
  $(".section-factions-logo").click(function () {
    $(".character-no-active").css("display","none");

    let $mask=$(".character-list-mask");
    $mask.trigger("click");
    $mask.css("display","none");
    $mask=null;


    $(this).css("opacity", "0");

    $(".character-list-active").removeClass("character-list-active");
    $(".section-factions-logo-active").removeClass("section-factions-logo-active");

    let $factionsList = $(".character-type-list");

    $factionsList.css("display", "block");
    $(".character-type-list li a").height("100%");
    $(".section-character-bg").css("opacity", "1");

    /*消除事件未加载完毕时hover造成的影响*/
    $factionsList.removeClass("character-type-list-ready");
    setTimeout(function () {
      $factionsList.addClass("character-type-list-ready");
      $factionsList = null;
    }, 500)

  })

  /*展开角色详情*/
  $(".character-no-active").click(function(){
    $(this).addClass("character-active");
    $(this).removeClass("character-can-hover");
    $(".character-list-mask").css("display","block");
    let $this= $(this);

    setTimeout(function () {
      $this.find(".character-type").addClass("character-type-active");
      $this.find(".character-info").addClass("character-info-active");
      $this=null;
    },300)
  })

  /*关闭角色详情*/
  $(".character-list-mask").click(function () {
    if(audioPlayer){
      audioPlayer.stop();
      cvEnded($(".info-cv-logo-active"));
    }
    let $characterActive=$(".character-active");
    $(".character-type").removeClass("character-type-active");
    $(".character-info").removeClass("character-info-active");


    $(".character-list-mask").css("display","none");

    setTimeout(function () {
      $characterActive.removeClass("character-active");
      $characterActive.addClass("character-can-hover");
      $characterActive=null;
    },300)
  })

  /*角色CV的播放*/
  $(".character-info-cv").click(function(){
    let $this= $(this);

    if(!audioPlayer){
      audioPlayer=new Player($this.children("audio"));
    }
    audioPlayer.stop();
    audioPlayer.play();

    $this.find(".info-cv-logo").addClass("info-cv-logo-active");
    timer02=setInterval(function () {
     $this.find(".info-cv-box-shadow").toggleClass("info-cv-box-shadow-active");
    },500)


    audioPlayer.playEnded(function(){
      $this.find(".info-cv-logo").removeClass("info-cv-logo-active");
      $this.find(".info-cv-box-shadow").removeClass("info-cv-box-shadow-active");
      clearInterval(timer02);
      timer02=null;
      audioPlayer=null;
    })

  })

  /*角色CV的结束*/
  function cvEnded($active){
    $active.removeClass("info-cv-logo-active");
    $active.find(".info-cv-box-shadow").removeClass("info-cv-box-shadow-active");
    clearInterval(timer02);
    timer02=null;
    audioPlayer=null;
  }



  /*-------------------------------------第四版(story)--------------------------------------------------*/

  /*展开故事详情*/
  $(".story-mask").click(function () {
    let $liParent = $(this).parent(".story-details-inner").parent(".story-details");
    $liParent.addClass("st-active");
    $liParent.find(".story-mask").removeClass("story-mask");
    $liParent.siblings().addClass("st-no-active");
    setTimeout(function () {
      $liParent.find(".details-content").css({"opacity": "1", "height": "50%",});
      $liParent = null;
    }, 1000)
  })

  /*关闭故事详情*/
  $(".details-close").click(function () {
    let $liParent = $(this).parent(".details-content").parent(".story-logo").parent(".story-details-inner").parent(".story-details");
    $liParent.removeClass("st-active");
    $liParent.children(".story-details-inner").children("a").eq(1).addClass("story-mask");
    $liParent.siblings().removeClass("st-no-active");
    $(this).parent(".details-content").css({"opacity": "0", "height": "0%",});
    $liParent = null;
  })

  /*hover故事图标*/
  $(".story-mask").hover(function () {
    let $innerParent = $(this).parent(".story-details-inner");
    $innerParent.find(".story-log-img").css("transform", "scale(1.1)");
    $innerParent.find(".story-title").addClass("story-title-show");
    $innerParent = null;
  }, function () {
    let $innerParent = $(this).parent(".story-details-inner");
    $innerParent.find(".story-log-img").css("transform", "scale(1)");
    $innerParent.find(".story-title").removeClass("story-title-show");
    $innerParent = null;
  })

  /*-------------------------------------第五版(archive)--------------------------------------------------*/

  /*点击打开图片*/
  $(".archive-list").click(function () {
    $(".archive-active").css("display", "flex");
    $(".archive-active-mask").css("opacity", "0.5");
  })

  /*点击任意区域关闭图片*/
  $(".archive-active").click(function () {
    $(".archive-active").css("display", "none");
    $(".archive-active-mask").css("opacity", "0");
  })


  /*-------------------------------------尾部(footer)--------------------------------------------------*/

  /*-------------------------------------滚动条(scroll)--------------------------------------------------*/
  /*加载滚动条监听器*/
  $(".container-inner-scrollbar").mouseenter(function () {
    $(".container-inner-scrollbar").click(scrollBarClick);
  })


  /*取消滚动条监听器*/
  $(".container-inner-scrollbar").mouseleave(function () {
    $(this).off("click");
  })

}

/*窗口变化*/
function windowSize() {
  let documentElement = document.documentElement;
  let height = documentElement.clientHeight;
  let width = documentElement.clientWidth;
  $(".section").css("height", "" + height + "px");
  if (width < 1240) {
    width = 1240;
  }
  $(".ul-li-show").width("" + width * 0.44 * 0.33 + "px");
  documentElement = null;
}

/*窗口滚动*/
function containerSlide(containerPosition, scrollThumbPosition) {
  $(".container-inner").css("top", containerPosition);
  $(".container-inner-scrollbar-thumb").css("top", scrollThumbPosition);
  $(".extend-ul-li-active").removeClass("extend-ul-li-active");
  $(".nav-extend-ul").children("li").eq(window.index).children(".extend-ul-li-notactive").addClass("extend-ul-li-active");
}

/*鼠标点击滚动*/
function scrollBarClick(e) {
  let clientHeight = document.documentElement.clientHeight;
  let innerHeight = $(".container-inner").innerHeight();
  let value = e.clientY / clientHeight;
  if (value >= 0.812) {
    value = 0.812;
  }
  window.index = Math.floor(value / 0.2);
  containerSlide(-innerHeight * value + "px", value * 100 + "%",  window.index );
}

/*鼠标拖拽滚动*/
function scrollBarDrag(e) {
}

/*鼠标滑轮滚动*/
function scrollBarMouseWheel(delay) {
  let totalIndex = document.querySelectorAll(".section").length;
  let sectionHeight = $(".section").innerHeight();
  let footHeight = $(".footer").innerHeight();
  let delta;
  let timer = null;

  return function (e) {
    clearTimeout(timer);
    delta=e.wheelDelta?e.wheelDelta:-(e.detail);
    timer = setTimeout(function () {
      if (delta < 0) {
        if (window.index < totalIndex - 1) {
          /* console.log("下滑");*/
          window.index++;
          containerSlide((-window.index * sectionHeight) + "px", (window.index * 18) + "%");
        } else {
          window.index = totalIndex;
          containerSlide((sectionHeight * (-window.index + 1) - footHeight) + "px", (100 - 18) + "%");
        }
      } else {
        /*  console.log("上滑");*/
        if (window.index != 0) {
          window.index--;
        }
        containerSlide((-window.index * sectionHeight) + "px", (window.index* 18) + "%");
      }
    }, delay | 300)
  }
}

/*鼠标下滑动画效果（第一版）*/
function animationMouseScroll() {
  let top = 0;
  return function () {
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
