<template>
    <v-dialog v-model="show" max-width="800px" content-class="v-dialog--custom" scrollable overflowed>
        <v-card outlined>
            <v-card-title class="justify-center" style="background-color: #3d3d3d">
                <span style="font-size: 32px;">What is Notation?</span>
            </v-card-title>
            <v-icon large class="closeNotation" @click="ToggleNotation">mdi-close-circle</v-icon>
            <v-container class="ma-0 pt-0 px-6 notationContainer">
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
        </v-card>
    </v-dialog>
</template>

<script>
import { VDialog, VContainer, VRow, VCol, VCard, VCardTitle, VIcon } from "vuetify/lib/components";

export default {
    props: ['visible'],
    components: {
        VDialog, VContainer, VRow, VCol, VCard, VCardTitle, VIcon
    },
    methods: {
        ToggleNotation() {
            this.$emit('close');
        }
    },
    computed: {
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
    }
}
</script>

<style lang="scss">
    ::-webkit-scrollbar {
        width: 0;
    }
    .v-dialog--custom {
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
    .notationContainer {
        overflow-y: auto!important;
        max-width: 800px;
        margin: 0 auto;
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
    .closeNotation {
        color: var(--v-cyellow-base)!important;
        top: -48px;
        margin-bottom: -35px;
        left: 89%;
        width: 36px;
        position: absolute;
    }
    @media only screen and (min-width: 720px) {
        .closeNotation {
            left: 92%;
        }
    }
    @media only screen and (min-width: 900px) {
        .closeNotation {
            left: 94%;
        }
    }
    .closeNotation:focus {
        background-color: inherit;
    }
</style>