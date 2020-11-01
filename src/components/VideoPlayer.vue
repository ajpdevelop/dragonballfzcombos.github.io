<template>
    <div id="app">
        <div class="ytcontainer" :style="[
        !small && !xsmall?
        { 'width': this.$store.state.curVideoSize.width + 'px', 'height': this.$store.state.curVideoSize.height + 'px' } :
        { 'width': '100%', 'height': this.vidHeight + 'px' }
        ]">
            <div :id="playerId" ></div>
        </div>
        <div class="controls" :style="{ 'font-size': fontSize + 'px'}" >
            <div class="topHalf">
                <v-row>
                    <v-col cols="8">
                        <p class="loop">Loop Video</p>
                    </v-col>
                    <v-col cols="4">
                        <div class="timeInfo">
                            Current Time: 
                        </div>
                    </v-col>
                </v-row>
            </div>
                
            <div class="bottomHalf">
                <v-row>
                    <v-col cols="8">
                        <div class="anInput">
                            <input class="loopInput" v-model="loopStart" placeholder="0:00">
                            <span>min:sec</span>
                        </div>
                        <p class="seperatorTo">to</p>
                        <div class="anInput" style="margin-right: 0;">
                            <input class="loopInput" v-model="loopEnd" placeholder="0:00">
                            <span>min:sec</span>
                        </div>
                        <v-btn :style="{backgroundColor : '#1e1e1e', border : '1px solid #FFF'}" @click="playVideo">Restart Loop</v-btn>
                    </v-col>
                    <v-col cols="4">
                        <span class="currentTime" v-text="ctFormatted[0] + ' ' + ctFormatted[1]"></span>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import YouTubePlayer from 'youtube-player';

import { VRow, VCol, VBtn } from "vuetify/lib/components";

var YTPlayer;
export default {
    props: {
        comboId: String,
        currentTab: Number,
        fontSize: Number
    },
    components: {
        VRow, VCol, VBtn
    },
    data: function() { return {
        videoId: this.comboId,
        duration: 0,
        loopStart: null,
        loopEnd: null,
        currentTime: null,
        ctFormatted: ['',''],
        checkInterval: null,
        player: null,
        done: false,
        vidHeight: null
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
            let lSta = this.loopStart.split(':');
            console.log('Start Split    ' + lSta);
            let staTotal = (parseFloat(lSta[0]) >= 1 ? (parseFloat(lSta[0]) * 60) : 0) + parseFloat(lSta[1]);

            console.log('Start Total    ' + staTotal)

            if(this.loopStart !== null) {
                return staTotal;  
            } else { null }
        },
        loopEndSeconds() {
            let lSta = this.loopEnd.split(':');
            console.log('End Split    ' + lSta);
            let staTotal = (parseFloat(lSta[0]) >= 1 ? (parseFloat(lSta[0]) * 60) : 0) + parseFloat(lSta[1]);

            console.log('End Total    ' + staTotal)

            if(this.loopStart !== null) {
                return staTotal;  
            } else { null }
        },
        small() {
            return this.$vuetify.breakpoint.sm
        },
        xsmall() {
            return this.$vuetify.breakpoint.xs
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
                        self.currentTime = ct;

                        self.ctFormatted = [
                            (self.currentTime > 60 ? Math.floor(self.currentTime / 60) + ' min' : ''),
                            (self.currentTime.toFixed(2) > 60 ? (self.currentTime - Math.floor(self.currentTime / 60 ) * 60).toFixed(0) + ' sec': self.currentTime.toFixed(0) + ' sec')
                        ]
                
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
        },
        setHeight() {
            var heightNum = parseFloat(document.querySelector(".ytcontainer").clientWidth);
            this.vidHeight = heightNum * 0.5625;
        }
    },
    created() {
        window.addEventListener("resize", this.setHeight);
    },
    destroyed() {
        window.removeEventListener("resize", this.setHeight);
    },
    mounted() {
        this.player = YouTubePlayer(this.playerId, {width: '100%', height: '100%'});
        this.player.cueVideoById(this.videoId);
        this.player.on("ready", ev => this.onPlayerReady(ev));
        this.player.on("stateChange", ev => this.onPlayerStateChange(ev));
        this.setHeight();
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
}
.timeInfo {
    padding: 6px 0 0 0;
}
.anInput {
    width: 72px;
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
.anInput span {
    font-size: 90%;
}
.seperatorTo {
    float: left;
}
.resetLoop {
    border: 1px solid white;
    padding: 3px 8px 2px 8px;
    margin-left: 8px;
    border-radius: 8px;
}
.v-btn {
    margin-left: 16px;
}
</style>