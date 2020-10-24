<template>
    <div id="app">
        <div class="ytcontainer" :style="{
            'width': this.$store.state.curVideoSize.width + 'px',
            'height': this.$store.state.curVideoSize.height + 'px'
        }">
            <div :id="playerId" width="320" height="240" ></div>
        </div>
        <div class="controls" :style="{ 'font-size': fontSize + 'px'}" >
            <div class="topHalf">
                <p class="loop">Loop Video</p>
                <div class="timeInfo">
                    Current Time: 
                </div>
            </div>
                
            <div class="bottomHalf">
                <div class="anInput">
                    <input class="loopInput" v-model="loopStart" placeholder="0:00">
                    <span>min:sec</span>
                </div>
                <p class="seperatorTo">to</p>
                <div class="anInput">
                    <input class="loopInput" v-model="loopEnd" placeholder="0:00">
                    <span>min:sec</span>
                </div>
                <button class="resetLoop" @click="playVideo">Restart Loop</button>
                <span class="currentTime" v-text="currentTime + ' s'"></span>
            </div>
            
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import YouTubePlayer from 'youtube-player';
var YTPlayer;
export default {
    props: {
        comboId: String,
        currentTab: Number,
        fontSize: Number
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
            if(this.currentTab === 1){
                return this.$store.state.characterOne;
            } else if(this.currentTab === 2) {
                return this.$store.state.characterTwo;
            } else if (this.currentTab === 3){
                return this.$store.state.characterThree;
            } 
            return null;
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
                
                this.checkInterval = setInterval(function() {
                    self.player.getCurrentTime().then(ct => {
                        self.currentTime = ct.toFixed(2);
                
                        if (self.loopStart && self.loopEnd && self.currentTime > self.loopEndSeconds) {
                            self.player.seekTo(self.loopStartSeconds, true);
                        }
                    });
                }, 250)
            } else if (event.data != YT.PlayerState.PLAYING) {
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
        this.player = YouTubePlayer(this.playerId, {width: '100%', height: '100%'});
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
.ytcontainer {
    margin: 0 auto;
}
button:focus {
    background-color: var(--v-accent-base);
}
.inputs input:focus {
    box-shadow: none;
    border: 0;
}
.timeInfo span {
    color: var(--v-cpurple-base);
}

.controls {
    text-align: left;
}
input {
    color: var(--v-cpurple-base);
}
input:focus {
    border-bottom: 1px solid white!important;
    box-shadow: none!important;
}
::placeholder {
  opacity: 1;
  color: var(--v-cyellow-base);
}
.topHalf {
    overflow: hidden;
    height: 36px;
}
.bottomHalf {
    overflow: hidden;
}
.loop {
    padding: 6px 0 4px 12px;
    width: 30%;
    float: left;
}
.timeInfo {
    padding: 6px 36px 0 0;
    width: 69%;
    float: right;
    text-align: right;
}
.anInput {
    width: 86px;
    margin: 0 14px 6px 12px;
    float: left;
    text-align: center;
}
.anInput input {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    border: 1px solid white;
    height: 32px;
    margin: 0;
}
.seperatorTo {
    float: left;
}
.currentTime {
    float:right;
    padding: 0 100px 4px 0;
}
.resetLoop {
    border: 1px solid white;
    padding: 3px 8px 2px 8px;
    margin-left: 8px;
    border-radius: 8px;
}
</style>