import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        roster: [],
        selectedCharacter: null,
        characterTabActive: 'characterTab1',
        characterOne: null,
        characterTwo: null,
        characterThree: null,
        howToExpanded: false
    }),
    
    mutations: {
        setRoster(state, roster) {
            state.roster = roster;
        },

        setSelectedCharacter(state, character) {
            if (state.selectedCharacter)
                state.selectedCharacter.isSelected = false;

            if(state.characterTabActive === 'characterTab1') {
                character.isSelected = true;
                state.characterOne = character;
            }
            else if (state.characterTabActive === 'characterTab2') {
                character.isSelected = true;
                state.characterTwo = character;
            }
            else if (state.characterTabActive === 'characterTab3') {
                character.isSelected = true;
                state.characterThree = character;
            }
            character.isSelected = true;
            state.selectedCharacter = character;
        },
        setActiveCharacterTab(state, characterTab) {
            state.characterTabActive = characterTab;
        },
        ToggleHowTo(state) {
            state.howToExpanded = !state.howToExpanded
        }
    },

    actions: {
        getFullRoster(context) {
            if (context.state.roster.length)
                return Promise.resolve();

            var url = "https://dbfzcs.s3.us-east-2.amazonaws.com/roster.json";

            return axios
                .get(url)
                .then(response => {
                    for(var i in response.data)
                        response.data[i].isSelected = false;
                    
                    context.commit("setRoster", response.data);
                });
        }
    }
});