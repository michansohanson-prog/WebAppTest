<template>
  <div class="games-view">
    <!-- Header Branding -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">RECRE_ZONE</h1>
      <p class="subtitle glow-amber">SELECT_SIMULATION // NEURAL_LOAD: LOW</p>
    </header>

    <!-- Games Grid -->
    <main class="hub-container">
      <div class="games-grid">
        <!-- Game 1: Neural Drift -->
        <CyberTile
          title="NEURAL DRIFT"
          subtitle="High-speed spatial navigation through data streams."
          variant="blue"
          layout="center"
        >
          <div class="tile-actions">
            <CyberButton variant="blue" size="md" @click="launchGame('neural_drift')"
              >LAUNCH_SIM</CyberButton
            >
          </div>
        </CyberTile>

        <!-- Game 2: Cryptos Break -->
        <CyberTile
          title="CRYPTOS_BREAK"
          subtitle="Decipher encrypted packet sequences in real-time."
          variant="green"
          layout="center"
        >
          <div class="tile-actions">
            <CyberButton variant="green" size="md" @click="launchGame('cryptos_break')"
              >LAUNCH_SIM</CyberButton
            >
          </div>
        </CyberTile>

        <!-- Game 3: Void Walker -->
        <CyberTile
          title="VOID WALKER"
          subtitle="Exploration and memory retrieval in the void."
          variant="purple"
          layout="center"
        >
          <div class="tile-actions">
            <CyberButton variant="purple" size="md" @click="launchGame('void_walker')"
              >LAUNCH_SIM</CyberButton
            >
          </div>
        </CyberTile>

        <!-- Game 4: Echo Link -->
        <CyberTile
          title="ECHO LINK"
          subtitle="Rhythm-based frequency synchronization."
          variant="blue"
          layout="center"
        >
          <div class="tile-actions">
            <CyberButton variant="blue" size="md" @click="launchGame('echo_link')"
              >LAUNCH_SIM</CyberButton
            >
          </div>
        </CyberTile>

        <!-- Game 5: Buffer Runner -->
        <CyberTile
          title="BUFFER RUNNER"
          subtitle="Avoid system overflows in a fast-paced dash."
          variant="amber"
          layout="center"
        >
          <div class="tile-actions">
            <CyberButton variant="amber" size="md" @click="launchGame('buffer_runner')"
              >LAUNCH_SIM</CyberButton
            >
          </div>
        </CyberTile>

        <!-- Game 6: Memory Maze -->
        <CyberTile
          title="MEMORY MAZE"
          subtitle="Navigate shifting corridors of synthetic memory."
          variant="purple"
          layout="center"
        >
          <div class="tile-actions">
            <CyberButton variant="purple" size="md" @click="launchGame('memory_maze')"
              >LAUNCH_SIM</CyberButton
            >
          </div>
        </CyberTile>
      </div>
    </main>

    <!-- Footer -->
    <footer class="hub-footer">
      <p class="small-text glow-cyan">RECRE_ZONE v1.0 // SIMULATION_READY</p>
    </footer>

    <GlobalNav />
  </div>
</template>

<script setup>
import CyberTile from '../components/CyberTile.vue'
import CyberButton from '../components/CyberButton.vue'
import GlobalNav from '../components/GlobalNav.vue'

const launchGame = (gameId) => {
  console.log(`Initializing simulation: ${gameId}`)
}
</script>

<style scoped>
.games-view {
  min-height: 100vh;
  padding: var(--space-md); /* Fixed typo */
  display: flex;
  flex-direction: column;
}

.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

/* Custom styles for the action buttons inside tiles */
.tile-actions {
  margin-top: var--space-md; /* Let's fix this too in final pass */
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Interaction Console Fixes (Unified with Tiles) */
.tile-actions {
  margin-top: var(--space-md);
  display: flex;
  justify-content: center;
  width: 100%;
}

@media (max-width: 480px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>
