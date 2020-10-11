<template>
  <div>
    <div class="comboContainer" v-for="combo in character.combos" :key="combo.video">
      <div class="aCombo">
        <h3 v-text="combo.name"></h3>
        <p class="author">YouTube Channel: <a target="_blank" rel="noopener noreferrer" v-text="combo.author" :href="combo.authorUrl"></a></p>
        <VideoPlayer :combo-id="combo.video" />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';

export default {
  components: { 
      VideoPlayer
  },
  computed: {
      character() {
          return this.$store.state.selectedCharacter;
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
}
.author {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  padding: 0 0 12px 44px;
}
.author a {
  color: rgb(133, 96, 254);
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
  color: rgb(133, 96, 254);
}
.aCombo {
  border: 2px solid #ccc;
  padding-bottom: 12px;
  margin-bottom: 10px;
}
.comboContainer:nth-child(odd) {
  background-color: var(--v-accent);
}
</style>
