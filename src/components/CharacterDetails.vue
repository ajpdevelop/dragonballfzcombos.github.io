<!-- If no character is selected hide the component. If there is a selected character show the component in the current tab and pass in the selected character's data to the ComboContainer component to render it. -->
<template>
    <div class="charDetails">
        <h4 v-if="this.character !== null" v-text="character.name"></h4>
        <ComboContainer :current-tab="this.currentTab" :character="this.character" />
    </div>
</template>

<script>
import ComboContainer from './ComboContainer.vue';

export default {
    props: {
        currentTab: Number
    },
    computed: {
        // From the Vuex store grab the correct selected character based on which tab is selected.
        character() {
            if(this.currentTab === 1){
                return this.$store.state.characterOne;
            } else if(this.currentTab === 2) {
                return this.$store.state.characterTwo;
            } else if (this.currentTab === 3){
                return this.$store.state.characterThree;
            } 
            return null;
        }
    },
    components: { 
        ComboContainer
    }
}
</script>

<style scoped>
    h4 {
        font-size: 46px;
        font-family: "LeviReBrushed", Helvetica, Arial;
        color: white;
        text-shadow: 0 0 4px var(--v-cpurple-base), 0 0 4px var(--v-cpurple-base), 0 0 4px var(--v-cpurple-base), 0 0 4px var(--v-cpurple-base);
    }
    .charDetails {
        padding: 0 1%;
    }
</style>