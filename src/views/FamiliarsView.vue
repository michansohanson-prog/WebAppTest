<template>
  <div class="familiars-view">
    <!-- HEADER -->
    <header class="bio-header">
      <h1 class="glow-text flicker-text">BIO_LINK</h1>
      <p class="subtitle glow-cyan">SYNTHETIC_LIFEFORM // UNIT: X-04</p>
    </header>

    <!-- MAIN PET DISPLAY -->
    <main class="pet-container">
      <div class="cyber-card pet-display-card">
        <!-- Pet Entity Placeholder -->
        <div class="pet-entity">
          <div class="pulse-ring"></div>
          <div class="entity-core">
            <span class="entity-id">UNIT_X04</span>
            <p class="status-tag">STABLE</p>
          </div>
        </div>

        <!-- Status Bars -->
        <div class="stats-grid">
          <div class="stat-item">
            <label>HUNGER</label>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: hunger + '%' }"></div>
            </div>
          </div>
          <div class="stat-item">
            <label>ENERGY</label>
            <div class="progress-bar">
              <div class="progress-fill energy" :style="{ width: energy + '%' }"></div>
            </div>
          </div>
          <div class="stat-item">
            <label>AFFECTION</label>
            <div class="progress-bar">
              <div class="progress-fill affection" :style="{ width: affection + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Interaction Console -->
        <div class="interaction-console">
          <button @click="feedPet" class="btn-action">FEED_DATA</button>
          <button @click="playWithPet" class="btn-action">PLAY_SIM</button>
          <button @click="sleepPet" class="btn-action sleep-btn">STASIS_MODE</button>
        </div>
      </div>

      <!-- Activity Log -->
      <div class="log-container cyber-card">
        <h3 class="log-title">ACTIVITY_LOG</h3>
        <div class="activity-list">
          <p v-for="(msg, index) in activityLog" :key="index" class="log-entry">
            {{ msg }}
          </p>
        </div>
      </div>
    </main>

    <footer class="bio-footer">
      <p class="small-text glow-purple">SYNTHETIC LIFEFORM V2.4 // BIO_LINK STABLE</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive stats for the virtual pet
const hunger = ref(80)
const energy = ref(60)
const affection = ref(70)
const activityLog = ref(['System Initialized...', 'Unit X-04 online.', 'Neural Link synchronized.'])

const addLog = (msg) => {
  activityLog.value.unshift(`> ${new Date().toLocaleTimeString()}: ${msg}`)
  if (activityLog.value.length > 5) activityLog.value.pop()
}

const feedPet = () => {
  hunger.value = Math.min(100, hunger.value + 20)
  affection.value = Math.min(100, affection.value + 5)
  addLog('Data packets consumed.')
}

const playWithPet = () => {
  energy.value = Math.max(0, energy.value - 10)
  affection.value = Math.min(100, affection.value + 15)
  addLog('Simulation interaction completed.')
}

const sleepPet = () => {
  energy.value = 100
  hunger.value = Math.max(0, hunger.value - 20)
  addLog('Entering stasis mode...')
}
</script>

<style scoped>
.familiars-view {
  min-height: 100vh;
  padding: 40px 20px;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bio-header {
  text-align: center;
  margin-bottom: 30px;
}

.pet-container {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pet-display-card {
  padding: 40px;
  text-align: center;
  border: 1px solid var(--border-glow);
  background: rgba(5, 5, 10, 0.8);
  backdrop-filter: blur(10px);
}

/* The "Pet" visual representation */
.pet-entity {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--glow-cyan);
  border-radius: 50%;
  animation: pulse 3s infinite ease-in-out;
}

.entity-core {
  width: 60px;
  height: 60px;
  background: var(--bg-void);
  border: 2px solid var(--text-mint);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.entity-id {
  font-size: 0.6rem;
  color: var(--text-mint);
}

.status-tag {
  font-size: 0.7rem;
  color: var(--glow-cyan);
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Stats Styling */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 40px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  color: var(--text-mint);
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-glow);
  margin-top: 5px;
}

.progress-fill {
  height: 100%;
  background: var(--glow-cyan);
  transition: width 0.5s ease-out;
}

.progress-fill.energy {
  background: var(--glow-purple);
}
.progress-fill.affection {
  background: var(--glow-red);
}

/* Interaction Buttons */
.interaction-console {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-action {
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--border-glow);
  color: var(--text-mint);
  cursor: pointer;
  font-size: 0.8rem;
}

.btn-action:hover {
  background: var(--border-glow);
  color: white;
}

.sleep-btn {
  border-style: dashed;
}

/* Activity Log */
.log-container {
  padding: 20px;
  max-height: 150px;
  overflow-y: auto;
  font-family: monospace;
}

.log-title {
  margin-top: 0;
  font-size: 0.8rem;
  color: var(--glow-cyan);
  border-bottom: 1px solid var(--border-glow);
  padding-bottom: 5px;
}

.activity-list {
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-entry {
  color: var(--text-mint);
  opacity: 0.8;
}

.bio-footer {
  margin-top: auto;
  padding: 40px 0;
}

/* Reusing our established cyber-input style */
.cyber-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glow);
  padding: 12px;
  color: var(--text-mint);
  outline: none;
}
</style>
