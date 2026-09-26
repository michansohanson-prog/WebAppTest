<template>
  <div class="archives-view">
    <!-- Header Branding -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">ARCHIVE_NET</h1>
      <p class="subtitle glow-red">DATABASE_ACCESS // READ_ONLY</p>
    </header>

    <main class="hub-container">
      <!-- Search Section -->
      <section class="search-block">
        <div class="input-wrapper">
          <CyberInput v-model="query" placeholder="QUERY DATABASE..." type="text" />
        </div>
      </section>

      <!-- Archives Grid -->
      <div class="archive-grid">
        <CyberTile
          title="NAVIGATION_DATA"
          subtitle="SECTOR_01 - NORTH_RIM | DEPOT_ZONE"
          variant="cyan"
          layout="left"
        />

        <CyberTile
          title="WORLD_LORE"
          subtitle="THE_GREAT_LINK | NEURAL_COLLAPSE"
          variant="purple"
        />

        <CyberTile
          title="TECHNICAL_SPECS"
          subtitle="PROTOCOL_OVERVIEW | ENCRYPTION"
          variant="blue"
        />
      </div>
    </main>

    <footer class="hub-footer">
      <p class="small-text glow-cyan">DATABASE STATUS: ONLINE // SYNCING WITH NEURAL LINK...</p>
    </footer>

    <GlobalNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CyberTile from '../components/CyberTile.vue'
import CyberInput from '../components/CyberInput.vue'
import GlobalNav from '../components/GlobalNav.vue'

const query = ref('')
</script>

<style scoped>
.archives-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: var(--space-md); /* Ensuring view content doesn't hit screen edges */
}

/* Center Header Explicitly */
.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  width: 100%;
}

.search-block {
  margin-bottom: var(--space-xxl);
  display: flex;
  justify-content: center;
  width: 100%;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-huge);
}

.hub-container {
  padding: var(--space-md); /* Corrected Typo */
}

.small-text {
  font-size: var(--fs-caption);
  letter-spacing: 2px;
}

@media (max-width: 480px) {
  .archive-grid {
    grid-template-columns: 1fr;
  }
}
</style>
