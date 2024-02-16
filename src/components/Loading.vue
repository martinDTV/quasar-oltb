<template>
  <div class="q-pa-md">
    <q-btn color="purple" label="Show Loading" />
  </div>
</template>

<script setup lang="ts">
import {useQuasar} from 'quasar';
import {onBeforeUnmount} from 'vue';

const $q = useQuasar();
var timer = 0

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})
</script>
