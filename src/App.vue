<template>
  <div class="app-wrapper">
    <!-- BRANDING HEADER -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">CORE_OS</h1>
      <p class="subtitle glow-cyan">USER_ID: ALPHA_09 // SESSION_STATE: ACTIVE</p>
    </header>

    <!-- MAIN INTERFACE HUB -->
    <main class="hub-container">
      <div class="app-grid">
        <button class="app-tile tile-messenger">
          <div class="tile-label glow-purple">COMM</div>
          <small class="tile-sublabel">Neural Messaging</small>
        </button>

        <button class="app-tile tile-email">
          <div class="tile-label glow-green">MESSAGES</div>
          <small class="tile-sublabel">Incoming Packets</small>
        </button>

        <button class="app-tile tile-games">
          <div class="tile-label glow-amber">GAMES</div>
          <small class="tile-sublabel">Simulated Realities</small>
        </button>

        <button class="app-tile tile-pets">
          <div class="tile-label glow-cyan">FAMILIARS</div>
          <small class="tile-sublabel">Synthetic Lifeforms</small>
        </button>

        <button class="app-tile tile-inventory">
          <div class="tile-label">INVENTORY</div>
          <small class="tile-sublabel">Hardware Inventory</small>
        </button>

        <button class="app-tile tile-database">
          <div class="tile-label glow-red">ARCHIVES</div>
          <small class="tile-sublabel">Maps and Wiki</small>
        </button>
      </div>
    </main>

    <!-- SYSTEM FOOTER -->
    <footer class="hub-footer">
      <p class="glow-purple">v1.0.6 // NEURAL_LINK_HUB // ENCRYPTED_CONNECTION_ESTABLISHED</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Logic for system state can be integrated here as we progress with Pinia integration
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.hub-header {
  text-align: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem 3rem 1rem;
}

.hub-header h1 {
  font-size: clamp(3rem, 15vw, 8rem);
  margin-bottom: 0.5rem;
}

.subtitle {
  letter-spacing: 2px;
  font-family: var(--font-mono);
}

.hub-container {
  flex: 1;
}

.app-grid {
  padding-bottom: 4rem;
}
</style>
