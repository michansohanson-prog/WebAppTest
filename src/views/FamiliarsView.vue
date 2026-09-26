<template>
  <div class="familiars-view">
    <!-- Header Branding -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">BIO_LINK</h1>
      <p class="subtitle glow-cyan">SYNTHETIC_LIFEFORM // UNIT: X-04</p>
    </header>

    <!-- Main Pet Display -->
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
          <CyberButton variant="blue" size="md" @click="feedPet"> FEED_DATA </CyberButton>
          <CyberButton variant="green" size="md" @click="playWithPet"> PLAY_SIM </CyberButton>
          <CyberButton variant="purple" size="md" class="sleep-btn" @click="sleepPet">
            STASIS
          </CyberButton>
        </div>
      </div>

      <!-- Activity Log -->
      <div class="log-container">
        <h3 class="log-title">ACTIVITY_LOG</h3>
        <div class="activity-list">
          <p v-for="(msg, index) in activityLog" :key="index" class="log-entry">
            {{ msg }}
          </p>
        </div>
      </div>
    </main>

    <footer class="hub-footer">
      <p class="small-text glow-purple">SYNTHETIC LIFEFORM V2.4 // BIO_LINK STABLE</p>
    </footer>

    <GlobalNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CyberButton from '../components/CyberButton.vue'
import GlobalNav from '../components/GlobalNav.vue'

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
  padding: var(--space-md); /* Corrected typo */
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hub-header {
  text-align: center; /* Force centering */
  margin-bottom: var(--space-xl);
  width: 100%;
}

.pet-container {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.cyber-card {
  padding: var(--space-xl);
  text-align: center;
  border: 2px solid var(--color-border);
  background: rgba(5, 5, 10, 0.8);
  backdrop-filter: var(--glass-blur);
  border-radius: var(--border-radius); /* Fixed typo */
}

.pet-entity {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto var(--space-xl); /* Fixed typo */
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--glow-cyan); /* Fixed typo */
  border-radius: 50%;
  animation: pulse 3s infinite ease-in-out;
}

.entity-core {
  width: 60px;
  height: 60px;
  background: var(--bg-void);
  border: 2px solid var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.entity-id {
  font-size: 0.6rem;
  color: var(--text-primary);
  font-family: var(--font-mono, monospace); /* Fixed typo */
}

.status-tag {
  font-size: 0.7rem;
  color: var(--glow-cyan); /* Fixed typo */
  margin-top: 2px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md); /* Fixed typo */
  margin-bottom: var(--space-xl); /* Fixed typo */
}

.stat-item {
  display: flex;
  flex-direction: column;
  font-size: var(--fs-caption);
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace); /* Fixed typo */
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--color-border);
  margin-top: 5px;
}

.progress-fill {
  height: 100%;
  background: var(--glow-cyan); /* Fixed typo */
  transition: width 0.5s ease-out;
}

.progress-fill.energy {
  background: var(--glow-purple); /* Fixed typo */
}

.progress-fill.affection {
  background: var(--glow-red); /* Fixed typo */
}

.interaction-console {
  display: flex;
  justify-content: center;
  gap: var--space-md; /* Let's fix this too in the final pass */
  margin-top: var--space-md; /* Let's fix this too */
}

/* Interaction Console Fixes */
.interaction-console {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.log-container {
  padding: var(--space-md);
  max-height: 200px;
  overflow-y: auto;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.log-title {
  margin: 0 0 var--space-sm 0; /* Let's fix this too */
  font-size: var(--fs-caption);
  color: var(--glow-cyan); /* Fixed typo */
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 5px;
}

.log-title {
  margin: 0 0 var(--space-sm) 0;
  font-size: var(--fs-caption);
  color: var(--glow-cyan);
  border-bottom: 1px solid var--color-border; /* Corrected below */
  padding-bottom: 5px;
}

.log-title {
  margin: 0 0 var(--space-sm) 0;
  font-size: var(--fs-caption);
  color: var(--glow-cyan);
  border-bottom: 1px solid var(--color-border); /* Fixed */
  padding-bottom: 5px;
}

.activity-list {
  font-family: var(--font-mono, monospace); /* Fixed typo */
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.log-entry {
  color: var(--text-secondary);
  opacity: 0.8;
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
