<template>
    <v-card class="placeholder">
        <center><h4 style="margin: 0; padding-bottom: 12px;">About</h4></center>
        <span v-if="mobile">
            <center style="font-size:24px; height: 52px;">
                View fighters by clicking the top left icon!
                <br /> <br />
            </center>
        </span>
        If at any point you run into any bugs, have issues, find old videos, broken links and / or want to shoot me some feeback on how to improve, what videos to use, etc please click the suggestions link above, fill it out, and it will send me note! 
        <br /><br />
        I created this website in hopes to help, and hopefully help others, learn combos a tad easier by gathering quality, helpful, videos from great content creators on youtube aimed at teaching Dragonball Fighterz character combos.
        <br /><br />
        The videos that I am using are hand picked entered. My goal is to add timestamps and notations for each combo in a video but I am not that far quite yet. If you would like to include your video for one of the characters please let me know! If you add your youtube video's ID, title, channel name, channel link and list out your combo's timestamps and notation I will happily add it to the collection of current videos!
    </v-card>
</template>

<script>
import { VCard } from "vuetify/lib/components";

export default {
    components: {
        VCard
    },
    computed: {
        mobile() {
            return this.$vuetify.breakpoint.sm
        },
    }
}
</script>

<style scoped>
    .placeholder {
        padding: 18px 2%;
    }
    @media only screen and (max-width: 688px) {
        .placeholder {
            padding: 40px 2%;
            border-bottom: none!important;
            box-shadow: none!important;
        }
    }
</style>