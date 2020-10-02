<template>
    <div>
        <div v-for="character in roster" :key="character.camel" @click="selectCharacter(character)" class="character col s4" :class="{selected: character.isSelected}">
            <div class="slant-bg" :style="{ 'background-color': character.color }"></div>
            <img :src="character.image" />
            <p :style="{ 'color': character.color }">{{character.name}}</p>
        </div>
    </div>
</template>

<style>
.character img { 
    height: 250px;
    display: block;
    margin: 0 auto;
}
.character {
    position: relative;
    overflow: hidden;
    cursor: pointer;
}
.character .slant-bg {
  position: absolute;
  width: 100px;
  top: -60%;
  left: -50%;
  height: 900px;
  z-index: -1;
  transform: rotate(63deg);
}
.character p {
    font-weight: bold;
    font-size: 130%;
    min-height: 60px;
}
.character.selected {
    opacity: .6;
}
</style>

<script>
export default {
    computed: {
        roster() {
            return this.$store.state.roster;
        }
    },

    methods: {
        selectCharacter(character) {
            return this.$store.commit("setSelectedCharacter", character);
        }
    },
    
    mounted() {
        this.$store.dispatch("roseter.fetchAll");
    }
}
</script>