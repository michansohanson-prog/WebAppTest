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
        <!-- 
          We wrap the tiles in standard router-links. 
          The 'grid-link' class ensures the <a> tag doesn't break our layout or colors.
        -->
        <router-link to="/comm" class="grid-link">
          <CyberTile title="COMM" subtitle="Neural Messaging" variant="purple" layout="center" />
        </router-link>

        <router-link to="/messages" class="grid-link">
          <CyberTile title="MESSAGES" subtitle="Incoming Packets" variant="green" layout="center" />
        </router-link>

        <router-link to="/games" class="grid-link">
          <CyberTile title="GAMES" subtitle="Simulated Realities" variant="amber" layout="center" />
        </router-link>

        <router-link to="/familiars" class="grid-link">
          <CyberTile
            title="FAMILIAR"
            subtitle="Synthetic Lifeforms"
            variant="cyan"
            layout="center"
          />
        </router-link>

        <router-link to="/inventory" class="grid-link">
          <CyberTile
            title="INVENTORY"
            subtitle="Hardware Inventory"
            variant="blue"
            layout="center"
          />
        </router-link>

        <router-link to="/archives" class="grid-link">
          <CyberTile title="ARCHIVES" subtitle="Maps and Wiki" variant="red" layout="center" />
        </router-link>
      </div>
    </main>

    <!-- SYSTEM FOOTER -->
    <footer class="hub-footer">
      <p class="glow-purple">v1.0.6 // NEURAL_LINK_HUB // ENCRYPTED_CONNECTION_ESTABLISHED</p>
    </footer>

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
  padding: var(--space-md);
}

.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.hub-container {
  width: 100%;
  max-width: 900px;
}

/* 
  This class is crucial. 
  It makes the <a> tag (router-link) behave like a block 
  so the whole tile area is clickable without changing text style.
*/
.grid-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Grid Layout */
.app-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .app-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xxl);
  }
}

.hub-footer {
  margin-top: var(--space-huge);
  padding-bottom: var(--space-md);
  text-align: center;
}
</style>
