<script setup>
import { ref, onUnmounted, computed } from 'vue'

// Game State
const gameState = ref('menu') // 'menu', 'playing', 'gameover'
const score = ref(0)
const highscore = ref(localStorage.getItem('duck_runner_highscore') || 0)
const difficulty = ref('normal')
const endReason = ref('time') // 'time' or 'damage'

// Physics & Entities
const duckY = ref(0) // Height above ground in pixels
const duckVelocityY = ref(0)
const isJumping = ref(false)
const obstacles = ref([])
const coins = ref([])

// Timer & Health / Damage tracking
const gameTimer = ref(30) // Starts at 30 seconds, counts down to 0
const lives = ref(2) // 2 lives (1st hit = damage, 2nd hit = game over)
const hitEffect = ref(false) // Visual flash on collision

// Difficulty Configurations
const configs = {
  easy: { speed: 4, spawnInterval: 2200, gravity: 0.65, jumpPower: 12.5 },
  normal: { speed: 6, spawnInterval: 1600, gravity: 0.75, jumpPower: 13.5 },
  hard: { speed: 8, spawnInterval: 1100, gravity: 0.85, jumpPower: 14.5 },
}

let gameLoopId = null
let spawnerId = null
let timerIntervalId = null
let obstacleIdCounter = 0
let coinIdCounter = 0

// Formatted Timer Display (0:30, 0:29, etc.)
const formattedTime = computed(() => {
  const secs = Math.max(0, gameTimer.value)
  return `0:${secs.toString().padStart(2, '0')}`
})

// Web Audio Synthesizer for Arcade Sounds
const playSound = (type) => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    const now = audioCtx.currentTime

    if (type === 'quack') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.linearRampToValueAtTime(240, now + 0.15)
      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
    } else if (type === 'coin') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(987.77, now)
      osc.frequency.setValueAtTime(1318.51, now + 0.08)
      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
      osc.start(now)
      osc.stop(now + 0.2)
    } else if (type === 'hit') {
      osc.type = 'square'
      osc.frequency.setValueAtTime(180, now)
      osc.frequency.linearRampToValueAtTime(80, now + 0.25)
      gain.gain.setValueAtTime(0.3, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25)
      osc.start(now)
      osc.stop(now + 0.25)
    } else if (type === 'crash' || type === 'victory') {
      osc.type = type === 'victory' ? 'triangle' : 'sawtooth'
      osc.frequency.setValueAtTime(type === 'victory' ? 523.25 : 120, now)
      osc.frequency.linearRampToValueAtTime(type === 'victory' ? 783.99 : 30, now + 0.4)
      gain.gain.setValueAtTime(0.35, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4)
      osc.start(now)
      osc.stop(now + 0.4)
    } else if (type === 'start') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.setValueAtTime(554.37, now + 0.1)
      osc.frequency.setValueAtTime(659.25, now + 0.2)
      gain.gain.setValueAtTime(0.25, now)
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
  gameTimer.value = 30
  lives.value = 2
  duckY.value = 0
  duckVelocityY.value = 0
  isJumping.value = false
  obstacles.value = []
  coins.value = []
  gameState.value = 'playing'
  playSound('start')

  clearInterval(gameLoopId)
  clearInterval(spawnerId)
  clearInterval(timerIntervalId)

  // Main 60fps Game Loop
  gameLoopId = setInterval(updateGame, 1000 / 60)

  // Spawner Loop
  const cfg = configs[difficulty.value]
  spawnerId = setInterval(spawnEntities, cfg.spawnInterval)

  // Countdown Timer Interval (-1 every second)
  timerIntervalId = setInterval(() => {
    if (gameState.value === 'playing') {
      if (gameTimer.value > 0) {
        gameTimer.value--
      }
      if (gameTimer.value <= 0) {
        endGame('time') // Timer reached 0 -> You Win!
      }
    }
  }, 1000)
}

const jump = () => {
  if (gameState.value !== 'playing') return
  const cfg = configs[difficulty.value]

  // Allow single jump from ground
  if (!isJumping.value && duckY.value <= 0) {
    duckVelocityY.value = cfg.jumpPower
    isJumping.value = true
    playSound('quack')
  }
}

