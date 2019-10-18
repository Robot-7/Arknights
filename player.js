(function(){
  function Player(player){
    return new Player.prototype.init(player);
  }
  Player.prototype={
    constructor:Player,
    pv:["https://ak.hypergryph.com/assets/index/video/pv.mp4",
      "https://ak.hypergryph.com/assets/index/video/pv2.mp4"],
    init:function(player){
       this.$player=$(player);
       this.player=this.$player.get(0);
    },
    videoCover:function($cover){
      this.player.oncanplaythrough=function () {
        console.log("视频加载完毕");
        $cover.css("opacity","0");
      }
    },
    selectPV:function(index){
      this.player.src=this.pv[index];
    },

    play:function(){
      this.player.play();
    },
    playEnded:function (fn) {
      this.player.onended=function () {
        fn();
      }
    },


    initCV:function(fn){
      fn();
      if(!this.player.autoplay){
        this.player.autoplay="autoplay";
      }
      this.$player.attr("controls","controls");
      this.player.muted=false;
      this.player.play();
    },
    releaseCV:function(fn){
      let it_self=this;
      this.player.onended=function () {
        it_self.stop();
        it_self.$player.removeAttr("controls");
        fn();
      }
    },
    pauseCV:function(){
        this.player.pause();
    },


    stop:function(){
      this.player.currentTime=0;
      this.player.pause();
    }

  }
  Player.prototype.init.prototype=Player.prototype;
  window.Player=Player;

})(window)
