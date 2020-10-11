<template>
  <v-app id="inspire">
    <v-navigation-drawer class="nav-drawer" v-model="drawer" width="40%" app>
        <character-list />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="navHeader">Dragonball FighterZ Combos!</v-toolbar-title>
      
      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn v-text="activeTab"></v-btn>
        <v-btn>About</v-btn>
        <v-btn>Suggestions</v-btn>
        <v-btn>Contact</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-tabs centered v-model="tab" background-color="primary" dark>
              <v-tab large @click="characterTabActive('characterTab1')">
                  Character One
              </v-tab>
              <v-tab large @click="characterTabActive('characterTab2')">
                  Character Two
              </v-tab>
              <v-tab large @click="characterTabActive('characterTab3')">
                  Character Three
              </v-tab>
          </v-tabs>
        </v-row>
        <v-row >
          <v-col cols="12">
            <character-details />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import { VApp, VMain, VContainer, VRow, VCol, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle, VToolbarItems, VBtn, VTabs, VTab } from "vuetify/lib/components";

export default {
  data: () => ({ 
    drawer: null,
    activeTab: null
  }),
  components: {
    CharacterList,
    CharacterDetails,
    VApp, VMain, VContainer, VRow, VCol, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle, VToolbarItems, VBtn, VTabs, VTab
  },
  computed: {
  },
  methods: {
    characterTabActive(characterTab) {
        return this.$store.commit("setActiveCharacterTab", characterTab);
    }
  }
};
</script>

<style>
@font-face {
    font-family: "LeviReBrushed";
    src: local("LeviReBrushed"),
    url(./fonts/LeviReBrushed.ttf) format("truetype");
  }
.nav-drawer {
  background-color: var(--v-primary-base)!important;
}
.v-main {
  background-color: var(--v-primary-base);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.v-app-bar {
  background-color: var(--v-secondary-base)!important;
}
.navHeader {
  color: var(--v-darker-base);
  font-family: "LeviReBrushed", Helvetica, Arial;
  font-size: 220%;
}
</style>
