<template>
    <div id="app">
        <div :id="playerId"></div>
        <div class="controls">
            <div class="buttons">
                <button @click="playVideo">Play</button>
                <button @click="stopVideo">Stop</button>
            </div>
            <div class="inputs">
                <input class="loopInput" v-model="loopStart" placeholder="Start">
                <input class="loopInput" v-model="loopEnd" placeholder="End">
            </div>
        </div>

        

        <div class="info">
            <!-- Video: <span v-text="videoId"></span><br /> -->
            Duration: <span v-text="duration"></span>
            Current Time: <span v-text="currentTime"></span>
            Loop Seconds: <span v-text="loopStartSeconds + ' s - ' + loopEndSeconds + ' s'"></span>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import YouTubePlayer from 'youtube-player';
var YTPlayer;
export default {
    props: {
        comboId: String
    },
    data: function() { return {
        videoId: this.comboId,
        duration: 0,
        loopStart: null,
        loopEnd: null,
        currentTime: null,
        checkInterval: null,
        player: null,
        done: false
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
            this.player.seekTo(this.loopStartSeconds, true);
        }
    },
    methods: {
        onPlayerReady(event) {
            //event.target.playVideo();
        },
        onPlayerStateChange(event) {
            this.player.getDuration().then(d => this.duration = (d/60).toFixed(2));
            if (event.data == YT.PlayerState.PLAYING && !this.done) {
                var self = this;
                console.log("starting loop");
                
                this.checkInterval = setInterval(function() {
                    self.player.getCurrentTime().then(ct => {
                        self.currentTime = ct.toFixed(2);
                
                        if (self.loopStart && self.loopEnd && self.currentTime > self.loopEndSeconds) {
                            console.log("here");
                            self.player.seekTo(self.loopStartSeconds, true);
                        }
                    });
                }, 250)
            } else if (event.data != YT.PlayerState.PLAYING) {
                console.log("ending loop");
                clearInterval(this.checkInterval);
            }
        },
        playVideo() {
            this.player.seekTo(this.loopStartSeconds, true);
            this.player.playVideo();
        },
        stopVideo() {
            this.player.stopVideo();
        },
        getPlayer() {
            return this.player;
        }
    },
    mounted() {
        this.player = YouTubePlayer(this.playerId);
        this.player.cueVideoById(this.videoId);
        this.player.on("ready", ev => this.onPlayerReady(ev));
        this.player.on("stateChange", ev => this.onPlayerStateChange(ev));
    }
}
/* eslint-enable */
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
    margin: 0;
}
div.controls {
    height: 36px;
    margin: 0 0 8px 0
}
.buttons, .inputs {
    display: inline-block;
    height: 100%;
}
.buttons button {
    height: 100%;
    margin-right: 26px;
    font-size: 24px;
    padding: 0px 12px 0px 12px;
}
.inputs {
    vertical-align: top;
}
.inputs input {
    width: 70px;
    font-size: 24px;
    height: 91%;
    padding: 0 4px;
    margin: 0 0 0 26px;
    border: 1px solid;
    text-align: center;
}
.inputs input:first-child {
    margin-left: 0;
}
::placeholder {
  color: slategray ;
  opacity: 1;
}
.info {
    font-size: 18px;
}
.info span {
    margin: 0 10px 0 0;
}
.info span:last-child {
    margin: 0;
}
</style>