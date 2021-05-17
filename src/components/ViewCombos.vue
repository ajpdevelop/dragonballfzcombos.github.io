<!-- Use expansion panels from Vuetify to sort / show Combo data from Google Firestore. (From parent) -->
<template>
    <v-expansion-panels>
        <v-expansion-panel class="expandPanel mr-4 ml-4">
            <v-expansion-panel-header class="eHeader" v-model="paneltext">
                <span v-text="paneltext"></span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-container class="pa-0">
                    <v-row v-for="i in vfComboCount" :key="i" class="mb-0 notations">
                        <v-col cols="2" class="pr-0">
                            <v-btn v-if="vfStart[i] && vfEnd[i]" @click="passTime( vfStart[i], vfEnd[i], uniqueId ), paneltext=vfNotations[i]" depressed small class="px-0">
                                <v-card-text class="pa-0 times" v-if="vfStart[i] && vfEnd[i]" v-text="vfStart[i] + ' - ' + vfEnd[i]"></v-card-text>
                            </v-btn>
                        </v-col>
                        <v-col cols="10" class="pl-2">
                            <v-card-text class="pb-1 pl-1 pt-1 pr-5" v-if="vfNotations[i]" v-text="vfNotations[i]"></v-card-text>
                        </v-col>
                    </v-row>
                </v-container>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import { VExpansionPanels, VExpansionPanel, VExpansionPanelHeader, VExpansionPanelContent, VContainer, VRow, VCol, VCardText, VBtn } from "vuetify/lib/components";

export default {
    data(){
        return {
            paneltext: 'Combo List',
            checkCombos: this.vfStart
        }
    },
    props: {
        vfComboCount: Array,
        vfEnd: Array,
        vfStart: Array,
        vfNotations: Array,
        uniqueId: String
    },
    components: {
        VExpansionPanels, VExpansionPanel, VExpansionPanelHeader, VExpansionPanelContent, VContainer, VRow, VCol, VCardText, VBtn
    },
    methods: {
        passTime(sTime, eTime, eUrl) {
            let newTimes = [sTime, eTime, eUrl];
            this.$root.$emit('newTime', newTimes)
        }
    }
}
</script>

<style lang="scss" scoped>
    .expandPanel {
        background-color: #1E1E1E!important;
    }
    .v-expansion-panel-header:active {
        background-color: var(--v-cpurple-base);
        color: white;
    }
    .eHeader {
        color: var(--v-cpurple-lighten2);
        font-size: 16px;
    }
    .notations .v-card__text{
        font-size: 15px;
    }
    .notations .times {
        color: var(--v-cpurple-lighten2);
    }
</style>