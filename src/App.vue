<template>
  <div class="container">
    <!-- <app-header /> -->

    <column-wrapper>
      <template v-slot:list>
        <character-list />
      </template>

      <template v-slot:details>
        <character-details />
      </template>
    </column-wrapper>
  </div>
</template>

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

<script>
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import ColumnWrapper from "./components/ColumnWrapper";
//import AppHeader from "./components/AppHeader";

export default {
  components: {
    //AppHeader,
    CharacterList,
    CharacterDetails, 
    ColumnWrapper
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
