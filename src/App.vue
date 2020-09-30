<template>
  <div id="app" class="roster">
    <HelloWorld msg="Dragonball Fighterz Combos"/>
    <ul v-for="char in roster" :key="char.name">
      <li><p>{{char.name}}</p>
        <br />
        <img v-bind:src="char.image" />
      </li>
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
  width: 100%;
  display: block;
  float: left;
}
.roster ul {
  width: 20%;
  display: inline-block;
}
.roster ul li {
  width: 100%;
  text-align: center;
}
</style>
