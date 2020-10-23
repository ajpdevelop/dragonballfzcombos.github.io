<template>
    <v-card align="center" justify="center" v-if="!this.$store.state.howToExpanded" class="howTo">
            Tip: View multiple characters by selecting the different FIGHTER tabs below and selecting a new character!
            <v-icon class="closeHowTo" @click="ToggleHowTo">mdi-close-circle</v-icon>
    </v-card>
</template>

<script>
import { VCard, VIcon } from "vuetify/lib/components";

export default {
    components: {
        VCard, VIcon
    },
    methods: {
        ToggleHowTo() {
            this.$store.commit('ToggleHowTo')
        }
    }
}
</script>

<style scoped>
    .howTo {
        padding: 8px 0;
        font-size: 18px;
    }
    .closeHowTo {
        margin-left: 16px;
        color: white;
    }
    .closeHowTo:focus {
        background-color: inherit;
    }
</style>