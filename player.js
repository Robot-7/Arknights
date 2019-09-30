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
    stop:function(){
      this.player.currentTime=0;
      this.player.pause();
    }
  }
  Player.prototype.init.prototype=Player.prototype;
  window.Player=Player;

})(window)
