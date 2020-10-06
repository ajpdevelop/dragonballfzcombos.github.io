<template>
  <div>
    <div class="comboContainer" v-for="combo in character.combos" :key="combo.video">
      <div class="aCombo">
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
  font-size: 32px;
  font-weight: bold;
  padding: 8px 0 12px 28px;
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
.aCombo {
  border: 2px solid #ccc;
  padding-bottom: 12px;
  margin-bottom: 10px;
}
.comboContainer:nth-child(odd) {
  background-color: rgb(252, 233, 209);
}
</style>
