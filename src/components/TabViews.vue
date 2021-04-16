<template>
    <v-card>
        <div class="charDisclaimer">
            <v-icon x-large class="ml-2" style="color:var(--v-cyellow-base);">mdi-arrow-up-bold mdi-rotate-315</v-icon>
            <v-spacer></v-spacer>
            <span class="pl-2">Click the top left icon to show / hide the character roster</span>
        </div>
        <v-tabs centered v-model="tab" height="64px" background-color="primary" dark class="stuff">
            <v-tab href="#tab-1" class="tabTitle" large @click="characterTabActive('characterTab1')">
                <span v-if="this.$store.state.characterOne != null" v-text="this.$store.state.characterOne.name"></span>
                <span v-else>Fighter 1</span>
            </v-tab>
            <v-tab href="#tab-2" class="tabTitle" large @click="characterTabActive('characterTab2')">
                <span v-if="this.$store.state.characterTwo != null" v-text="this.$store.state.characterTwo.name"></span>
                <span v-else>Fighter 2</span>
            </v-tab>
            <v-tab href="#tab-3" class="tabTitle" large @click="characterTabActive('characterTab3')">
                <span v-if="this.$store.state.characterThree != null" v-text="this.$store.state.characterThree.name"></span>
                <span v-else>Fighter 3</span>
            </v-tab>
        </v-tabs>

        <!-- Test changing size of active while putting a bright white color on active icon & lower white of inactive icons VERY slightly. -->
        <v-card flat class="videoSizes" v-if="!small && !xsmall">
            <span>Resize Videos: </span>
            <!--<v-icon class="sizer" @click="newSize(1)">mdi-image-size-select-small</v-icon>-->
            <v-icon class="sizer" @click="newSize(2)">mdi-image-size-select-large</v-icon>
            <v-icon class="sizer" @click="newSize(3)">mdi-image-size-select-actual</v-icon>
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
            small() {
                return this.$vuetify.breakpoint.sm
            },
            xsmall() {
                return this.$vuetify.breakpoint.xs
            },
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
    .tabTitle {
        color: var(--v-cyellow-base)!important;
    }
    .videoSizes {
        margin: 8px 16px 0 0;
        font-size: 20px;
        width: 270px;
        right: 0;
        height: 36px;
        text-align: right;
        position: absolute;
        background-color: none;
        z-index: 10;
    }
    .videoSizes .sizer {
        padding: 0 10px;
    }
    .videoSizes button:focus {
        background-color:inherit!important;
    }
    .v-icon.v-icon::after {
        background-color: inherit;
        border-radius: inherit;
        content: inherit;
        display: inherit;
        height: inherit;
        left: inherit;
        opacity: inherit;
        pointer-events: inherit;
        position: inherit;
        top: inherit;
        transform: none;
        width: inherit;
        transition: none;
        }
    .sizer {
        padding-right:8px;
    }
</style>