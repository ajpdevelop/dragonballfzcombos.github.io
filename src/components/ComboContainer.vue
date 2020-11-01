<template>
  <v-layout class="conWrapper" row wrap>
    <v-card elavation-0 class="comboContainer" v-for="combo in character.combos" :key="combo.video" :style="
        [ !mobile ? { 'width': curWidth + 'px' } : { 'width': '100%' } ]
      ">
      <div class="aCombo">
        <h3 v-text="combo.name" :style="{ 'font-size': h3size + 'px'} "></h3>
        <p class="author" :style="{ 'font-size': h3size + 'px'} ">YouTube Channel: <a target="_blank" rel="noopener noreferrer" v-text="combo.author" :href="combo.authorUrl"></a></p>
        <VideoPlayer :combo-id="combo.video" :font-size="fontsize"/>
      </div>
    </v-card>
  </v-layout>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';
import { VCard, VLayout } from "vuetify/lib/components";

export default {
  data: () => ({
    curWidth: 650,
    h3size: 18,
    fontsize: 18
  }),
  props: {
    currentTab: Number
  },
  components: { 
    VideoPlayer,
    VCard, VLayout
  },
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
    }
  },
  watch: {
    getSize() {
      this.containerSize();
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
