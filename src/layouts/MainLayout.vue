<template>
  <q-layout view="lHh Lpr lFf">
    <q-header  class="bg-white">
      <q-toolbar>
        <q-toolbar-title class="text-black" style="font-size: 1.8rem">
          MIRA+
        </q-toolbar-title>

          <q-icon
            class="icon-coustumer"
            name="account_circle"
            color="dark"
            size="35px"
          />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>

<style scoped>
.icon-coustumer{
  cursor: pointer;
  margin-right: 1.5rem;
}
</style>
