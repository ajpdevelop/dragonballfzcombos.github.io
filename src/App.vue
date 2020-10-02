<template>
  <div class="container">
    <app-header />

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
</style>

<script>
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import ColumnWrapper from "./components/ColumnWrapper";
import AppHeader from "./components/AppHeader";

export default {
  components: {
    AppHeader,
    CharacterList,
    CharacterDetails, 
    ColumnWrapper
  }
};
</script>
