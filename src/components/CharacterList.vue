<!-- This is the component that shows all of the character's images for the user to select one. -->
<template>
    <v-container class="charList">
        <v-row>
            <v-col cols="12">
                <h4 class="listHeader">Select your Fighter!</h4>
                <hr class="splitHr" />
            </v-col>
            <v-col>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2" v-for="character in roster" :key="character.camel" 
                @click="selectCharacter(character)" 
                class="character" :class="{selected: character.isSelected}">
                
                <div class="imgContainer">
                    <img :src="character.image" />
                    <div class="slant-bg" :style="{ 'background-color': character.color }"></div>
                </div>
                
                <!--<p>{{character.name}}</p>-->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { VContainer, VRow, VCol } from "vuetify/lib/components";

// Using Vuex store to globally control the drawer, character information from json, and selected character.

export default {
    data: () => ({
        
    }),
    components: { VContainer, VRow, VCol },

    computed: {
        roster() {
            return this.$store.state.roster;
        }
    },
    methods: {
        selectCharacter(character) {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                this.$store.state.drawerState = !this.$store.state.drawerState
            }
            return this.$store.commit("setSelectedCharacter", character);
        }
    },
    mounted() {
        this.$store.dispatch("getFullRoster");
    }
}
</script>

<style>
.charList {
    background-color: var(--v-darker-base);
}
.listHeader {
    font-family: "LeviReBrushed", Helvetica, Arial;
    color: white;
    font-size: 38px;
    text-shadow: 0 0 4px var(--v-cpurple-base), 0 0 4px var(--v-cpurple-base), 0 0 4px var(--v-cpurple-base), 0 0 4px var(--v-cpurple-base);
    width: 100%;
    text-align: center;
    margin: 12px 0 12px 0;

}
.splitHr {
    width: 80%;
    margin: 0 auto;
    border-color: var(--v-cyellow-base);
}
.character .imgContainer img { 
    height: 150px;
    display: block;
    margin: 0 auto;
    z-index: 1;
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
  transform: rotate(50deg);
  opacity: .4;
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