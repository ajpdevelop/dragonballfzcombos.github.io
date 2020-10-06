<template>
  <div>
    <div v-for="combo in character.combos" :key="combo.video">
      <div class="comboContainer">
        <h3 v-text="combo.name"></h3>
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
  font-size: 38px;
  font-weight: bold;
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
  color: #42b983;
}
.comboContainer {
  border-bottom: 2px solid #ccc;
  margin-bottom: 12px;
}
</style>
