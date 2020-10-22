<template>
    <div>
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
        color: var(--v-secondary-base);
        text-shadow: 0 0 2px var(--v-darker-base), 0 0 2px var(--v-darker-base), 0 0 2px var(--v-darker-base), 0 0 2px var(--v-darker-base);
    }
</style>