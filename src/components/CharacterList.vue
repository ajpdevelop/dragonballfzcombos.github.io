<template>
    <div>
        <h4 class="listHeader">Select your Fighter!</h4>
        <hr class="splitHr" />
        <div v-for="character in roster" :key="character.camel" 
            @click="selectCharacter(character)" 
            class="character col s2" :class="{selected: character.isSelected}">
            
            <div class="imgContainer">
                <div class="slant-bg" :style="{ 'background-color': character.color }"></div>
                <img :src="character.image" />
            </div>
            
            <!--<p>{{character.name}}</p>-->
        </div>

    </div>
</template>

<style>
.listHeader {
    font-family: "LeviReBrushed", Helvetica, Arial;
    font-size: 52px;
    text-shadow: 0 0 1px rgb(247, 158, 22), 0 0 1px rgb(247, 158, 22), 0 0 1px rgb(247, 158, 22), 0 0 1px rgb(247, 158, 22);
    width: 100%;
    text-align: center;

}
.splitHr {
    width: 80%;
    color: #ccc;
}
.character .imgContainer img { 
    height: 150px;
    display: block;
    margin: 0 auto;
}
.character {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    width: 100px;
    max-width: 100px;
    min-width: 100px;
    margin-top: 6px;
}
.character .imgContainer { 
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
}
.character .imgContainer .slant-bg {
  position: absolute;
  width: 150px;
  top: -60%;
  left: -50%;
  height: 590px;
  z-index: -1;
  transform: rotate(50deg);
}
.character p {
    text-align: center;
    font-weight: bold;
    font-size: 100%;
    margin: 0;
    white-space: nowrap;
}
.character.selected {
    opacity: .6;
}

</style>

<script>
export default {
    data: () => ({
        
    }),

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
        this.$store.dispatch("getFullRoster");
    }
}
</script>