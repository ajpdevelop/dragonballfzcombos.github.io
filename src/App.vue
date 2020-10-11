<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" width="40%" app>
        <character-list />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Dragonball FighterZ Combos!</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
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
import { VApp, VMain, VContainer, VRow, VCol, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle } from "vuetify/lib/components";

export default {
  data: () => ({ drawer: null }),
  components: {
    CharacterList,
    CharacterDetails,
    VApp, VMain, VContainer, VRow, VCol, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle
  }
};
</script>

<style>
  @font-face {
    font-family: "LeviReBrushed";
    src: local("LeviReBrushed"),
    url(./fonts/LeviReBrushed.ttf) format("truetype");
  }
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@media only screen and (min-width: 993px) {
  .container {
    width: 100%;
    max-width: 1920px;
  }
}
</style>
