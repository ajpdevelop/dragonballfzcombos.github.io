<template>
    <v-dialog v-model="show" content-class="v-dialog--custom">
        <v-card outlined>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card-title>
                        Suggestions / Contact Me
                        </v-card-title>

                        <v-card-text>
                            If you would like to include your videos or provide any suggestions, questions, concerns or inquiries! Valid E-mail address required.
                        </v-card-text>

                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                    <v-form @submit.prevent="SubmitForm" >
                        <v-row>
                            <v-col cols="12" md="5">
                                <v-text-field v-model="fbEmail" filled outlined color="white" :rules="emailRules" label="E-mail" :success="!!email" ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="7">
                                <v-text-field id="userSubject" filled outlined color="white" v-model="fbSubject" label="Subject" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea auto-grow rows="5" id="userBody" filled outlined color="white" v-model="fbBody" label="Message" ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row style="margin-bottom: 0;">
                            <v-col cols="12">
                                <v-card-actions>
                                    <v-btn id="submitBtn" text @click="SubmitForm">Submit</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import { VDialog, VContainer, VRow, VCol, VForm, VTextField, VTextarea, VCard, VCardTitle, VCardText, VBtn } from "vuetify/lib/components";
const db = require('../db/db');

export default {
    data: () => ({
        fbEmail: '',
        fbSubject: '',
        fbBody: '',
        valid: false,
        subject: '',
        email: '',
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'E-mail must be valid',
        ],
    }),
    components: {
        VDialog, VContainer, VRow, VCol, VForm, VTextField, VTextarea, VCard, VCardTitle, VCardText, VBtn,
    },
    props: ['visible'],
    methods: {
        SubmitForm() {
            console.log('starting');
            db.firestore.collection('suggestions')
                .add({email : this.fbEmail, subject : this.fbSubject, body : this.fbBody})
                .then(() => {
                    this.$emit('submitted');
                    console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
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
        max-width: 768px;
        overflow-y: initial;
    }
    .v-sheet--outlined {
        border: 2px solid var(--v-cpurple-base)!important;
    }
    .v-card__title {
        font-size: 180%;
    }
    .submitBtn {
        background-color: var(--v-cpurple-base);
        color: var(--v-darker-base);
    }
</style>