const spawnEntities = () => {
  if (gameState.value !== 'playing') return

  const roll = Math.random()
  if (roll < 0.6) {
    // Spawn fence obstacle
    obstacles.value.push({
      id: obstacleIdCounter++,
      x: 390,
      width: 30,
      height: 38,
      passed: false,
    })
  } else {
    // Spawn coin
    coins.value.push({
      id: coinIdCounter++,
      x: 390,
      y: Math.random() > 0.5 ? 55 : 20,
      size: 24,
      collected: false,
    })
  }
}

const updateGame = () => {
  if (gameState.value !== 'playing') return
  const cfg = configs[difficulty.value]

  // Update Duck Physics (Gravity & Jumping)
  if (isJumping.value || duckY.value > 0) {
    duckVelocityY.value -= cfg.gravity
    duckY.value += duckVelocityY.value

    if (duckY.value <= 0) {
      duckY.value = 0
      duckVelocityY.value = 0
      isJumping.value = false
    }
  }

  // Duck Bounding Box (Stage X: 45 to 80)
  const duckLeft = 45
  const duckRight = 80
  const duckBottom = duckY.value
  const duckTop = duckY.value + 36

  // Move Obstacles & Check Collisions
  for (let i = obstacles.value.length - 1; i >= 0; i--) {
    const obs = obstacles.value[i]
    obs.x -= cfg.speed

    // Obstacle Bounding Box
    const obsLeft = obs.x
    const obsRight = obs.x + obs.width
    const obsBottom = 0
    const obsTop = obs.height

    // Precise Collision: X overlaps AND Duck is not high enough above the fence
    const isXOverlap = duckRight > obsLeft + 4 && duckLeft < obsRight - 4
    const isYOverlap = duckBottom < obsTop - 6
    const isColliding = isXOverlap && isYOverlap

    if (!obs.passed && isColliding) {
      obs.passed = true
      handleCollision()
      if (gameState.value === 'gameover') return
    }

    // Score when successfully passed without hitting
    if (!obs.passed && obs.x + obs.width < duckLeft) {
      obs.passed = true
      score.value += 15
    }

    // Remove off-screen obstacles
    if (obs.x + obs.width < 0) {
      obstacles.value.splice(i, 1)
    }
  }

  // Move Coins & Check Collection
  for (let i = coins.value.length - 1; i >= 0; i--) {
    const coin = coins.value[i]
    coin.x -= cfg.speed

    const coinLeft = coin.x
    const coinRight = coin.x + coin.size
    const coinBottom = coin.y
    const coinTop = coin.y + coin.size

    const isCoinColliding =
      duckRight > coinLeft && duckLeft < coinRight && duckTop > coinBottom && duckBottom < coinTop

    if (!coin.collected && isCoinColliding) {
      coin.collected = true
      playSound('coin')
      coins.value.splice(i, 1)
      score.value += 25
    } else if (coin.x + coin.size < 0) {
      coins.value.splice(i, 1)
    }
  }
}

const handleCollision = () => {
  lives.value--
  hitEffect.value = true
  setTimeout(() => {
    hitEffect.value = false
  }, 350)

  if (lives.value > 0) {
    playSound('hit') // 1st hit: take damage, lose 1 life
  } else {
    endGame('damage') // 2nd hit: game over
  }
}

const endGame = (reason) => {
  endReason.value = reason
  gameState.value = 'gameover'
  clearInterval(gameLoopId)
  clearInterval(spawnerId)
  clearInterval(timerIntervalId)

  if (reason === 'time') {
    playSound('victory')
    score.value += 200 // Bonus for surviving 30 seconds!
  } else {
    playSound('crash')
  }

  if (score.value > highscore.value) {
    highscore.value = score.value
    localStorage.setItem('duck_runner_highscore', highscore.value)
  }
}

onUnmounted(() => {
  clearInterval(gameLoopId)
  clearInterval(spawnerId)
  clearInterval(timerIntervalId)
})
</script>

