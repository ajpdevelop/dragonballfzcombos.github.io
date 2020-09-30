<template>
  <div id="app" class="roster">
    <HelloWorld msg="Dragonball Fighterz Combos"/>
    <ul v-for="char in roster" :key="char.name">
      <li class="char">
        <div class="layer1">
          <img v-bind:src="char.image" />
        </div>
        <div class="layer2" v-bind:style="{ 'background-color': char.color }"></div>
      </li>
      <li><p>{{char.name}}</p></li>
    </ul>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      roster: []
    };
  },
  created: function() {
    this.$axios.get("https://dbfzcs.s3.us-east-2.amazonaws.com/roster.json")
    .then(res => {
      console.log(res.data);
      this.roster = res.data;
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.roster {
  width: 80%;
  display: block;
  margin: 0 auto;
}
.roster ul {
  width: 12%;
  padding: 0 10px;
  display: inline-block;
}
.roster ul li {
  list-style: none;
}
.roster ul li p {
  font-size: 16px;
  margin: 0;
  font-weight: bold;
}
.roster ul .char {
  width: 100%;
  height: 240px;
  display: flex;
  list-style: none;
  overflow: hidden;
  border-radius: 40px;
}
.roster ul .char .layer1 {
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
}
.roster ul .char .layer2 {
  width: 100%;
  margin-left: -100%;
  height: 484px;
  z-index: 1;
  transform: rotate(57deg);
}
.roster ul .char .layer1 img {
  height: 100%;
}
</style>
