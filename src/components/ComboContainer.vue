<template>
  <v-row class="conWrapper">
    <v-col class="pa-0 ma-0 flex-grow-0" v-for="video in aVideo" :key="video.vfUrl" >
    <v-card elavation-0 class="comboContainer" :style="
        [ !mobile ? { 'width': curWidth + 'px' } : { 'width': '100%' } ]
     ">
      <div class="aCombo">
        <h3 v-text="video.vidDetails.title" :style="{ 'font-size': h3size + 'px'} "></h3>
        <p class="author" :style="{ 'font-size': h3size + 'px'} ">YouTube Channel: <a target="_blank" rel="noopener noreferrer" v-text="video.vidDetails.author" :href='"https://www.youtube.com/channel/" + video.vidDetails.authorlink'></a></p>
        <ComboPlayer :vfCategories="video.vfCategories" :vfComboCount="video.combos.vfNotations.length" :vfNotations="video.combos.vfNotations" :vfStart="video.combos.vfStart" :vfEnd="video.combos.vfEnd" :combo-id="video.vfUrl" :font-size="fontsize"/>
      </div>
    </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ComboPlayer from './ComboPlayer.vue';
import axios from 'axios';
import { VCard, VRow, VCol } from "vuetify/lib/components";
const db = require('../db/db');

export default {
  data: () => ({
    curWidth: 650,
    h3size: 18,
    fontsize: 18,
    aVideo: [],
    vfComboCount: [0]
  }),
  props: {
    currentTab: Number
  },
  components: { 
    ComboPlayer,
    VCard, VRow, VCol
  },
  computed: {
    character() {
      if(this.currentTab === 1){
          return this.$store.state.characterOne;
      } else if(this.currentTab === 2) {
          return this.$store.state.characterTwo;
      } else if (this.currentTab === 3){
          return this.$store.state.characterThree;
      } else { return null; }
    },
    getSize() {
      return this.containerSize();
    },
    mobile() {
        return this.$vuetify.breakpoint.sm
    },
  },
  methods: {
    containerSize() {
      if(this.$store.state.curVideoSize.width === 640) {
        return this.curWidth = 650,
          this.h3size = 18,
          this.fontsize = 18;
      } 
      else if(this.$store.state.curVideoSize.width === 426) {
        return this.curWidth = 500,
          this.h3size = 16,
          this.fontsize = 14;
      } 
      else if(this.$store.state.curVideoSize.width === 256) {
        return this.curWidth = 356,
          this.h3size = 14,
          this.fontsize = 12;
      }
      return 650;
    },
    getCharDetails() {
      var self = this;
      this.aVideo = [];
      
      // Get all entries for selected character
      db.firestore.collection('approvedVideos').where("fighter", "==", this.character.name).get()
        .then(doc => {
          // Create new Empty Obj. 
          console.log('New obj created... : ');
          if(doc) {
            // Now grab the details and combos for each one.
            doc.forEach(doc => {
              let newObj = {
                vfUrl: '', 
                vidDetails: {
                  title: '',
                  author: '',
                  authorlink: ''
                },
                vfCategories: [],
                combos: {
                  vfEnd: [],
                  vfStart: [],
                  vfNotations: [],
                }
              }
              //Lets grab youtube details now...
              var apiKey = 'AIzaSyDs06LHlkoQ7U4tTnQzwk54D-i3fBg7HxA';
              var youTubeURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + doc.data().url + '&key=' + apiKey;
              axios
              .get(youTubeURL)
              .then(response => {
                console.log('YT REsponse');
                console.log(response);
                newObj.vidDetails.title = response.data.items[0].snippet.title;
                newObj.vidDetails.author = response.data.items[0].snippet.channelTitle;
                newObj.vidDetails.authorLink = response.data.items[0].snippet.channelId;
              })
            newObj.vfUrl = doc.data().url;
            newObj.vfCategories = doc.data().categories;
            console.log('Just set vfUrl and vfCategories into newObj... : ');
            db.firestore.collection('approvedVideos').doc(doc.id).collection('combos').orderBy('id').get()
              .then(doc => {
                console.log('Now into the combos loop...');
                doc.forEach(doc => {
                  newObj.combos.vfEnd.push(doc.data().endTime);
                  newObj.combos.vfStart.push(doc.data().startTime);
                  newObj.combos.vfNotations.push(doc.data().notation);
                })
                console.log('Finished looping combos... newObj : ');
                console.log(newObj);
                return newObj;
              })
              self.aVideo.push(newObj)
            })
          }
        })
        .then(function(){
          console.log('New aVideo')
          console.log(self.aVideo);
        });
      }
    },
    watch: {
      getSize() {
        this.containerSize();
      },
      character() {
        this.getCharDetails();
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 0 6px 28px;
  color: white;
}
.comWrapper {
  text-align: center;
}
.author {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  padding: 0 0 12px 44px;
  color: var(--v-cyellow-base);
}
.author a {
  color: var(--v-cpurple-base);
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: var(--v-cpurple-base);
}
.comboContainer {
  background-color: var(--v-primary-base);
  width: 650px;
  margin: 0 10px 20px;
}
</style>