<template>
  <div class="mole-game-container">
    <!-- Arcade Header -->
    <header class="arcade-header">
      <h1 class="title">QUACK_RUN: POND_DASH</h1>
      <p class="subtitle">30-Second Survival Challenge</p>
    </header>

    <!-- Main Game Wrapper -->
    <div class="arcade-cabinet">
      <!-- MENU SCREEN -->
      <div v-if="gameState === 'menu'" class="screen menu-screen">
        <div class="menu-banner">
          <h2>SELECT SPEED</h2>
        </div>
        <div class="difficulty-buttons">
          <button class="btn btn-easy" @click="startGame('easy')">CHILL POND (EASY)</button>
          <button class="btn btn-normal" @click="startGame('normal')">RIVER RAPIDS (NORMAL)</button>
          <button class="btn btn-hard" @click="startGame('hard')">WATERFALL (HARD)</button>
        </div>
        <div class="instructions">
          <p>⏱️ <span class="text-golden">30s Timer</span> = Survive to Win!</p>
          <p>❤️ <span class="text-mole">2 Lives</span> = Damaged on 1st hit, Over on 2nd.</p>
          <p>
            🪙 <span class="text-golden">Coins (+25)</span> & 🪵
            <span class="text-bomb">Fences</span>
          </p>
        </div>
      </div>

      <!-- PLAYING SCREEN -->
      <div v-if="gameState === 'playing'" class="screen play-screen">
        <!-- Stats & Timer Bar -->
        <div class="stats-bar">
          <div class="stat-box">
            <span class="stat-label">TIME LEFT</span>
            <span class="stat-value text-timer">{{ formattedTime }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">LIVES</span>
            <span class="stat-value text-lives">
              <span v-for="n in lives" :key="n">❤️</span>
              <span v-for="n in 2 - lives" :key="'empty-' + n" class="empty-heart">🖤</span>
            </span>
          </div>
          <div class="stat-box">
            <span class="stat-label">SCORE</span>
            <span class="stat-value">{{ score }}</span>
          </div>
        </div>

        <!-- Runner Viewport / Stage -->
        <div class="runner-stage" :class="{ 'hit-flash': hitEffect }" @pointerdown.prevent="jump">
          <!-- Coins Layer -->
          <div
            v-for="coin in coins"
            :key="'coin-' + coin.id"
            class="coin-entity"
            :style="{ left: coin.x + 'px', bottom: coin.y + 20 + 'px' }"
          >
            🪙
          </div>

          <!-- Obstacles Layer -->
          <div
            v-for="obs in obstacles"
            :key="'obs-' + obs.id"
            class="obstacle-entity"
            :style="{ left: obs.x + 'px', width: obs.width + 'px', height: obs.height + 'px' }"
          >
            🪵
          </div>

          <!-- Duck Character -->
          <div
            class="duck-entity"
            :class="{ jumping: duckY > 0, damaged: hitEffect }"
            :style="{ bottom: duckY + 18 + 'px' }"
          >
            <svg viewBox="0 0 100 100" class="duck-svg">
              <!-- Body -->
              <ellipse cx="55" cy="60" rx="28" ry="20" fill="#FFD700" />
              <!-- Head -->
              <circle cx="70" cy="38" r="16" fill="#FFD700" />
              <!-- Eye -->
              <circle cx="76" cy="34" r="3" fill="#000" />
              <circle cx="77" cy="33" r="1" fill="#FFF" />
              <!-- Beak -->
              <polygon points="85,38 98,34 85,44" fill="#FF4500" />
              <!-- Wing -->
              <ellipse cx="50" cy="58" rx="14" ry="9" fill="#FFA500" />
              <!-- Tuft -->
              <path
                d="M 68 22 Q 72 15 76 24"
                stroke="#FFD700"
                stroke-width="4"
                fill="none"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <!-- Ground Floor -->
          <div class="ground-layer"></div>
        </div>

        <!-- Jump Control Button -->
        <div class="controls-bar">
          <button class="btn btn-jump" @pointerdown.prevent="jump">JUMP 🦆</button>
        </div>
      </div>

      <!-- GAME OVER / VICTORY SCREEN -->
      <div v-if="gameState === 'gameover'" class="screen gameover-screen">
        <h2 class="gameover-title" :class="{ 'victory-title': endReason === 'time' }">
          {{ endReason === 'time' ? 'VICTORY! 🎉' : 'GAME OVER! 💥' }}
        </h2>
        <div class="final-stats">
          <p>
            {{
              endReason === 'time' ? 'You survived the full 30 seconds!' : 'You ran out of lives!'
            }}
          </p>
          <p>
            Final Score: <strong>{{ score }}</strong>
          </p>
          <p>
            High Score: <strong>{{ highscore }}</strong>
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
.mole-game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  padding: 12px;
  min-height: 100%;
  user-select: none;
}

