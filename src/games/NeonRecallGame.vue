<template>
  <div class="game-container">
    <!-- Background Glow Effects -->
    <div class="bg-glow glow-1"></div>
    <div class="bg-glow glow-2"></div>

    <header class="game-header">
      <h1 class="glitch-title" data-text="NEON_RECALL">NEON_RECALL</h1>
      <p class="subtitle">MEMORIZE THE SEQUENCE</p>
    </header>

    <main class="game-cabinet">
      <!-- MENU SCREEN -->
      <div v-if="gameState === 'menu'" class="screen menu-screen">
        <div class="stat-display">
          <span class="label">HIGH SCORE</span>
          <span class="value">{{ highscore }}</span>
        </div>
        <button class="btn-neon" @click="startGame">INITIALIZE_SYSTEM</button>
      </div>

      <!-- PLAYING SCREEN -->
      <div v-if="gameState === 'playing'" class="screen play-screen">
        <div class="game-info">
          <div class="info-box">
            <span class="label">LEVEL</span>
            <span class="value">{{ level }}</span>
          </div>
          <div class="info-box">
            <span class="label">SCORE</span>
            <span class="value">{{ score }}</span>
          </div>
        </div>

        <div class="grid">
          <div
            v-for="(tile, index) in tiles"
            :key="tile.id"
            class="tile"
            :class="[tile.colorClass, { active: tile.isActive }]"
            @pointerdown="handleTileClick(index)"
          >
            <div class="tile-inner"></div>
          </div>
        </div>
      </div>

      <!-- GAME OVER SCREEN -->
      <div v-if="gameState === 'gameover'" class="screen gameover-screen">
        <h2 class="error-title">SYSTEM_FAILURE</h2>
        <div class="final-stats">
          <p>
            LEVEL REACHED: <span>{{ level }}</span>
          </p>
          <p>
            TOTAL SCORE: <span>{{ score }}</span>
          </p>
        </div>
        <button class="btn-neon" @click="startGame">REBOOT_SYSTEM</button>
        <button class="btn-secondary" @click="resetToMenu">EXIT</button>
      </div>
    </main>

    <footer class="game-footer">&copy; 2026 NEON_OS // CORE_MODULE: PUZZLE</footer>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

// --- Game Configuration & State ---
const gameState = ref('menu') // 'menu', 'playing', 'gameover'
const level = ref(1)
const score = ref(0)
const highscore = ref(localStorage.getItem('neon_recall_highscore') || 0)
const sequence = ref([])
const userSequence = ref([])
const isProcessing = ref(false) // Prevents input while sequence is playing

// Grid setup: 3x3 grid (9 tiles)
const tiles = ref(
  Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index,
      colorClass: '',
      isActive: false,
    })),
)

// Pentatonic Scale Frequencies (C4 to A5) for harmonic sound
const scaleFrequencies = [
  261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0,
]
const colorClasses = [
  'cyan',
  'magenta',
  'lime',
  'yellow',
  'purple',
  'orange',
  'red',
  'blue',
  'white',
]

// --- Audio Engine (Web Audio API) ---
let audioCtx = null

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
}

const playNote = (frequency, duration = 0.4, type = 'sine') => {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime)
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration)
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start()
  osc.stop(audioCtx.currentTime + duration)
}

const playSoundEffect = (type) => {
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)

  if (type === 'success') {
    // Upward melodic arpeggio
    ;[523.25, 659.25, 783.99].forEach((freq, i) => {
      const o = audioCtx.createOscillator()
      const g = audioCtx.createGain()
      o.connect(g)
      g.connect(audioCtx.destination)
      o.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.1)
      g.gain.setValueAtTime(0.2, audioCtx.currentTime + i * 0.1)
      g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.1 + 0.3)
      o.start(audioCtx.currentTime + i * 0.1)
      o.stop(audioCtx.currentTime + i * 0.1 + 0.3)
    })
  } else if (type === 'fail') {
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(200, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5)
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5)
  } else if (type === 'start') {
    osc.frequency.setValueAtTime(440, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2)
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3)
  }
  osc.start()
  osc.stop(audioCtx.currentTime + 0.5)
}

// --- Game Logic ---

const startGame = () => {
  initAudio()
  playSoundEffect('start')
  gameState.value = 'playing'
  level.value = 1
  score.value = 0
  sequence.value = []
  nextRound()
}

const nextRound = async () => {
  isProcessing.value = true
  userSequence.value = []
  await new Promise((r) => setTimeout(r, 800))

  // Add new step to sequence
  sequence.value.push(Math.floor(Math.random() * tiles.value.length))
  await playSequence()
  isProcessing.value = false
}

const playSequence = async () => {
  for (let i = 0; i < sequence.value.length; i++) {
    const index = sequence.value[i]
    await activateTile(index)
    // Speed increases as level increases
    const delay = Math.max(300, 600 - level.value * 40)
    await new Promise((r) => setTimeout(r, delay))
  }
}

const activateTile = async (index) => {
  const tile = tiles.value[index]
  tile.isActive = true
  tile.colorClass = colorClasses[index % colorClasses.length]
  playNote(scaleFrequencies[index % scaleFrequencies.length])
  await new Promise((r) => setTimeout(r, 300))
  tile.isActive = false
}

