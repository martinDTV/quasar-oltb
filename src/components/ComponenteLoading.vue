<template>
  <q-inner-loading
        :showing="visible"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
