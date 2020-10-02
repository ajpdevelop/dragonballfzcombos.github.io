<template>
     <div v-if="character">
        <div v-text="character.camel"></div>
        <div v-text="character.name"></div>
        <div v-text="character.color"></div>
    </div>
</template>

<script>
export default {
    computed: {
        character(){
            return this.$store.state.selectedCharacter;
        }
    }
}
</script>