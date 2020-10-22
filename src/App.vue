<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="navHeader">Dragonball FighterZ Combos!</v-toolbar-title>
      
      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn>Suggestions</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    
    
    <v-main>
      <v-navigation-drawer class="nav-drawer" v-model="drawer" width="28%" style="top: 64px;" fixed hide-overlay app>
        <character-list />
      </v-navigation-drawer>

      <tab-views />
    </v-main>
  </v-app>
</template>

<script>
import CharacterList from "./components/CharacterList";
import TabViews from "./components/TabViews";

import { VApp, VMain, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle, VToolbarItems, VBtn, } from "vuetify/lib/components";

export default {
  data: () => ({ 
    drawer: null,
    activeTab: null
  }),
  components: {
    CharacterList,
    TabViews,
    VApp, VMain, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle, VToolbarItems, VBtn,
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
header {
	position: fixed !important;
	top:0 !important;
	left: 0 !important;
	z-index: 99999 !important;
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
