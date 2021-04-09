<template>
  <v-app id="inspire">
    <v-app-bar dense app>
      <v-app-bar-nav-icon class="navcon" @click="drawerState = !drawerState;">
        <v-icon v-if="!this.$store.state.drawerState" large color="white" >
          mdi-account-arrow-right
        </v-icon>
        <v-icon v-if="this.$store.state.drawerState" large color="white" >
          mdi-account-arrow-left
        </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title v-if="small" class="navHeader">DBFZC</v-toolbar-title>
      <v-toolbar-title v-if="mobile" class="navHeader">DBFZ COMBOS!</v-toolbar-title>
      <v-toolbar-title v-if="!mobile && !small" class="navHeader">DRAGONBALL FIGHTERZ COMBOS!</v-toolbar-title>
      
      <div class="flex-grow-1"></div>

      <v-toolbar-items>
        <v-btn @click="ToggleHowTo" small >How to</v-btn>
        <v-btn @click.stop="showNotation=true" small >Notation</v-btn>
          <Notation :visible="showNotation" @close="showNotation=false" @submitted="OnFormSubmit"/>
        <v-btn @click.stop="showSuggestForm=true" small >Suggestions</v-btn>
          <Suggestions :visible="showSuggestForm" @close="showSuggestForm=false" @submitted="OnFormSubmit"/>
        <v-btn @click.stop="showVideoForm=true" small >Submit Video</v-btn>
          <NewVideoForm :visible="showVideoForm" @close="showVideoForm=false" @submitted="OnFormSubmit"/>
      </v-toolbar-items>
    </v-app-bar>

    
    
    <v-main>
      <v-navigation-drawer class="nav-drawer" v-model="drawerState" width="28%" style="top: 48px;" fixed hide-overlay app>
        <character-list />
      </v-navigation-drawer>

      <help-bar />

      <tab-views />
    </v-main>
  </v-app>
</template>

<script>
import CharacterList from "./components/CharacterList";
import TabViews from "./components/TabViews";
import HelpBar from "./components/HelpBar";
import Notation from "./components/Notation";
import Suggestions from "./components/Suggestions";
import NewVideoForm from "./components/NewVideoForm";
import { VApp, VMain, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle, VToolbarItems, VBtn, VIcon } from "vuetify/lib/components";

export default {
  data: () => ({
    activeTab: null,
    showSuggestForm: false,
    showVideoForm: false,
    showNotation: false
  }),
  components: {
    Notation,
    Suggestions,
    NewVideoForm,
    CharacterList,
    TabViews,
    HelpBar,
    VApp, VMain, VNavigationDrawer, VAppBar, VAppBarNavIcon, VToolbarTitle, VToolbarItems, VBtn, VIcon,
  },
  computed: {
    mobile() {
      return this.$vuetify.breakpoint.sm
    },
    small() {
      return this.$vuetify.breakpoint.xs
    },
    drawerState: {
      get () { return this.$store.getters.drawerState },
      set (v) { return this.$store.commit('toggleDrawerState', v) }
    },
  },
  methods: {
    characterTabActive(characterTab) {
        return this.$store.commit("setActiveCharacterTab", characterTab);
    },
    ToggleHowTo() {
      this.$store.commit('ToggleHowTo')
    },
    OnFormSubmit() {
      this.showSuggestForm = false;
      this.showVideoForm = false;
      this.showNotation = false;
    }
  }
};
</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 0;
}
// Override some Vuetify primary styles
#inspire {
  .v-label--active {
      color: rgba(255, 255, 255, 0.7)!important;
    }
  .v-list-item--active {
    color: rgba(255, 255, 255, 0.7)!important;
  }
  .v-simple-checkbox i {
    color: var(--v-cpurple-base)!important;
  }
}
@font-face {
    font-family: "LeviReBrushed";
    src: local("LeviReBrushed"),
    url(./fonts/LeviReBrushed.ttf) format("truetype");
}
.v-main__wrap {
  background-color: #1e1e1e;
}
.v-app-bar {
  background-color: var(--v-test-base)!important;
	position: fixed !important;
	top:0 !important;
	left: 0 !important;
	z-index: 99999 !important;
  /*border-bottom: 1px solid var(--v-cpurple-lighten1)!important;*/
}/*
.v-toolbar__items {
  button {
    border-bottom: 1px solid var(--v-cpurple-lighten1)!important;
  }
}
.v-app-bar__nav-icon {
  border-bottom: 1px solid var(--v-cpurple-lighten1)!important;
} */
.nav-drawer {
  background-color: var(--v-primary-base)!important;
  height: calc(100vh - 48px)!important;
}

    /* Track */
.nav-drawer {
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
.navcon {
  background-color: var(--v-primary-base);
  color: white;
  border-radius: 0;
}
.navcon:focus {
  background-color: var(--v-primary-base);
}
.navcon:focus {
  background-color: var(--v-primary-base);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.navHeader {
  color: black;
  font-family: "LeviReBrushed", Helvetica, Arial;
  font-size: 250%;
  margin-top: 12px;
}
@media only screen and (max-width: 768px) {
  .nav-drawer {
    width: 100%!important;
    z-index: 999;
  }
}
</style>
