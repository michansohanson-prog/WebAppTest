<template>
  <div class="game-container">
    <!-- Header -->
    <header class="hub-header">
      <h2 class="glow-cyan">NEURAL_SYNC: SEQUENCE</h2>
      <div class="stats-bar">
        <span class="score-label">DATA_FRAGMENTS: {{ score }}</span>
        <span class="stability-label">STABILITY: {{ stability }}%</span>
      </div>
    </header>

    <!-- Game Area -->
    <main class="game-arena">
      <template v-if="gameState === 'START'" :class="['overlay', gameState]">
        <div class="start-card cyber-card">
          <h3>INITIALIZE_SEQUENCE</h3>
          <p>Click the data nodes in chronological order.<br />Do not desync.</p>
          <CyberButton @click="startGame" variant="blue" size="lg">START_LINK</CyberButton>
        </div>
      </template>

      <template v-else-if="gameState === 'PLAYING'" :class="['overlay', gameState]">
        <div class="nodes-grid">
          <div
            v-for="(node, index) in nodes"
            :key="index"
            class="data-node"
            :class="{
              locked: node.isLocked,
              active: node.isActive && !node.isLocked,
              error: node.isError,
            }"
            @click="handleNodeClick(index)"
          >
            <span class="node-id">{{ node.id }}</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="timer-container">
          <div class="timer-bar">
            <div class="progress" :style="{ width: stability + '%' }"></div>
          </div>
        </div>
      </template>

      <template v-else-if="gameState === 'GAMEOVER'" :class="['overlay', gameState]">
        <!-- FIXED UI LOGIC -->
        <div class="start-card cyber-card" :class="{ victory: won }">
          <h3 v-if="won">LINK_ESTABLISHED</h3>
          <h3 v-else>CONNECTION_LOST</h3>
          <p v-if="won">Sequence verified. Data fragments secured.</p>
          <p v-else>Sequence failed. Data fragments lost.</p>
          <CyberButton @click="resetGame" variant="grey" size="lg">RETRY_LINK</CyberButton>
        </div>
      </template>
    </main>

    <!-- Footer -->
    <footer class="game-footer">
      <p class="small-text">{{ statusMessage }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CyberButton from '../components/CyberButton.vue'

const gameState = ref('START')
const score = ref(0)
const stability = ref(100)
const won = ref(false)
const statusMessage = ref('AWAITING_INPUT')

let timerInterval = null
let audioCtx = null
let bgmOsc = null
let bgmGain = null

// --- 🔊 ADVANCED AUDIO ENGINE (Web Audio API Synthesis) ---
const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
}

// Creates a "thick" synth sound using two slightly detuned oscillators
const createSynthOsc = (freq, type = 'square', duration = 0.2) => {
  const osc1 = audioCtx.createOscillator()
  const osc2 = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc1.type = type
  osc2.type = type

  osc1.frequency.setValueAtTime(freq, audioCtx.currentTime)
  osc2.frequency.setValueAtTime(freq + 5, audioCtx.currentTime) // Detune for thickness

  gain.gain.setValueAtTime(0.1, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)

  osc1.connect(gain)
  osc2.connect(gain)
  gain.connect(audioCtx.destination)

  osc1.start()
  osc2.start()
  osc1.stop(audioCtx.currentTime + duration)
  osc2.stop(audioCtx.currentTime + duration)
}

// Success Arpeggio: Quick, rising pitch that scales with score
const playSuccessArp = () => {
  const baseFreq = 400 + score.value * 80
  const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5]

  freqs.forEach((f, i) => {
    // Fast arpeggio timing (50ms delay)
    setTimeout(() => createSynthOsc(f, 'square', 0.1), i * 50)
  })
}

// Fail Buzz: Low-frequency sawtooth buzz
const playFailBuzz = () => {
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(70, audioCtx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.3)
  gain.gain.setValueAtTime(0.15, audioCtx.currentTime)
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3)
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start()
  osc.stop(audioCtx.currentTime + 0.3)
}

// Win Chime: Ascending major triad using triangle wave (softer/brighter)
const playWinChime = () => {
  const freqs = [523, 659, 784] // C5, E5, G5
  freqs.forEach((f, i) => {
    setTimeout(() => createSynthOsc(f, 'triangle', 0.5), i * 150)
  })
}

