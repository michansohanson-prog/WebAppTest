<template>
  <div class="hub-view">
    <!-- BRANDING HEADER -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">CORE_OS</h1>
      <p class="subtitle glow-cyan">USER_ID: ALPHA_09 // SESSION_STATE: ACTIVE</p>
    </header>

    <!-- MAIN INTERFACE HUB -->
    <main class="hub-container">
      <div class="app-grid">
        <!-- 6 Uniform Tiles linked to Router Paths using CyberTile component -->
        <router-link to="/comm" custom v-slot="{ href, title }">
          <CyberTile title="COMM" subtitle="Neural Messaging" variant="purple" layout="center" />
        </router-link>

        <router-link to="/messages" custom v-slot="{ href, title }">
          <CyberTile title="MESSAGES" subtitle="Incoming Packets" variant="green" layout="center" />
        </router-link>

        <router-link to="/games" custom v-slot="{ href, title }">
          <CyberTile title="GAMES" subtitle="Simulated Realities" variant="amber" layout="center" />
        </router-link>

        <router-link to="/familiars" custom v-slot="{ href, title }">
          <CyberTile
            title="FAMILIAR"
            subtitle="Synthetic Lifeforms"
            variant="cyan"
            layout="center"
          />
        </router-link>

        <router-link to="/inventory" custom v-slot="{ href, title }">
          <CyberTile
            title="INVENTORY"
            subtitle="Hardware Inventory"
            variant="blue"
            layout="center"
          />
        </router-link>

        <router-link to="/archives" custom v-slot="{ href, title }">
          <CyberTile title="ARCHIVES" subtitle="Maps and Wiki" variant="red" layout="center" />
        </router-link>
      </div>
    </main>

    <!-- SYSTEM FOOTER -->
    <footer class="hub-footer">
      <p class="glow-purple">v1.0.6 // NEURAL_LINK_HUB // ENCRYPTED_CONNECTION_ESTABLISHED</p>
    </footer>

    <!-- Global Navigation -->
    <GlobalNav />
  </div>
</template>

<script setup>
import CyberTile from '../components/CyberTile.vue'
import GlobalNav from '../components/GlobalNav.vue'
</script>

<style scoped>
.hub-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var--space-md;
}

.hub-header {
  text-align: center;
  margin-bottom: var--space-xl;
}

.hub-container {
  width: 100%;
  max-width: 900px;
}

/* Standard mobile-first grid defined in main.css */
.app-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var--space-lg;
}

@media (min-width: 768px) {
  .app-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var--space-xxl;
  }
}

/* Footer styling */
.hub-footer {
  margin-top: var(--space-huge);
  padding-bottom: var--space-md;
}
</style>
