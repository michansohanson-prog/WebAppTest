<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Game State
const gameState = ref('menu') // 'menu', 'playing', 'gameover'
const score = ref(0)
const highscore = ref(localStorage.getItem('mole_highscore') || 0)
const timeLeft = ref(30)
const difficulty = ref('normal') // 'easy', 'normal', 'hard'
const combo = ref(0)
const maxCombo = ref(0)

// Grid Settings (3x3)
const holes = ref(
  Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index,
      status: 'empty', // 'empty', 'mole', 'golden', 'bomb'
      timer: null,
      hitState: null, // 'whacked', 'boom'
    })),
)

// Difficulty Configs
const configs = {
  easy: { speed: 1200, duration: 1500, spawnRate: 1 },
  normal: { speed: 900, duration: 1200, spawnRate: 2 },
  hard: { speed: 650, duration: 900, spawnRate: 2 },
}

let gameInterval = null
let timerInterval = null
let activeSpawnTimeout = null

// Web Audio Synthesizer for Arcade Sounds
const playSound = (type) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)

    const now = audioCtx.currentTime

    if (type === 'hit') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
      osc.start(now)
      osc.stop(now + 0.1)
    } else if (type === 'golden') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.setValueAtTime(900, now + 0.08)
      osc.frequency.setValueAtTime(1200, now + 0.16)
      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'bomb') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(150, now)
      osc.frequency.linearRampToValueAtTime(40, now + 0.3)
      gain.gain.setValueAtTime(0.5, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    } else if (type === 'start') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(300, now)
      osc.frequency.setValueAtTime(450, now + 0.1)
      osc.frequency.setValueAtTime(600, now + 0.2)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    }
  } catch (e) {
    // Audio context not allowed or supported
  }
}

const startGame = (selectedDifficulty = 'normal') => {
  difficulty.value = selectedDifficulty
  score.value = 0
  combo.value = 0
  maxCombo.value = 0
  timeLeft.value = 30
  gameState.value = 'playing'
  playSound('start')

  // Reset all holes
  holes.value.forEach((h) => {
    h.status = 'empty'
    h.hitState = null
    if (h.timer) clearTimeout(h.timer)
  })

  // Start timer countdown
  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      endGame()
    }
  }, 1000)

  // Start spawning loop
  loopSpawning()
}

const loopSpawning = () => {
  if (gameState.value !== 'playing') return

  const cfg = configs[difficulty.value]
  spawnMoles()

  activeSpawnTimeout = setTimeout(loopSpawning, cfg.speed)
}

const spawnMoles = () => {
  const cfg = configs[difficulty.value]
  const emptyHoles = holes.value.filter((h) => h.status === 'empty')
  if (emptyHoles.length === 0) return

  // Determine how many to spawn based on difficulty spawnRate
  const count = Math.min(emptyHoles.length, Math.floor(Math.random() * cfg.spawnRate) + 1)

  for (let i = 0; i < count; i++) {
    const available = holes.value.filter((h) => h.status === 'empty')
    if (available.length === 0) break

    const randomHole = available[Math.floor(Math.random() * available.length)]

    // Type roll: 70% normal, 15% golden, 15% bomb
    const roll = Math.random()
    let type = 'mole'
    if (roll > 0.85) type = 'golden'
    else if (roll > 0.7) type = 'bomb'

    randomHole.status = type
    randomHole.hitState = null

    // Auto hide after duration
    randomHole.timer = setTimeout(() => {
      if (randomHole.status !== 'empty' && !randomHole.hitState) {
        randomHole.status = 'empty'
        // If they missed a normal or golden mole, reset combo
        if (type !== 'bomb') {
          combo.value = 0
        }
      }
    }, cfg.duration)
  }
}

