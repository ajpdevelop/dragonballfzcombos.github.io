<!-- Simple Show/Hide toolbar above the main section to help users navigate. -->
<template>
    <v-card align="center" justify="center" v-if="!this.$store.state.howToExpanded" class="howTo">
        View multiple characters by selecting the different FIGHTER tabs below and selecting a new character!
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
        padding: 6px 4px;
        font-size: 14px;
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