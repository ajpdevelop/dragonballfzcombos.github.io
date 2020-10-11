<template>
    <div>
        <h4 v-text="character.name"></h4>
        <ComboContainer :character="this.character" />
    </div>
</template>

<script>
import ComboContainer from './ComboContainer.vue';

export default {
    computed: {
        character() {
            return this.$store.state.selectedCharacter;
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