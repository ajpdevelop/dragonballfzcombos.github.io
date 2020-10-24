<template>
    <v-card>
        <v-tabs centered v-model="tab" height="64px" background-color="primary" dark class="stuff">

            <v-tab href="#tab-1" large @click="characterTabActive('characterTab1')">
                <span v-if="this.$store.state.characterOne != null" v-text="this.$store.state.characterOne.name"></span>
                <span v-else>Fighter 1</span>
            </v-tab>
            <v-tab href="#tab-2" large @click="characterTabActive('characterTab2')">
                <span v-if="this.$store.state.characterTwo != null" v-text="this.$store.state.characterTwo.name"></span>
                <span v-else>Fighter 2</span>
            </v-tab>
            <v-tab href="#tab-3" large @click="characterTabActive('characterTab3')">
                <span v-if="this.$store.state.characterThree != null" v-text="this.$store.state.characterThree.name"></span>
                <span v-else>Fighter 3</span>
            </v-tab>
        </v-tabs>

        <v-card flat class="videoSizes">
            <span>Resize Videos: </span>
            <v-icon @click="newSize(1)">mdi-image-size-select-small</v-icon>
            <v-icon @click="newSize(2)">mdi-image-size-select-large</v-icon>
            <v-icon @click="newSize(3)">mdi-image-size-select-actual</v-icon>
        </v-card>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
                <CharacterDetails :current-tab="i" />
            </v-tab-item>
        </v-tabs-items>
        
        <content-placeholder v-if="!this.$store.state.selectedCharacter" />
    </v-card>
</template>

<script>
    import CharacterDetails from "./CharacterDetails";
    import ContentPlaceholder from "./ContentPlaceholder";

    import { VTabs, VTab, VTabsItems, VTabItem, VCard, VIcon } from "vuetify/lib/components";

    export default {
        data: () => ({ 
            tab: null
        }),
        components: {
            CharacterDetails,
            ContentPlaceholder,
            VTabs, VTab, VTabsItems, VTabItem, VCard, VIcon
        },
        computed: {
        },
        methods: {
            characterTabActive(characterTab) {
                return this.$store.commit("setActiveCharacterTab", characterTab);
            },
            newSize(whichSize) {
                return this.$store.commit("ChangeVideoSize", whichSize)
            }
        }
    };
</script>

<style>
    .v-tab {
        font-size: 16px;
    }
    .videoSizes {
        margin: 8px 16px 0 0;
        font-size: 18px;
        width: 240px;
        right: 0;
        height: 36px;
        text-align: right;
        position: absolute;
        background-color: none;
        z-index: 10;
    }
    .videoSizes i {
        padding: 0 6px;
    }
</style>