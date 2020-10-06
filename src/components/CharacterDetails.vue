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
        font-weight: bold;
    }
</style>