<template>
  <div class="hub-layout">
    <!-- BRANDING HEADER -->
    <header class="hub-header">
      <h1 class="glow-text flicker-text">CORE_OS</h1>
      <p class="subtitle glow-cyan">USER_ID: ALPHA_09 // SESSION_STATE: ACTIVE</p>
    </header>

    <!-- MAIN INTERFACE HUB -->
    <main class="hub-container">
      <div class="app-grid">
        <!-- 6 Uniform Tiles linked to Router Paths -->
        <router-link to="/comm" class="app-tile tile-messenger">
          <div class="tile-label glow-purple">COMM</div>
          <small class="tile-sublabel">Neural Messaging</small>
        </router-link>

        <router-link to="/messages" class="app-tile tile-email">
          <div class="tile-label glow-green">MESSAGES</div>
          <small class="tile-sublabel">Incoming Packets</small>
        </router-link>

        <router-link to="/games" class="app-tile tile-games">
          <div class="tile-label glow-amber">GAMES</div>
          <small class="tile-sublabel">Simulated Realities</small>
        </router-link>

        <router-link to="/familiars" class="app-tile tile-pets">
          <div class="tile-label glow-cyan">FAMILIAR</div>
          <small class="tile-sublabel">Synthetic Lifeforms</small>
        </router-link>

        <router-link to="/inventory" class="app-tile tile-inventory">
          <div class="tile-label">INVENTORY</div>
          <small class="tile-sublabel">Hardware Inventory</small>
        </router-link>

        <router-link to="/archives" class="app-tile tile-database">
          <div class="tile-label glow-red">ARCHIVES</div>
          <small class="tile-sublabel">Maps and Wiki</small>
        </router-link>
      </div>
    </main>

    <!-- SYSTEM FOOTER -->
    <footer class="hub-footer">
      <p class="glow-purple">v1.0.6 // NEURAL_LINK_HUB // ENCRYPTED_CONNECTION_ESTABLISHED</p>
    </footer>
  </div>
</template>

<script setup>
// Navigation logic is now handled automatically by Vue Router via <router-link>
</script>

<style scoped>
/*
   The layout uses the established design system.
   We keep the styling identical to ensure no visual regression occurs
   now that we are switching from button clicks to router links.
*/
.hub-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.hub-header {
  text-align: center;
  margin-bottom: 50px;
}

.hub-container {
  width: 100%;
  max-width: 800px;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

@media (min-width: 768px) {
  .app-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Reusing established design system classes */
.app-tile {
  aspect-ratio: 1 / 1;
  border: 1px solid var(--border-glow);
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none; /* Important for router-link styling */
}

.app-tile:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--glow-cyan);
  transform: translateY(-4px);
}

.tile-label {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.tile-sublabel {
  font-size: 0.7rem;
  opacity: 0.6;
  text-transform: uppercase;
}

.hub-footer {
  margin-top: 50px;
  padding-bottom: 20px;
}
</style>
