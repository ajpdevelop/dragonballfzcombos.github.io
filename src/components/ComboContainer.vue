<template>
  <div>
    <div v-for="combo in character.combos" :key="combo.video">
      <div>
        <p v-text="combo.name"></p>
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
  margin: 40px 0 0;
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
</style>
