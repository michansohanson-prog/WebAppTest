<template>
  <div class="games-view">
    <!-- HEADER -->
    <header class="games-header">
      <h1 class="glow-text flicker-text">RECRE_ZONE</h1>
      <p class="subtitle glow-amber">SELECT_SIMULATION // NEURAL_LOAD: LOW</p>
    </header>

    <!-- GAMES GRID -->
    <main class="games-container">
      <div class="games-grid">
        <!-- Game 1: Neural Drift -->
        <div class="game-card" @click="launchGame('neural_drift')">
          <div class="card-visual drift-bg"></div>
          <div class="card-content">
            <h2 class="game-title">NEURAL DRIFT</h2>
            <p class="game-desc">High-speed spatial navigation through data streams.</p>
            <span class="launch-btn">LAUNCH_SIM</span>
          </div>
        </div>

        <!-- Game 2: Cryptos Break -->
        <div class="game-card" @click="launchGame('cryptos_break')">
          <div class="card-visual hack-bg"></div>
          <div class="card-content">
            <h2 class="game-title">CRYPTOS_BREAK</h2>
            <p class="game-desc">Decipher encrypted packet sequences in real-time.</p>
            <span class="launch-btn">LAUNCH_SIM</span>
          </div>
        </div>

        <!-- Game 3: Void Walker -->
        <div class="game-card" @click="launchGame('void_walker')">
          <div class="card-visual void-bg"></div>
          <div class="card-content">
            <h2 class="game-title">VOID WALKER</h2>
            <p class="game-desc">Exploration and memory retrieval in the void.</p>
            <span class="launch-btn">LAUNCH_SIM</span>
          </div>
        </div>

        <!-- Game 4: Echo Link -->
        <div class="game-card" @click="launchGame('echo_link')">
          <div class="card-visual echo-bg"></div>
          <div class="card-content">
            <h2 class="game-title">ECHO LINK</h2>
            <p class="game-desc">Rhythm-based frequency synchronization.</p>
            <span class="launch-btn">LAUNCH_SIM</span>
          </div>
        </div>

        <!-- Game 5: Buffer Runner -->
        <div class="game-card" @click="launchGame('buffer_runner')">
          <div class="card-visual buffer-bg"></div>
          <div class="card-content">
            <h2 class="game-title">BUFFER RUNNER</h2>
            <p class="game-desc">Avoid system overflows in a fast-paced dash.</p>
            <span class="launch-btn">LAUNCH_SIM</span>
          </div>
        </div>

        <!-- Game 6: Memory Maze -->
        <div class="game-card" @click="launchGame('memory_maze')">
          <div class="card-visual maze-bg"></div>
          <div class="card-content">
            <h2 class="game-title">MEMORY MAZE</h2>
            <p class="game-desc">Navigate shifting corridors of synthetic memory.</p>
            <span class="launch-btn">LAUNCH_SIM</span>
          </div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="games-footer">
      <p class="small-text glow-cyan">RECRE_ZONE v1.0 // SIMULATION_READY</p>
    </footer>
  </div>
</template>

<script setup>
const launchGame = (gameId) => {
  console.log(`Initializing simulation: ${gameId}`)
  // Navigation to specific game components will be added in Phase 1, Step 2
}
</script>

<style scoped>
.games-view {
  min-height: 100vh;
  padding: 40px 20px;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.games-header {
  text-align: center;
  margin-bottom: 50px;
}

.games-container {
  width: 100%;
  max-width: 1000px;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.game-card {
  position: relative;
  height: 400px;
  border: 1px solid var(--border-glow);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.game-card:hover {
  transform: scale(1.03);
  border-color: var(--glow-amber);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.2);
}

/* Visual place holders for games */
.card-visual {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.game-card:hover .card-visual {
  opacity: 0.6;
}

/* Specific Color themes for games */
.drift-bg {
  background: linear-gradient(45deg, #1a1a2e, #16213e);
}
.hack-bg {
  background: linear-gradient(45deg, #0f3460, #1e90ff);
}
.void-bg {
  background: linear-gradient(45deg, #1b1b2f, #0a0a1a);
}
.echo-bg {
  background: linear-gradient(45deg, #4a148c, #7b1fa2);
}
.buffer-bg {
  background: linear-gradient(45deg, #3e2723, #795548);
}
.maze-bg {
  background: linear-gradient(45deg, #1b5e20, #4caf50);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
}

.game-title {
  font-size: 1.5rem;
  color: var(--text-mint);
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.game-desc {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-bottom: 20px;
  color: var(--text-mint);
}

.launch-btn {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid var(--glow-amber);
  color: var(--glow-amber);
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.game-card:hover .launch-btn {
  background: var(--glow-amber);
  color: black;
}

.games-footer {
  margin-top: auto;
  padding: 40px 0;
}
</style>
