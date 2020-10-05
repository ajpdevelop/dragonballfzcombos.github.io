<template>
    <div>
        <div v-if="character">
            <div v-text="character.camel"></div>
            <div v-text="character.name"></div>
            <div v-text="character.color"></div>
        </div>

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