.arcade-header {
  text-align: center;
  margin-bottom: 12px;
}

.title {
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #00ffff;
  text-shadow:
    3px 3px 0px #c0392b,
    0 0 15px rgba(0, 255, 255, 0.6);
  margin: 0;
}

.subtitle {
  font-size: 0.8rem;
  color: #a29bfe;
  letter-spacing: 3px;
  margin: 4px 0 0 0;
}

.arcade-cabinet {
  background: #0f3460;
  border: 6px solid #00ffff;
  border-radius: 16px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.7),
    inset 0 0 20px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 420px;
  padding: 12px;
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

.menu-banner h2 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #2ecc71;
  text-align: center;
}

.difficulty-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 280px;
  margin-bottom: 20px;
}

.btn {
  background: #f1c40f;
  color: #2c3e50;
  border: none;
  padding: 12px;
  font-size: 1rem;
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
  background: #00ffff;
  box-shadow: 0 4px 0 #0aa0a5;
  color: #111;
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
  font-size: 0.75rem;
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
  color: #f1c40f;
  font-weight: bold;
}
.text-bomb {
  color: #ff4500;
  font-weight: bold;
}
.text-timer {
  color: #00ffff;
  font-family: monospace;
}
.text-lives {
  color: #ff4757;
  letter-spacing: 2px;
}
.empty-heart {
  opacity: 0.3;
}

.play-screen {
  justify-content: flex-start;
  min-height: 380px;
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  gap: 6px;
}

.stat-box {
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #00ffff;
  border-radius: 6px;
  padding: 6px 4px;
  flex: 1;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.55rem;
  color: #a29bfe;
  margin-bottom: 2px;
}

.stat-value {
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
}

.runner-stage {
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, #1e3799, #4a69bd);
  border: 3px solid #78e08f;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.runner-stage.hit-flash {
  background: linear-gradient(to bottom, #822626, #c0392b);
}

.ground-layer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  background: #27ae60;
  border-top: 4px solid #2ecc71;
}

.duck-entity {
  position: absolute;
  left: 45px;
  width: 45px;
  height: 40px;
  z-index: 5;
  transition: transform 0.05s linear;
}

.duck-entity.jumping {
  transform: rotate(-10deg) scale(1.05);
}

.duck-entity.damaged {
  filter: drop-shadow(0 0 6px #ff4757) brightness(1.5);
  animation: shakeDuck 0.2s infinite alternate;
}

@keyframes shakeDuck {
  0% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(2px);
  }
}

.duck-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.4));
}

.obstacle-entity {
  position: absolute;
  bottom: 20px;
  font-size: 1.6rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 3;
}

.coin-entity {
  position: absolute;
  font-size: 1.3rem;
  z-index: 4;
  animation: floatCoin 0.8s infinite alternate ease-in-out;
}

@keyframes floatCoin {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-6px);
  }
}

.controls-bar {
  width: 100%;
  margin-top: 12px;
}

.btn-jump {
  background: #ff4757;
  color: #fff;
  width: 100%;
  padding: 16px;
  font-size: 1.3rem;
  box-shadow: 0 5px 0 #c0392b;
  border-radius: 10px;
}

.btn-jump:active {
  transform: translateY(4px);
  box-shadow: 0 1px 0 #c0392b;
}

.gameover-screen h2 {
  color: #ff4757;
  font-size: 1.5rem;
  margin-bottom: 12px;
  text-align: center;
}

.victory-title {
  color: #2ecc71 !important;
}

.final-stats {
  background: rgba(0, 0, 0, 0.4);
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.final-stats strong {
  color: #ffa502;
}

.arcade-footer {
  text-align: center;
  margin-top: 12px;
  font-size: 0.8rem;
  color: #a29bfe;
}

@media (max-width: 480px) {
  .arcade-cabinet {
    max-width: 100%;
    padding: 10px;
  }
  .title {
    font-size: 1.5rem;
  }
  .runner-stage {
    height: 180px;
  }
}
</style>
