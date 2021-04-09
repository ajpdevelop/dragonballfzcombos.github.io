import Vue from "vue";
import Vuex from "vuex";
import charList from '../assets/roster.json';

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        roster: [],
        selectedCharacter: null,
        characterTabActive: 'characterTab1',
        characterOne: null,
        characterTwo: null,
        characterThree: null,
        howToExpanded: true,
        drawerState: true,
        showNotation: false,
        curVideoSize: {
            width: 640,
            height: 360
        },
        videoSizeOne: {
            width: 256,
            height: 144
        },
        videoSizeTwo: {
            width: 426,
            height: 240
        },
        videoSizeThree: {
            width: 640,
            height: 360
        }
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
        toggleDrawerState (state, data) {
            state.drawerState = data;
        },
        ToggleHowTo(state) {
            state.howToExpanded = !state.howToExpanded;
        },
        ToggleNotation(state) {
            state.showNotation = !state.showNotation;
        },
        ChangeVideoSize(state, newSize) {
            if(newSize === 1) {
                state.curVideoSize = state.videoSizeOne;
            } else if (newSize === 2) {
                state.curVideoSize = state.videoSizeTwo;
            } else if (newSize === 3) {
                state.curVideoSize = state.videoSizeThree;
            } else
            console.log('Size Error, newSize not equal to 1-3. newSize=' + newSize);
        }
    },
    getters : {
        drawerState: (state) => state.drawerState
    },
    actions: {
        getFullRoster(context) {
            if (context.state.roster.length)
                for(var i in charList)
                    charList[i].isSelected = false;
                context.commit("setRoster", charList);
        }
    }
});