const whack = (hole) => {
  if (gameState.value !== 'playing') return
  if (hole.status === 'empty' || hole.hitState) return

  clearTimeout(hole.timer)

  if (hole.status === 'mole') {
    playSound('hit')
    hole.hitState = 'whacked'
    combo.value++
    if (combo.value > maxCombo.value) maxCombo.value = combo.value
    score.value += 1 + Math.floor(combo.value / 5)
  } else if (hole.status === 'golden') {
    playSound('golden')
    hole.hitState = 'whacked'
    combo.value += 2
    if (combo.value > maxCombo.value) maxCombo.value = combo.value
    score.value += 5
  } else if (hole.status === 'bomb') {
    playSound('bomb')
    hole.hitState = 'boom'
    combo.value = 0
    score.value = Math.max(0, score.value - 3)
  }

  setTimeout(() => {
    hole.status = 'empty'
    hole.hitState = null
  }, 350)
}

const endGame = () => {
  gameState.value = 'gameover'
  clearInterval(timerInterval)
  clearTimeout(activeSpawnTimeout)
  holes.value.forEach((h) => {
    h.status = 'empty'
    if (h.timer) clearTimeout(h.timer)
  })

  if (score.value > highscore.value) {
    highscore.value = score.value
    localStorage.setItem('mole_highscore', highscore.value)
  }
}

onUnmounted(() => {
  clearInterval(timerInterval)
  clearTimeout(activeSpawnTimeout)
})
</script>

