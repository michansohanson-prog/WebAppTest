<template>
  <div class="app-wrapper">
    <!-- This is where LoginView, HubView, etc., will appear -->
    <router-view />
  </div>
</template>

<script setup lang="js">
// Logic handled via router and Pinia stores.
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* This background comes from your variables.css */
  background-color: var(--bg-void);
  overflow-x: hidden;
}

/* We force the router view to be visible and fill the screen */
:deep(router-view) {
  display: block !important;
  min-height: 100vh;
  width: 100%;
}
</style>
