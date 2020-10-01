<template>
  <div id="app" class="roster">

    <HelloWorld msg="Dragonball Fighterz Combos"/>
    <div v-for="char in roster" :key="char.camel" class="charContainer">

      <ul @click="char.isExpanded = !char.isExpanded">
        <li class="char">
          <div class="layer1">
            <img :src="char.image" />
          </div>
          <div class="layer2" :style="{ 'background-color': char.color }"></div>
        </li>
        <li><p>{{char.name}}</p></li>
      </ul>
    
    <div :id="char.camel" v-if="char.isExpanded">
      <p>stuff<br />stuff<br />stuff<br />stuff</p>
    </div>
      
    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
//import ComboContainer from './componenets/ComboContainer.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
    //ComboContainer
  },
  data: function() {
    return {
      roster: [],
      isExpanded: false
    };
  },
  created: function() {
    this.$axios.get("https://dbfzcs.s3.us-east-2.amazonaws.com/roster.json")
    .then(res => {
      console.log(res.data);
      for(var character in res.data) {
        res.data[character].isExpanded = false;
      }
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
.roster .charContainer {
  width: 12%;
  padding: 0 10px;
  display: inline-block;
}
.roster ul {
  width: 100%;
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
.expanded-menu {
  visibility: hidden;
}
</style>