<template>
  <div class="mole-game-container">
    <!-- Arcade Header -->
    <header class="arcade-header">
      <h1 class="title">MOLE_HUNT: SURFACE_BREACH</h1>
      <p class="subtitle">Arcade Edition</p>
    </header>

    <!-- Main Game Wrapper -->
    <div class="arcade-cabinet">
      <!-- MENU SCREEN -->
      <div v-if="gameState === 'menu'" class="screen menu-screen">
        <div class="menu-banner">
          <h2>SELECT DIFFICULTY</h2>
        </div>
        <div class="difficulty-buttons">
          <button class="btn btn-easy" @click="startGame('easy')">EASY</button>
          <button class="btn btn-normal" @click="startGame('normal')">NORMAL</button>
          <button class="btn btn-hard" @click="startGame('hard')">HARD</button>
        </div>
        <div class="instructions">
          <p>🎯 <span class="text-mole">Normal Mole</span> = 1 Pt</p>
          <p>⭐ <span class="text-golden">Golden Mole</span> = 5 Pts</p>
          <p>💣 <span class="text-bomb">Bomb</span> = -3 Pts & Reset Combo</p>
        </div>
      </div>

      <!-- PLAYING SCREEN -->
      <div v-if="gameState === 'playing'" class="screen play-screen">
        <div class="stats-bar">
          <div class="stat-box">
            <span class="stat-label">SCORE</span>
            <span class="stat-value">{{ score }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">TIME</span>
            <span class="stat-value" :class="{ warning: timeLeft <= 5 }">{{ timeLeft }}s</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">COMBO</span>
            <span class="stat-value combo-val">x{{ combo }}</span>
          </div>
        </div>

        <!-- 3x3 Grid -->
        <div class="grid-board">
          <div v-for="hole in holes" :key="hole.id" class="hole" @pointerdown.prevent="whack(hole)">
            <div class="dirt-rim"></div>
            <div
              class="mole-entity"
              :class="[hole.status !== 'empty' ? 'up' : 'down', hole.status, hole.hitState]"
            >
              <!-- Normal Mole SVG -->
              <svg v-if="hole.status === 'mole'" viewBox="0 0 100 100" class="mole-svg">
                <ellipse cx="50" cy="55" rx="35" ry="30" fill="#8B5A2B" />
                <circle cx="38" cy="45" r="5" fill="#FFF" />
                <circle cx="38" cy="45" r="2" fill="#000" />
                <circle cx="62" cy="45" r="5" fill="#FFF" />
                <circle cx="62" cy="45" r="2" fill="#000" />
                <ellipse cx="50" cy="55" rx="10" ry="7" fill="#DEB887" />
                <ellipse cx="50" cy="53" rx="5" ry="3" fill="#3E2723" />
                <path
                  d="M 42 68 Q 50 75 58 68"
                  stroke="#3E2723"
                  stroke-width="3"
                  fill="none"
                  stroke-linecap="round"
                />
                <!-- Hard Hat -->
                <path d="M 25 35 Q 50 15 75 35 Z" fill="#FFD700" />
                <rect x="20" y="33" width="60" height="6" rx="3" fill="#DAA520" />
              </svg>

              <!-- Golden Mole SVG -->
              <svg v-else-if="hole.status === 'golden'" viewBox="0 0 100 100" class="mole-svg">
                <ellipse cx="50" cy="55" rx="35" ry="30" fill="#FFD700" />
                <circle cx="38" cy="45" r="5" fill="#FFF" />
                <circle cx="38" cy="45" r="2" fill="#FF4500" />
                <circle cx="62" cy="45" r="5" fill="#FFF" />
                <circle cx="62" cy="45" r="2" fill="#FF4500" />
                <ellipse cx="50" cy="55" rx="10" ry="7" fill="#FFF8DC" />
                <ellipse cx="50" cy="53" rx="5" ry="3" fill="#B8860B" />
                <path
                  d="M 42 68 Q 50 75 58 68"
                  stroke="#B8860B"
                  stroke-width="3"
                  fill="none"
                  stroke-linecap="round"
                />
                <!-- Crown -->
                <polygon points="30,30 40,15 50,28 60,15 70,30" fill="#FF4500" />
              </svg>

              <!-- Bomb SVG -->
              <svg v-else-if="hole.status === 'bomb'" viewBox="0 0 100 100" class="mole-svg">
                <circle cx="50" cy="55" r="32" fill="#222" />
                <path d="M 50 23 Q 65 10 70 5" stroke="#D2B48C" stroke-width="4" fill="none" />
                <circle cx="70" cy="5" r="6" fill="#FF4500" class="fuse-spark" />
                <text
                  x="50"
                  y="63"
                  font-size="28"
                  font-weight="bold"
                  fill="#FF4500"
                  text-anchor="middle"
                >
                  X
                </text>
              </svg>
            </div>
            <!-- Hit/Boom indicator feedback -->
            <div v-if="hole.hitState === 'whacked'" class="feedback-text pts">+1</div>
            <div v-if="hole.hitState === 'boom'" class="feedback-text boom">BOOM!</div>
          </div>
        </div>
      </div>

      <!-- GAME OVER SCREEN -->
      <div v-if="gameState === 'gameover'" class="screen gameover-screen">
        <h2 class="gameover-title">GAME OVER</h2>
        <div class="final-stats">
          <p>
            Final Score: <strong>{{ score }}</strong>
          </p>
          <p>
            High Score: <strong>{{ highscore }}</strong>
          </p>
          <p>
            Max Combo: <strong>x{{ maxCombo }}</strong>
          </p>
        </div>
        <button class="btn btn-restart" @click="startGame(difficulty)">PLAY AGAIN</button>
        <button class="btn btn-menu" @click="gameState = 'menu'">MAIN MENU</button>
      </div>
    </div>

    <!-- Cabinet Footer -->
    <footer class="arcade-footer">
      <p>High Score: {{ highscore }}</p>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped Vanilla CSS Arcade Styling - FITS VIEWPORT */
.mole-game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  padding: var(--space-md);
  min-height: 100%;
  user-select: none;
}

.arcade-header {
  text-align: center;
  margin-bottom: var(--space-md);
}

.title {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--glow-cyan);
  text-shadow:
    3px 3px 0px #c0392b,
    0 0 15px rgba(0, 255, 255, 0.6);
  margin: 0;
}

.subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  letter-spacing: 4px;
  margin: 5px 0 0 0;
}

.arcade-cabinet {
  background: #0f3460;
  border: 6px solid var(--glow-cyan);
  border-radius: 16px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.7),
    inset 0 0 20px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 420px;
  padding: var(--space-md);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 380px;
}

/* Menu Styles */
.menu-banner h2 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: var(--glow-green);
  text-align: center;
}

.difficulty-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 260px;
  margin-bottom: 25px;
}

