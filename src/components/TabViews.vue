<template>
        <v-card>
            <v-tabs centered v-model="tab" background-color="primary" dark>

                <v-tab href="#tab-1" large @click="characterTabActive('characterTab1')">
                    Fighter 1
                </v-tab>
                <v-tab href="#tab-2" large @click="characterTabActive('characterTab2')">
                    Fighter 2
                </v-tab>
                <v-tab href="#tab-3" large @click="characterTabActive('characterTab3')">
                    Fighter 3
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
                    <CharacterDetails :current-tab="i" />
                </v-tab-item>
            </v-tabs-items>
        </v-card>
</template>

<script>
    import CharacterDetails from "./CharacterDetails";
    import { VTabs, VTab, VTabsItems, VTabItem, VCard } from "vuetify/lib/components";

    export default {
        data: () => ({ 
            tab: null
        }),
        components: {
            CharacterDetails,
            VTabs, VTab, VTabsItems, VTabItem, VCard
        },
        computed: {
        },
        methods: {
            characterTabActive(characterTab) {
                return this.$store.commit("setActiveCharacterTab", characterTab);
            }
        }
    };
</script>