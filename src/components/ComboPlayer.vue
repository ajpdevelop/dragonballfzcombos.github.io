<template>
    <div>
    <VideoPlayer :uniqueId="comboId" :combo-id="comboId" :font-size="fontSize"/>
    <v-chip class="ml-2 mb-3" v-for="aTag in vfCategories" :key="aTag">{{aTag}}</v-chip>
    <ViewCombos :uniqueId="comboId" :vfComboCount="vfComboCount" :vfNotations="vfNotations" :vfStart="vfStart" :vfEnd="vfEnd"/>
    </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';
import ViewCombos from './ViewCombos.vue';
import { VChip } from "vuetify/lib/components";

export default {
    props: {
        comboId: String,
        vfComboCount: Number,
        vfNotations: Array,
        vfStart: Array,
        vfEnd: Array,
        fontSize: Number,
        vfCategories: Array
    },
    components: {
        VideoPlayer,
        ViewCombos,
        VChip
    }
}
</script>

<style lang="scss">
    .v-chip__content {
        font-weight: bold;
    }
</style>