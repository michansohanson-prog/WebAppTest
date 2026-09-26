<template>
  <div id="app" class="app-shell">
    <!-- The RouterView will render LoginView by default, then HubView after login -->
    <router-view />
  </div>
</template>

<script setup>
// No logic needed in App.vue for the main router shell
</script>

<style>
/* Global base styles to establish the platform foundation */
:root {
  /* Ensure variables are available globally even if not explicitly imported everywhere */
}

body {
  margin: 0;
  padding: 0;
  background: var(--bg-void); /* Standardized background token */
  font-family: var(--font-primary, sans-serif);
  overscroll-behavior-y: contain; /* Prevents rubber-banding on mobile screens */
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-void);
}

/* Prevent layout shift during transitions between views */
#app {
  transition: background 0.3s ease;
}
</style>
