<template>
  <div class="game-container">
    <!-- Header Info -->
    <div class="game-header">
      <div class="status-group">
        <span class="label">STATUS: <span class="glow-text-green">CONNECTED</span></span>
        <span class="label">LEVEL: {{ level }}</span>
      </div>
      <h2 class="game-title">NEON_LINK_PROTOCOL</h2>
    </div>

    <!-- The Game Board -->
    <div class="grid-viewport">
      <div class="grid-container" :class="{ 'glitch-active': isWinning }">
        <div
          v-for="(node, index) in grid"
          :key="index"
          class="node"
          :class="{
            'node-source': node.type === 'source',
            'node-terminal': node.type === 'terminal',
            'node-void': node.type === 'void',
            'node-active': path.includes(index),
            'node-highlight': selectedIndex === index,
          }"
          @click="handleNodeClick(index)"
        >
          <div class="node-core"></div>
          <div class="node-label" v-if="node.type !== 'void'">
            {{ node.type === 'source' ? 'SRC' : node.type === 'terminal' ? 'TRM' : '' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Controls & Instructions -->
    <div class="game-footer">
      <p class="instruction">
        CONNECT <span class="cyan">SRC</span> TO <span class="magenta">TRM</span> WITHOUT HITTING
        <span class="void-text">VOID</span>
      </p>
      <button class="cyber-button" @click="resetLevel">REBOOT_SEQUENCE</button>
    </div>

    <!-- Win Overlay -->
    <Transition name="fade">
      <div v-if="isWinning" class="win-overlay">
        <h1 class="win-text">CONNECTION_ESTABLISHED</h1>
        <button class="cyber-button" @click="nextLevel">INITIALIZE_NEXT_NODE</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Game Constants
const GRID_SIZE = 5
const TOTAL_NODES = GRID_SIZE * GRID_SIZE

// Game State
const level = ref(1)
const grid = ref([])
const path = ref([]) // Indices of nodes in the current circuit
const selectedIndex = ref(null)
const isWinning = ref(false)

// Initialize the grid
const initGrid = () => {
  const newGrid = Array.from({ length: TOTAL_NODES }, () => ({ type: 'empty' }))

  // 1. Place Source (Top Left) and Terminal (Bottom Right)
  newGrid[0].type = 'source'
  newGrid[TOTAL_NODES - 1].type = 'terminal'

  // 2. Carve a guaranteed path from Source to Terminal using only
  //    right/down moves, then protect every cell on that route so voids
  //    can never block the one winning circuit.
  const protectedCells = carvePath()
  for (const idx of protectedCells) {
    if (newGrid[idx].type === 'empty') newGrid[idx].type = 'path'
  }

  // 3. Place Void obstacles (scaled by level) only on unprotected cells,
  //    capped to the number of available empty cells to avoid overfilling.
  const candidates = []
  for (let i = 0; i < TOTAL_NODES; i++) {
    if (newGrid[i].type === 'empty') candidates.push(i)
  }
  shuffle(candidates)

  const voidCount = Math.min(3 + level.value, candidates.length)
  for (let i = 0; i < voidCount; i++) {
    newGrid[candidates[i]].type = 'void'
  }

  grid.value = newGrid
  path.value = []
  selectedIndex.value = null
  isWinning.value = false
}

// Randomly walk from top-left to bottom-right moving only right or down,
// producing a connected corridor that is always solvable.
const carvePath = () => {
  let idx = 0
  const cells = [0]
  while (idx !== TOTAL_NODES - 1) {
    const row = Math.floor(idx / GRID_SIZE)
    const col = idx % GRID_SIZE
    const canDown = row < GRID_SIZE - 1
    const canRight = col < GRID_SIZE - 1
    if (canDown && canRight) {
      idx += Math.random() < 0.5 ? 1 : GRID_SIZE
    } else if (canRight) {
      idx += 1
    } else {
      idx += GRID_SIZE
    }
    cells.push(idx)
  }
  return cells
}

// Fisher-Yates shuffle so the playable gaps vary between levels.
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const handleNodeClick = (index) => {
  if (isWinning.value || grid.value[index].type === 'void') return

  // If clicking an already selected node in the path, backtrack
  const pathIndex = path.value.indexOf(index)
  if (pathIndex !== -1) {
    path.value = path.value.slice(0, pathIndex + 1)
    return
  }

  // If it's the first node (Source)
  if (path.value.length === 0) {
    if (grid.value[index].type === 'source') {
      path.value.push(index)
      selectedIndex.value = index
    }
    return
  }

  // Check if adjacent to the last node in the path
  const lastIndex = path.value[path.value.length - 1]
  if (isAdjacent(lastIndex, index)) {
    path.value.push(index)
    selectedIndex.value = index
    checkWin(index)
  }
}

const isAdjacent = (idx1, idx2) => {
  const r1 = Math.floor(idx1 / GRID_SIZE)
  const c1 = idx1 % GRID_SIZE
  const r2 = Math.floor(idx2 / GRID_SIZE)
  const c2 = idx2 % GRID_SIZE
  return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1
}

const checkWin = (index) => {
  if (grid.value[index].type === 'terminal') {
    isWinning.value = true
  }
}

const resetLevel = () => {
  path.value = []
  selectedIndex.value = null
  isWinning.value = false
}

const nextLevel = () => {
  level.value++
  resetLevel()
  initGrid()
}

onMounted(initGrid)
</script>

<style scoped>
.game-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
}

/* Header Styling */
.game-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.status-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.7rem;
  letter-spacing: 1px;
}

.glow-text-green {
  color: #0f0;
  text-shadow: 0 0 8px #0f0;
}

.game-title {
  font-size: 1.2rem;
  color: var(--glow-cyan);
  text-shadow: 0 0 10px var(--glow-cyan);
  margin: 0;
}

/* Grid Styling */
.grid-viewport {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  grid-template-rows: repeat(5, 60px);
  gap: 10px;
}

.node {
  width: 60px;
  height: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.node-core {
  width: 12px;
  height: 12px;
  background: transparent;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Node Types */
.node-source .node-core {
  background: #0ff;
  box-shadow: 0 0 15px #0ff;
}

.node-terminal .node-core {
  background: #f0f;
  box-shadow: 0 0 15px #f0f;
}

.node-void {
  background: #000;
  border-color: #300;
  cursor: not-allowed;
}
.node-void .node-core {
  background: #300;
}

.node-active .node-core {
  background: #0ff;
  box-shadow: 0 0 20px #0ff;
  transform: scale(1.2);
}

.node-highlight {
  border-color: #fff;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
}

.node-label {
  position: absolute;
  font-size: 0.5rem;
  bottom: 2px;
  color: white;
}

/* Footer & Buttons */
.game-footer {
  margin-top: var(--space-xl);
  text-align: center;
}

.instruction {
  font-size: 0.8rem;
  margin-bottom: var(--space-md);
}

.cyan {
  color: #0ff;
}
.magenta {
  color: #f0f;
}
.void-text {
  color: #444;
}

.cyber-button {
  background: transparent;
  border: 1px solid var(--glow-cyan);
  color: var(--glow-cyan);
  padding: 10px 25px;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s;
}

.cyber-button:hover {
  background: var(--glow-cyan);
  color: #000;
  box-shadow: 0 0 15px var(--glow-cyan);
}

/* Win Overlay */
.win-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.win-text {
  color: #0f0;
  text-shadow: 0 0 20px #0f0;
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Animations */
.glitch-active {
  animation: glitch 0.3s infinite;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
