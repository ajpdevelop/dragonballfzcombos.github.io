<template>
    <div class="row">
      <div class="col s7">
          <slot name="list"></slot>
      </div>

      <div class="col s5">
          <slot name="details"></slot>
      </div>
    </div>
</template>

<script>
export default {
}
</script>