const startBGM = () => {
  if (audioCtx && !window.bgmPlaying) {
    bgmOsc = audioCtx.createOscillator()
    bgmGain = audioCtx.createGain()

    bgmOsc.type = 'sawtooth'
    bgmOsc.frequency.setValueAtTime(55, audioCtx.currentTime) // Low drone base

    const lfo = audioCtx.createOscillator()
    lfo.frequency.setValueAtTime(2, audioCtx.currentTime)
    const lfoGain = audioCtx.createGain()
    lfoGain.gain.setValueAtTime(0.03, audioCtx.currentTime)

    lfo.connect(lfoGain)
    lfoGain.connect(bgmGain.gain)
    bgmGain.gain.setValueAtTime(0.04, audioCtx.currentTime)

    bgmOsc.connect(bgmGain)
    bgmGain.connect(audioCtx.destination)

    lfo.start()
    bgmOsc.start()
    window.bgmPlaying = true
  }
}

const stopBGM = () => {
  if (bgmOsc && window.bgmPlaying) {
    bgmOsc.stop()
    window.bgmPlaying = false
    bgmOsc = null
  }
}

// --- GAME LOGIC ---
const maxNodes = 6
const nodes = ref([])

const startGame = () => {
  initAudio()
  startBGM()
  gameState.value = 'PLAYING'
  won.value = false
  score.value = 0
  stability.value = 100
  statusMessage.value = 'LINK_ACTIVE'
  generateSequence()

  timerInterval = setInterval(() => {
    if (gameState.value === 'PLAYING') {
      stability.value -= 2
      if (stability.value <= 0) endGame(false)
    }
  }, 100)
}

const generateSequence = () => {
  let ids = Array.from({ length: maxNodes }, (_, i) => i + 1)
  ids.sort(() => Math.random() - 0.5)
  nodes.value = ids.map((id, index) => ({
    id: id,
    isActive: false,
    isLocked: false,
    isError: false,
  }))
}

const handleNodeClick = (index) => {
  if (gameState.value !== 'PLAYING') return

  const clickedNode = nodes.value[index]
  const nextExpectedId = score.value + 1

  if (clickedNode.id === nextExpectedId && !clickedNode.isLocked) {
    clickedNode.isLocked = true
    score.value++
    stability.value = Math.min(100, stability.value + 5)
    statusMessage.value = 'SYNC_SUCCESS'
    playSuccessArp()

    if (score.value === maxNodes) {
      endGame(true)
    }
  } else {
    clickedNode.isError = true
    stability.value -= 15
    statusMessage.value = 'SYNC_ERROR'
    playFailBuzz()

    setTimeout(() => {
      nodes.value.forEach((n) => (n.isError = false))
    }, 300)

    if (stability.value <= 0) endGame(false)
  }
}

const endGame = (victory) => {
  gameState.value = 'GAMEOVER'
  won.value = victory
  clearInterval(timerInterval)
  stopBGM() // Crucial: Stop music on end

  if (victory) {
    playWinChime()
    statusMessage.value = 'LINK_ESTABLISHED'
  } else {
    playFailBuzz()
    statusMessage.value = 'CONNECTION_LOST'
  }

  if (victory) score.value += 10
}

const resetGame = () => {
  gameState.value = 'START'
  won.value = false
  stability.value = 100
  score.value = 0
  statusMessage.value = 'AWAITING_INPUT'
  window.bgmPlaying = false
}
</script>

<style scoped>
/* --- STYLES (Consistent with your App design) --- */
.game-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-md);
  background: var(--bg-void);
}

.game-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  width: 100%;
}

.stats-bar {
  display: flex;
  justify-content: center;
  gap: var(--space-lg);
  font-family: monospace;
  color: var(--glow-cyan);
}

.game-arena {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  padding: 20px;
}

.data-node {
  aspect-ratio: 1 / 1;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 15, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.data-node.active {
  border-color: var(--glow-cyan);
  box-shadow: 0 0 15px var(--glow-cyan);
}

.data-node.locked {
  border-color: var(--glow-green);
  background: rgba(0, 255, 0, 0.1);
  color: var(--glow-green);
}

.data-node.error {
  animation: glitch 0.3s linear;
  border-color: var(--glow-red);
  background: rgba(255, 0, 0, 0.2);
}

@keyframes glitch {
  0% {
    transform: translate(2px, 2px);
  }
  25% {
    transform: translate(-2px, -2px);
  }
  50% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.timer-container {
  width: 100%;
  margin-top: var(--space-xl);
}

.timer-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, var(--glow-cyan), #fff);
  transition: width 0.1s linear;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  z-index: 10;
}

.start-card {
  padding: var(--space-xl);
  text-align: center;
}

.victory {
  border: 2px solid var(--glow-green);
  box-shadow: 0 0 30px var(--glow-green);
  background: rgba(0, 40, 0, 0.5) !important;
}

.game-footer {
  margin-top: var(--space-xl);
}

.small-text {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

@media (max-width: 480px) {
  .nodes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
