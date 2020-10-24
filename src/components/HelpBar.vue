<template>
    <v-card align="center" justify="center" v-if="!this.$store.state.howToExpanded" class="howTo">
            <span class="accentText">TIP</span>: View multiple characters by selecting the different FIGHTER tabs below and selecting a new character!
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
        padding: 6px 0;
        font-size: 18px;
    }
    .closeHowTo {
        margin-left: 8px;
        color: var(--v-cpurple-base);
    }
    .closeHowTo:focus {
        background-color: inherit;
    }
    .accentText {
        color: var(--v-cyellow-base);
    }
</style>