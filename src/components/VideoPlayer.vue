<template>
  <div id="app">
  <div class="controls">
    <input v-model="videoId">
    <button @click="stopVideo">stop</button>
    <button @click="playVideo">Play</button><br />
    <input type="range" min="0" :max="duration" step="0.01" v-model="loopStart"><input v-model="loopStart"><br />
    <input type="range" min="0" :max="duration" step="0.01" v-model="loopEnd"><input v-model="loopEnd"><br />
  </div>
  
  <div id="player"></div>
  
  <div class="info">
    Video: <span v-text="videoId"></span><br />
    Duration: <span v-text="duration"></span><br />
    Current Time: <span v-text="currentTime"></span><br />
    Loop Seconds: <span v-text="loopStartSeconds"></span> <span v-text="loopEndSeconds"></span><br />
  </div>
</div>
</template>
<script>
/* eslint-disable */
    export default {
        props: [this.comboId],
        data: () => ({
            videoId: this.comboId,
            duration: 0,
            loopStart: 0.16,
            loopEnd: 1.05,
            currentTime: null,
            checkInterval: null
        }),
        computed: {
            character() {
                return this.$store.state.selectedCharacter;
            },
            loopStartSeconds() {
                return this.loopStart * 60;  
            },
            loopEndSeconds() {
                return this.loopEnd * 60;
            }
        },
        watch: {
            loopStart() {
                player.seekTo(this.loopStartSeconds, true);
            }
        },
        methods: {
          onPlayerReady(event) {
              //event.target.playVideo();
              this.duration = player.getDuration()/60;
          },
          onPlayerStateChange(event) {
              if (event.data == YT.PlayerState.PLAYING && !done) {
                  var self = this;
                  console.log("starting loop");
                  
                  this.checkInterval = setInterval(function() {
                      if (player.getCurrentTime)  
                        self.currentTime = player.getCurrentTime();
                    
                      if (self.loopStart && self.loopEnd && self.currentTime > self.loopEndSeconds) {
                          console.log("here");
                          player.seekTo(self.loopStartSeconds, true);
                      }
                  }, 250)
              } else if (event.data != YT.PlayerState.PLAYING) {
                  console.log("ending loop");
                  clearInterval(this.checkInterval);
              }
          },
          playVideo() {
                player.seekTo(this.loopStartSeconds, true);
                player.playVideo();
          },
          stopVideo() {
              player.stopVideo();
          }
        },
        mounted() {
            function onYouTubeIframeAPIReady() {
                player = new YT.Player("player", {
                    height: "390",
                    width: "640",
                    videoId: this.videoId,
                    events: {
                        onReady: this.onPlayerReady,
                        onStateChange: this.onPlayerStateChange
                    }
                })
            };
        }
    }

  var player;
  var done = false;
  var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
/* eslint-disable */
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type='range'] {
  display: block;
  width: 100%;
}
</style>