const handleTileClick = async (index) => {
  if (gameState.value !== 'playing' || isProcessing.value) return

  const tile = tiles.value[index]
  tile.isActive = true
  tile.colorClass = colorClasses[index % colorClasses.length]
  playNote(scaleFrequencies[index % scaleFrequencies.length])
  setTimeout(() => {
    tile.isActive = false
  }, 150)

  userSequence.value.push(index)
  const step = userSequence.value.length - 1

  if (userSequence.value[step] !== sequence.value[step]) {
    gameOver()
    return
  }

  if (userSequence.value.length === sequence.value.length) {
    score.value += level.value * 100
    level.value++
    playSoundEffect('success')
    await new Promise((r) => setTimeout(r, 600))
    nextRound()
  }
}

const gameOver = () => {
  gameState.value = 'gameover'
  playSoundEffect('fail')
  if (score.value > highscore.value) {
    highscore.value = score.value
    localStorage.setItem('neon_recall_highscore', highscore.value)
  }
}

const resetToMenu = () => {
  gameState.value = 'menu'
}

onUnmounted(() => {
  if (audioCtx) audioCtx.close()
})
</script>

<style scoped>
/* --- Core Styles & Variables --- */
.game-container {
  --neon-cyan: #00f3ff;
  --neon-magenta: #ff00ff;
  --bg-dark: #050505;
  --card-bg: rgba(20, 20, 25, 0.8);

  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Orbitron', sans-serif, monospace;
  overflow: hidden;
  user-select: none;
}

/* --- Background Glows --- */
.bg-glow {
  position: absolute;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  z-index: 0;
}
.glow-1 {
  top: -10%;
  left: -10%;
  background: var(--neon-cyan);
}
.glow-2 {
  bottom: -10%;
  right: -10%;
  background: var(--neon-magenta);
}

/* --- Header & Glitch Effect --- */
.game-header {
  position: relative;
  z-index: 1;
  text-align: center;
  margin-bottom: 2rem;
}
.glitch-title {
  font-size: 3.5rem;
  letter-spacing: 8px;
  margin: 0;
  position: relative;
  text-shadow: 0 0 15px var(--neon-cyan);
}

/* --- Game Cabinet --- */
.game-cabinet {
  position: relative;
  z-index: 1;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
  width: 90%;
  max-width: 400px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
}

/* --- Menu & Stats --- */
.stat-display {
  text-align: center;
  margin-bottom: 3rem;
}
.stat-display .label {
  display: block;
  font-size: 0.7rem;
  opacity: 0.5;
  letter-spacing: 2px;
}
.stat-display .value {
  font-size: 3rem;
  color: var(--neon-cyan);
  text-shadow: 0 0 15px var(--neon-cyan);
}

.game-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
}
.info-box {
  text-align: center;
}
.info-box .label {
  display: block;
  font-size: 0.65rem;
  opacity: 0.5;
  margin-bottom: 4px;
}
.info-box .value {
  font-size: 1.4rem;
  color: #fff;
}

/* --- Grid & Tiles --- */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
  aspect-ratio: 1/1;
}
.tile {
  position: relative;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.1s ease;
}

.tile-inner {
  position: absolute;
  inset: 8px;
  border-radius: 8px;
  opacity: 0.1;
  background: currentColor;
  transition: all 0.2s ease;
}

/* Tile Colors */
.cyan {
  color: #00f3ff;
}
.magenta {
  color: #ff00ff;
}
.lime {
  color: #bcff00;
}
.yellow {
  color: #ffff00;
}
.purple {
  color: #bf00ff;
}
.orange {
  color: #ff8c00;
}
.red {
  color: #ff003c;
}
.blue {
  color: #0077ff;
}
.white {
  color: #ffffff;
}

.tile.active {
  transform: scale(0.92);
}
.tile.active .tile-inner {
  opacity: 1;
  box-shadow:
    0 0 30px currentColor,
    0 0 60px currentColor;
}

/* --- Buttons --- */
.btn-neon {
  width: 100%;
  padding: 1rem;
  font-family: inherit;
  font-weight: bold;
  background: transparent;
  border: 2px solid var(--neon-cyan);
  color: var(--neon-cyan);
  cursor: pointer;
  border-radius: 8px;
  text-transform: uppercase;
  transition: 0.3s;
}
.btn-neon:hover {
  background: var(--neon-cyan);
  color: #000;
  box-shadow: 0 0 25px var(--neon-cyan);
}

.btn-secondary {
  width: 100%;
  padding: 1rem;
  font-family: inherit;
  margin-top: 1rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #aaa;
  cursor: pointer;
  border-radius: 8px;
}

/* --- Game Over & Footer --- */
.error-title {
  color: var(--neon-magenta);
  text-shadow: 0 0 15px var(--neon-magenta);
  font-size: 2rem;
}
.final-stats {
  width: 100%;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}
.final-stats span {
  color: var(--neon-cyan);
}

.game-footer {
  margin-top: 2rem;
  font-size: 0.65rem;
  opacity: 0.3;
  letter-spacing: 2px;
}

@media (max-width: 480px) {
  .glitch-title {
    font-size: 2.2rem;
  }
  .game-cabinet {
    padding: 1.5rem;
    min-height: 450px;
  }
}
</style>
