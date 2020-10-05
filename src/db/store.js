import Vue from "vue/dist/vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        roster: [],
        selectedCharacter: null
    }),
    
    mutations: {
        setRoster(state, roster) {
            state.roster = roster;
        },

        setSelectedCharacter(state, character) {
            if (state.selectedCharacter)
                state.selectedCharacter.isSelected = false;

            character.isSelected = true;
            state.selectedCharacter = character;
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