<template>
    <div class="row">
      <div class="col s6">
          <slot name="list"></slot>
      </div>

      <div class="col s6">
          <slot name="details"></slot>
      </div>
    </div>
</template>

<style scoped>
    .s5 {
        min-width: 680px;
    }
</style>