<template>
  <div class="hub-container">
    <!-- Navbar stays at the bottom via its own CSS, but we include it here to ensure lifecycle -->
    <GlobalNav />

    <header class="hub-header">
      <h1 class="glow-green flicker-text">GAME_SYSTEMS</h1>
      <p class="subtitle glow-cyan">SELECT A DATA_NODE TO INITIALIZE SESSION</p>
    </header>

    <main class="games-content">
      <!-- View 1: The Selection Menu -->
      <div v-if="activeGame === null" class="app-grid">
        <CyberTile
          v-for="game in gamesList"
          :key="game.id"
          :title="game.title"
          :subtitle="game.description"
          variant="blue"
          layout="center"
          @click="launchGame(game.id)"
        >
          <div class="tile-actions">
            <CyberButton variant="blue" size="sm">INITIALIZE</CyberButton>
          </div>
        </CyberTile>
      </div>

      <!-- View 2: The Active Game Engine -->
      <div v-else class="game-engine-container">
        <button class="back-button" @click="activeGame = null">[ EXIT_SESSION ]</button>

        <div class="game-viewport">
          <!-- Neural Sync Minigame (RETAINED) -->
          <NeuralSyncGame v-if="activeGame === 'neural_sync'" />

          <!-- Mole Hunt Game -->
          <MoleHuntGame v-if="activeGame === 'mole_hunt'" />

          <!-- Fallback for games not yet built -->
          <div v-else class="placeholder">[ MODULE: {{ activeGame }} STATUS: DISCONNECTED ]</div>
        </div>
      </div>
    </main>

    <footer class="hub-footer">
      <p class="small-text glow-cyan">&copy; 2026 SECURITY_PROTOCOL // GAME_SYS_ACTIVE</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GlobalNav from '../components/GlobalNav.vue'
import CyberTile from '../components/CyberTile.vue'
import CyberButton from '../components/CyberButton.vue'

// Import NeuralSyncGame and MoleHuntGame
import NeuralSyncGame from '../games/NeuralSyncGame.vue'
import MoleHuntGame from '../games/MoleHuntGame.vue'

const activeGame = ref(null)

const gamesList = [
  {
    id: 'neural_sync',
    title: 'NEURAL_SYNC',
    description: 'DECRYPT DATA FRAGMENTS',
  },
  {
    id: 'puzzle',
    title: 'PUZZLE_CORE',
    description: 'LOGIC RECONSTRUCTION',
  },
  {
    id: 'mole_hunt',
    title: 'MOLE_HUNT',
    description: 'SURFACE BREACH OPERATION',
  },
]

const launchGame = (id) => {
  activeGame.value = id
}
</script>

<style scoped>
/* Added bottom padding to prevent content from being covered by the fixed GlobalNav */
.hub-container {
  padding-bottom: 100px;
}

.games-content {
  width: 100%;
  padding: var(--space-xl);
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* The grid for selecting games */
.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
  width: 100%;
}

/* The container for the actual game play */
.game-engine-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

.game-viewport {
  width: 100%;
  max-width: 800px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: var(--space-xl);
  background: rgba(0, 0, 0, 0.4);
}

/* Back button style to stay on theme */
.back-button {
  background: transparent;
  border: 1px solid var(--glow-cyan);
  color: var(--glow-cyan);
  padding: 8px 20px;
  cursor: pointer;
  font-family: monospace;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: var(--glow-cyan);
  color: #fff;
}

.placeholder {
  padding: var--space-xl;
  text-align: center;
  color: var(--text-secondary);
}

.small-text {
  font-size: 0.7rem;
  opacity: 0.6;
}
</style>
