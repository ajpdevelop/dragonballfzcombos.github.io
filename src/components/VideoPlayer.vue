<template>
    <div id="app">
        <div class="controls">
            <input v-model="videoId">
            <button @click="stopVideo">stop</button>
            <button @click="playVideo">Play</button><br />
            <input type="range" min="0" :max="duration" step="0.01" v-model="loopStart"><input v-model="loopStart"><br />
            <input type="range" min="0" :max="duration" step="0.01" v-model="loopEnd"><input v-model="loopEnd"><br />
        </div>

        <div :id="playerId"></div>

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
import YouTubePlayer from 'youtube-player';

var YTPlayer;
var player;
var done = false;

export default {
    props: {
        comboId: String
    },
    data: function() { return {
        videoId: this.comboId,
        duration: 0,
        loopStart: 0.16,
        loopEnd: 1.05,
        currentTime: null,
        checkInterval: null
    }},
    computed: {
        character() {
            return this.$store.state.selectedCharacter;
        },
        playerId() {
            return "player" + this.videoId;
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
        },
        getPlayer() {
            return player;
        }
    },
    mounted() {
        player = YouTubePlayer(this.playerId);
        player.loadVideoById(this.videoId);
        player.on("ready", ev => this.onPlayerReady(ev));
        player.on("stateChange", ev => this.onPlayerStateChange(ev));
    }
}
/* eslint-enable */
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type='range'] {
  display: block;
  width: 100%;
}
</style>
