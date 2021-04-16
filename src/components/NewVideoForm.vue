<template>
<v-dialog v-model="show" content-class="v-dialog--custom" scrollable>
<v-card outlined>
<!-- Video Form Container -->
<v-container class="formContainer ml-0 pt-0">
    <v-row>
        <v-col cols="12" md="6">
            <v-row class="mb-0">
                <v-col cols="12">
                    <v-card-title class="formHeader">
                    Video Submission
                    </v-card-title>
                    <!-- Adjust wording to save space -->
                    <v-card-text class="formSubHeader">
                        All fields are required. You can test timestamps for each combo in the video preview!
                    </v-card-text>
                </v-col>
            </v-row>
            <v-row class="mb-0">
                <v-col cols="12">

                    <!-- User Email, Video ID, Title, Author, Author Link, Combo Tag (Can select multiple), Timestamps & Notation (Multiple line add.) 
                    Need to fix to pull information of the video automatically with just the video URL given. -->
                    <v-form @submit.prevent="SubmitForm" autocomplete="off" >
                        <v-row align="center" class="mb-0">
                            <v-col cols="12" md="6" class="pb-0">
                                <v-text-field v-model="vfEmail" :success="!!vfEmail" :rules="emailRules" required filled outlined color="white" label="Your E-mail" ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" class="pb-0">
                                <v-select
                                v-model="charSelected"
                                :items="rosterNames"
                                required
                                outlined
                                filled
                                label="Select a Character"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row align="center" class="mb-0">
                            <v-col cols="12" md="6" class="pb-0">
                                <v-text-field @input="GetDetails" required v-model="initialUrl" filled outlined color="white" label="Video URL (YouTube Only)" ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" class="pb-0">
                                <v-select
                                v-model="selectedTags"
                                :items="vfTags"
                                label="Select Categories"
                                required
                                outlined
                                filled
                                multiple
                                chips
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-expansion-panels>
                                <v-expansion-panel class="expandPanel">
                                    <v-expansion-panel-header class="expandHeader">
                                        What is Notation?
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" align="center">
                                                    Use Numpad Notation instead of Directional
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="notations" cols="6" align="right">
                                                    <v-row class="my-0 mr-1" style="width: 180px;">
                                                        <v-col align="center"><span>7</span></v-col>
                                                        <v-col align="center"><span>8</span></v-col>
                                                        <v-col align="center"><span>9</span></v-col>
                                                    </v-row>
                                                    <v-row class="my-0 mr-1" style="width: 180px;">
                                                        <v-col align="center"><span>4</span></v-col>
                                                        <v-col align="center"><span>5</span></v-col>
                                                        <v-col align="center"><span>6</span></v-col>
                                                    </v-row>
                                                    <v-row class="my-0 mr-1" style="width: 180px;">
                                                        <v-col align="center"><span>1</span></v-col>
                                                        <v-col align="center"><span>2</span></v-col>
                                                        <v-col align="center"><span>3</span></v-col>
                                                    </v-row>
                                                </v-col>
                                                <v-col class="notations" cols="6" align="left">
                                                    <v-row class="my-0 ml-1" style="width: 180px;">
                                                        <v-col align="center"><span>↖</span></v-col>
                                                        <v-col align="center"><span>↑</span></v-col>
                                                        <v-col align="center"><span>↗</span></v-col>
                                                    </v-row>
                                                    <v-row class="my-0 ml-1" style="width: 180px;">
                                                        <v-col align="center"><span>←</span></v-col>
                                                        <v-col align="center"><span>N</span></v-col>
                                                        <v-col align="center"><span>→</span></v-col>
                                                    </v-row>
                                                    <v-row class="my-0 ml-1" style="width: 180px;">
                                                        <v-col align="center"><span>↙</span></v-col>
                                                        <v-col align="center"><span>↓</span></v-col>
                                                        <v-col align="center"><span>↘</span></v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <v-row align="center">
                                                <v-col cols="12" align="center">
                                                    <span class="subHeader">Buttons</span>
                                                </v-col>
                                                <v-col cols="12">
                                                    It is important to note that we use a general notation for all controls instead of the controls you see on your controller. This is because the game is on many platforms. Some platforms use different buttons that won't match the other platforms.
                                                    <br /><br />
                                                    The inputs are as follows. These will follow the inputs within the game for the most part.
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <span class="subHeader">Basic Inputs</span><br />
                                                    L - Light Attack<br />
                                                    M - Medium Attack<br />
                                                    H - Heavy Attack<br />
                                                    S - Special Attack<br />
                                                    A1 - Assist 1<br />
                                                    A2 - Assist 2<br />
                                                </v-col>
                                                <v-col>
                                                    <span class="subHeader">Combination Inputs</span><br />
                                                    L+M - Dragon Rush<br />
                                                    S+H - Super Dash<br />
                                                    M+H - Vanish<br />
                                                    L+M+H+S - Sparking
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <span class="subHeader">Movement</span><br />
                                                    SJ - Super Jump (Input: 27, 28 or 29)<br />
                                                    IAD - Instant Air Dash (Input: 956 or 754)<br />
                                                    TK - Tiger Knee (Input: 2369X or 2147X)
                                                </v-col>
                                                <v-col>
                                                    <span class="subHeader">Example</span><br />
                                                    L > M > 2H > SD
                                                    Is the same as
                                                    Light, Medium, Down+Heavy, Super Dash
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <span class="subHeader">Additional Notation:</span>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    SK - SPuts in Sliding Knockdown state<br />
                                                    [X] - Hold X<br />
                                                    ]X[ - Release X<br />
                                                    X(n) - X performs n hits before cancel<br />
                                                    X | Y - X or Y
                                                </v-col>
                                                <v-col>
                                                    X~Y - Y is an optional follow-up to X<br />
                                                    j.X - X during Jump State<br />
                                                    dj.X - X during Double Jump State<br />
                                                    X(whiff) - Missing X intentionally<br />
                                                    [Combo]x# - Repeat Combo # times
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-row>
                        <v-row class="mb-2">
                            <v-col cols="12" class="pb-0"><span>Enter combos below</span></v-col>
                        </v-row>
                        <v-row class="mb-0" v-for="i in vfComboCount" :key="i" @mouseover="showMinus = i" @mouseleave="showMinus = null">
                            <v-col cols="2">
                                <v-text-field dense color="white" outlined filled v-model="vfStart[i]" label="Start" hint="Ex: 1:00" persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field dense color="white" outlined filled v-model="vfEnd[i]" label="End" hint="Ex: 1:15" persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="7" class="pr-0">
                                <v-text-field dense v-model="vfNotations[i]" outlined filled label="Combo Notation" color="white"></v-text-field>
                            </v-col>
                            <v-col cols="1" class="pa-0" v-if="i == vfComboCount[vfComboCount.length - 1]">
                                <v-btn
                                    class="ml-2 countIcon"
                                    dense
                                    text
                                    outlined
                                    icon
                                    @click="vfComboCount.push(parseInt(i) + 1)"
                                >
                                    <v-icon color="white">mdi-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="1" class="pa-0" v-if="showMinus === i && i !== vfComboCount[vfComboCount.length - 1]">
                                <v-btn
                                    class="ml-2 countIcon"
                                    dense
                                    text
                                    outlined
                                    icon
                                    @click="DeleteCombo(i)"
                                >
                                    <v-icon color="white">mdi-minus</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row  class="mb-0 mt-4">
                            <v-col cols="12">
                                <v-card-actions>
                                    <v-btn id="submitBtn" @click="SubmitForm" text >Submit Video</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-col>
            <!-- Video Card Preview Container -->
            <v-col cols="12" md="6" class="previewPanel">
                <v-row>
                    <v-col cols="12">
                        <v-card-title class="previewHeader">
                            Video Preview
                        </v-card-title>
                        <v-icon large class="closeNew" @click="ToggleNotation">mdi-close-circle</v-icon>
                    </v-col>
                    <v-col cols="12">
                        <v-card-text v-text="vidDetails[0]" class="previewTitle"></v-card-text>
                    </v-col>
                    <v-col cols="12">
                        <v-card-text class="previewAuthor"><a :href='"https://www.youtube.com/channel/" + vidDetails[2]' v-text="vidDetails[1]" ></a></v-card-text>
                    </v-col>
                    <v-col cols="12">
                        <VideoPlayer v-if="vidReset" :uniqueId="vfUrl" :combo-id="vfUrl" :ifForm="true"/>
                    </v-col>
                    <v-col cols="12" v-if="selectedTags !== ''">
                        <v-chip class="mr-2 mb-3" v-for="aTag in selectedTags" :key="aTag">{{aTag}}</v-chip>
                    </v-col>
                    <v-col cols="12" >
                        <ViewCombos :vfComboCount="vfComboCount" :uniqueId="vfUrl" :vfNotations="vfNotations" :vfStart="vfStart" :vfEnd="vfEnd"/>
                    </v-col>
                </v-row>
            </v-col>
    </v-row>
</v-container>
</v-card>
</v-dialog>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';
import ViewCombos from './ViewCombos.vue';
import axios from 'axios';

import { VDialog, VContainer, VRow, VCol, VForm, VTextField, VCard, VCardTitle, VCardText, VBtn, VSelect, VIcon, VChip, VExpansionPanels, VExpansionPanel, VExpansionPanelHeader, VExpansionPanelContent } from "vuetify/lib/components";
const db = require('../db/db');

export default {
    data: () => ({
        initialUrl: '',
        vfUrl: '',
        showMinus: null,
        vfEmail: '',
        charSelected: '',
        selectedTags: '',
        vidReset: false,
        vfTags: ['BnB', 'Advanced', 'Rejump', 'ToD', 'Mixups'],
        vfComboCount: [0],
        vfEnd: [],
        vfStart: [],
        vfNotations: [],
        videoCheck: false,
        vidDetails: [],
        valid: false,
        subject: '',
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'E-mail must be valid',
        ],
        validRule: [
        v => !!v || 'Video is required',
        v => /((\r\n|\n|\r)$)|(^(\r\n|\n|\r))|^\s*$/gm.test(v) || 'Enter a valid URL',
        ]
    }),
    components: {
        VideoPlayer, ViewCombos,
        VDialog, VContainer, VRow, VCol, VForm, VTextField, VCard, VCardTitle, VCardText, VBtn, VSelect, VIcon, VChip, VExpansionPanels, VExpansionPanel, VExpansionPanelHeader, VExpansionPanelContent
    },
    props: ['visible'],
    methods: {
        ToggleNotation() {
            this.$emit('close');
        },
        SubmitForm() {
            var newDoc = db.firestore.collection('unapprovedVideos').doc();

            console.log('Starting new video submission!');
            console.log('New doc ID = ' + newDoc.id);

            db.firestore.collection('unapprovedVideos').doc(newDoc.id)
                .set({
                    email : this.vfEmail,
                    fighter : this.charSelected,
                    url : this.vfUrl,
                    categories : this.selectedTags
                })
                .then(() => {
                    console.log('Main section success! Starting to add combos!');

                    for(var i=0;i<this.vfComboCount.length;i++) {
                        console.log('Starting a new combo')
                        db.firestore.collection('unapprovedVideos').doc(newDoc.id).collection('combos')
                        .add({
                            startTime : this.vfStart[i],
                            endTime : this.vfEnd[i],
                            notation : this.vfNotations[i],
                            id : i
                        })
                        .then(() => {
                            console.log('Combo ' + i)
                        })
                        .catch((error) => {
                            console.error("Error writing document: ", error);
                        });
                    }
                    this.initialUrl = '',
                    this.vfUrl = '',
                    this.showMinus = null,
                    this.vfEmail = '',
                    this.charSelected = '',
                    this.selectedTags = '',
                    this.vidReset = false,
                    this.vfComboCount = [0],
                    this.vfEnd = [],
                    this.vfStart = [],
                    this.vfNotations = [],
                    this.videoCheck = false,
                    this.vidDetails = [],
                    this.valid = false,
                    this.subject = '',
                    this.email = '',
                    this.vfComboCount = [0];

                    this.$emit('submitted');
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        },
        GetDetails() {
            this.vidReset = false;
            this.vidDetails = [];
            
            //Strip video ID from URL
            var url = this.initialUrl;
            var ID = '';

            //eslint-disable-next-line
            url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if(url[2] !== undefined) {
                //eslint-disable-next-line
                ID = url[2].split(/[^0-9a-z_\-]/i);
                ID = ID[0];
            }
            else {
                ID = url;
            }
            this.vfUrl = ID;

            //Grab Video Details
            if(this.vfUrl) {
                var apiKey = 'AIzaSyDs06LHlkoQ7U4tTnQzwk54D-i3fBg7HxA';
                var youTubeURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + this.vfUrl + '&key=' + apiKey;
                return axios
                    .get(youTubeURL)
                    .then(response => {
                        this.vidDetails = [response.data.items[0].snippet.title, response.data.items[0].snippet.channelTitle, response.data.items[0].snippet.channelId]
                        this.vidReset = true;
                    });
            } 
            else { this.vidDetails = [] }
        },
        DeleteCombo(i) {
            this.vfComboCount.splice(i, 1);
            console.log(this.vfStart + ' ' + this.vfEnd);
        }
    },
    computed: {
        roster() {
            return this.$store.state.roster;
        },
        rosterNames() {
            let allChars = (Object.values(this.roster));
            let charArr = [];
            for(let i = 0; i < allChars.length; i++){
                charArr.push(allChars[i].name)
            }
            return charArr
        },
        show: {
            get () {
                return this.visible
            },
            set (value) {
                    if (!value) {
                    this.$emit('close')
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch("getFullRoster");
    }
}
</script>

<style lang="scss">
    /* Change Autocomplete styles in Chrome*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
    border: inherit!important;
    background-color: inherit!important;
    -webkit-text-fill-color: inherit!important;
    //-webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color inherit!important;
    }


    .formContainer {
        margin-left: 12px;
        overflow-y: auto!important;
        ::-webkit-scrollbar {
            width: 16px;
            border: 5px solid white;
        }
        ::-webkit-scrollbar-thumb {
            background-color: #b0b0b0;
            background-clip: padding-box;
            border: 0.05em solid #eeeeee;
        }
        ::-webkit-scrollbar-track {
            background-color: #494949;
        }
        /* Buttons */
        ::-webkit-scrollbar-button:single-button {
            background-color: #555555;
            display: block;
            border-style: solid;
            height: 13px;
            width: 16px;
        }
        /* Up */
        ::-webkit-scrollbar-button:single-button:vertical:decrement {
            border-width: 0 8px 8px 8px;
            border-color: transparent transparent #bbbbbb transparent;
        }

        ::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
            border-color: transparent transparent #cccccc transparent;
        }
        /* Down */
        ::-webkit-scrollbar-button:single-button:vertical:increment {
            border-width: 8px 8px 0 8px;
            border-color: #bbbbbb transparent transparent transparent;
        }

        ::-webkit-scrollbar-button:vertical:single-button:increment:hover {
            border-color: #cccccc transparent transparent transparent;
        }
    }
    .previewPanel {
        background-color: #272727;
    }
    .v-text-field {
        input {
            border: none!important;
            &:focus {
                border: none!important;
                box-shadow: none!important;
            }
        }
    }
    .v-dialog--custom {
        max-width: 1366px;
    }
    .v-sheet--outlined {
        border: 2px solid var(--v-cpurple-base)!important;
    }
    .v-card__title {
        font-size: 180%;
    }
    #submitBtn {
        background-color: var(--v-cpurple-base);
        color: white;
    }
    .formHeader {
        color: var(--v-cyellow-base);
    }
    .formSubHeader {
        font-size: 16px;
    }
    .previewHeader {
        padding-bottom: 4px;
        color: var(--v-cyellow-base);
    }
    .previewTitle {
        font-size: 22px;
        padding: 10px  0 6px 0;
    }
    .previewAuthor {
        font-size: 20px;
        color: var(--v-cpurple-base);
        padding: 0 0 12px 26px;
        a {
            color: var(--v-cpurple-base)!important;
            font-size: 20px;
            font-weight: bold;
        }
    }
    .countIcon {
        background-color: #303030!important;
        color: black!important;
    }
    .countIcon:hover {
        background-color: var(--v-cyellow-base)!important;
    }
    .countIcon:focus {
        background-color: var(--v-cyellow-base)!important;
    }
    .v-chip {
        background: var(--v-cyellow-base)!important;
        color: black!important;
    }
    .expandPanel {
        background-color: #272727!important;
    }
    .expandHeader {
        background-color: #303030;
        color: #D8AFF9!important;
        font-size:120%;
    }
    .v-expansion-panel-header:active {
        background-color: var(--v-cpurple-base);
    }
    .notations .row .col {
        border: 1px solid white;
        height: 60px;
    }
    .notations .row .col span {
        line-height: 58px;
        color: var(--v-cyellow-base);
    }
    .subHeader {
        color: var(--v-cyellow-base);
        font-size: 140%;
    }
    .closeNew {
        color: var(--v-cyellow-base)!important;
        top: -60px;
        margin-bottom: -35px;
        left: 89%;
        width: 36px;
        position: absolute;
    }
    @media only screen and (min-width: 720px) {
        .closeNew {
            left: 92%;
        }
    }
    @media only screen and (min-width: 900px) {
        .closeNew {
            left: 94%;
        }
    }
    .closeNew:focus {
        background-color: inherit;
    }
</style>