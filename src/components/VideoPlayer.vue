<template>
    <div id="app">
        <div :id="playerId"></div>
        <div class="controls">
            <div class="buttons">
                <button @click="playVideo">Play</button>
                <button @click="stopVideo">Pause</button>
                <button @click="resumeVideo">Resume</button>
            </div>
            <div class="inputs">
                <p>Loop video from</p>
                <div class="anInput">
                    <input class="loopInput" v-model="loopStart" placeholder="Start">
                    <span>sec</span>
                </div>
                <p>to</p>
                <div class="anInput">
                    <input class="loopInput" v-model="loopEnd" placeholder="End">
                    <span>sec</span>
                </div>
            </div>
        </div>

        

        <div class="info">
            <!-- Video: <span v-text="videoId"></span><br /> -->
            Duration: <span v-text="duration + ' min'"></span>
            Current Time: <span v-text="currentTime + ' s'"></span>
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
            return this.loopStart;  
        },
        loopEndSeconds() {
            return this.loopEnd;
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
        resumeVideo() {
            this.player.playVideo();
        },
        stopVideo() {
            this.player.pauseVideo();
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
.controls {
    height: 36px;
    margin: 8px 0 8px 0
}
.buttons, .inputs {
    display: inline-block;
    height: 100%;
}
.buttons button {
    height: 100%;
    margin-right: 20px;
    font-size: 24px;
    padding: 0px 12px 0px 12px;
    border-radius: 10px;
}
button:focus {
    background-color: #e8c56a;
}
.inputs input:focus {
    box-shadow: none;
    border: 0;
}
.inputs {
    vertical-align: top;
}
.inputs p {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
}
.anInput {
    display: inline-block;
    margin: 0 8px;
    height: 100%;
    border: 1px solid;
}
.anInput span{
    display:inline-block;
    height:  100%;
    font-size: 16px;
    height: 100%;
    padding: 0 8px 0 0;
    text-align: center;
}
.inputs input {
    width: 70px;
    font-size: 24px;
    height: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
    border: 0;
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