.btn {
  background: #f1c40f;
  color: #2c3e50;
  border: none;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 0 #d35400;
  transition: all 0.1s ease;
}

.btn:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #d35400;
}

.btn-easy {
  background: #2ecc71;
  box-shadow: 0 4px 0 #27ae60;
  color: #fff;
}
.btn-normal {
  background: #dfcd2b;
  box-shadow: 0 4px 0 #0aa0a5;
  color: #fff;
}
.btn-hard {
  background: #e74c3c;
  box-shadow: 0 4px 0 #c0392b;
  color: #fff;
}
.btn-restart {
  background: #00b894;
  box-shadow: 0 4px 0 #00a884;
  color: #fff;
  width: 100%;
  margin-bottom: 10px;
}
.btn-menu {
  background: #636e72;
  box-shadow: 0 4px 0 #2d3436;
  color: #fff;
  width: 100%;
}

.instructions {
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.4;
}

.text-mole {
  color: #f1c40f;
  font-weight: bold;
}
.text-golden {
  color: var(--glow-cyan);
  font-weight: bold;
}
.text-bomb {
  color: #ff4500;
  font-weight: bold;
}

/* Play Screen Styles */
.stats-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: var(--space-md);
  gap: 8px;
}

.stat-box {
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid var(--glow-cyan);
  border-radius: 6px;
  padding: 6px 10px;
  flex: 1;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.65rem;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.stat-value.warning {
  color: #ff4d4d;
  animation: pulse 0.5s infinite alternate;
}

.combo-val {
  color: var(--glow-green);
}

/* 3x3 Grid - FIXED TO FIT VIEWPORT */
.grid-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1;
}

.hole {
  background: #111;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow:
    inset 0 10px 15px rgba(0, 0, 0, 0.9),
    0 2px 5px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  touch-action: manipulation;
}

.dirt-rim {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35%;
  background: radial-gradient(ellipse at center, #4e342e 0%, #271c19 70%);
  border-top: 3px solid #6d4c41;
  border-radius: 50% 50% 0 0 / 30% 30% 0 0;
  z-index: 2;
  pointer-events: none;
}

.mole-entity {
  position: absolute;
  width: 70%;
  height: 70%;
  left: 15%;
  bottom: -70%;
  z-index: 1;
  transition: bottom 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mole-entity.up {
  bottom: 15%;
}

.mole-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));
}

/* Hit states */
.mole-entity.whacked {
  transform: scale(0.8) rotate(15deg);
  filter: brightness(1.4) sepia(1);
}

.mole-entity.boom {
  transform: scale(1.2);
  filter: hue-rotate(90deg) brightness(2);
}

.feedback-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.1rem;
  font-weight: bold;
  z-index: 5;
  animation: floatUp 0.3s ease-out forwards;
  pointer-events: none;
}

.feedback-text.pts {
  color: #2ecc71;
  text-shadow: 1px 1px 0 #000;
}

.feedback-text.boom {
  color: #e74c3c;
  text-shadow: 1px 1px 0 #000;
}

/* Game Over Screen */
.gameover-screen h2 {
  color: #ff4757;
  font-size: 1.8rem;
  margin-bottom: var(--space-md);
  text-align: center;
}

.final-stats {
  background: rgba(0, 0, 0, 0.4);
  padding: var(--space-md);
  border-radius: 8px;
  width: 100%;
  text-align: center;
  margin-bottom: var(--space-md);
  font-size: 1rem;
  line-height: 1.6;
}

.final-stats strong {
  color: #ffa502;
}

.arcade-footer {
  text-align: center;
  margin-top: var(--space-md);
  font-size: 0.85rem;
  color: var(--text-secondary);
}

/* Animations */
@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -25px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

@keyframes spark {
  0% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.fuse-spark {
  animation: spark 0.2s infinite alternate;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .arcade-cabinet {
    max-width: 100%;
    padding: var(--space-sm);
  }

  .title {
    font-size: 1.8rem;
  }

  .grid-board {
    gap: var(--space-sm);
  }
}
</style>
