<template>
  <div class="app-wrapper">
    <!-- Main Content Area -->
    <!-- The scrollable-content class handles the bottom padding so
         items aren't hidden by the navigation bar. -->
    <main class="scrollable-content">
      <router-view />
    </main>

    <!-- Navigation Bar: Only visible on pages other than Login -->
    <GlobalNav v-if="$route.path !== '/login'" />
  </div>
</template>

<script setup>
// Import the navigation component we just created
import GlobalNav from './components/GlobalNav.vue'
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* This background comes from your variables.css */
  background-color: var(--bg-void);
  overflow-x: hidden; /* Prevents horizontal scroll glitches on mobile */
}

.scrollable-content {
  flex-grow: 1;
  width: 100%;
  /* 90px provides enough space for the bottom bar + safe area padding */
  padding-bottom: 90px;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Ensure the router view expands to fill its container */
:deep(router-view) {
  display: block !important;
  width: 100%;
}
</style>
