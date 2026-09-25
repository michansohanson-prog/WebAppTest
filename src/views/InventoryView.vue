<template>
  <div class="inventory-view">
    <!-- HEADER -->
    <header class="header-area">
      <h1 class="glow-text flicker-text">STORAGE_NODE</h1>
      <p class="subtitle glow-purple">SECURE_ASSET_REPOSITORY // VAULT_ACCESS</p>
    </header>

    <main class="inventory-container">
      <!-- FILTER BAR -->
      <nav class="filter-bar cyber-card">
        <button @click="currentFilter = 'all'" :class="{ active: currentFilter === 'all' }">
          ALL_ASSETS
        </button>
        <button @click="currentFilter = 'gear'" :class="{ active: currentFilter === 'gear' }">
          EQUIPMENT
        </button>
        <button @click="currentFilter = 'data'" :class="{ active: currentFilter === 'data' }">
          DATA_FRAGMENTS
        </button>
        <button @click="currentFilter = 'bio'" :class="{ active: currentFilter === 'bio' }">
          SYNTHETICS
        </button>
      </nav>

      <!-- INVENTORY GRID -->
      <div class="grid-vault">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="asset-card cyber-card"
          :class="item.type"
        >
          <div class="asset-icon">
            <!-- Placeholder for actual item icons -->
            <span class="entity-symbol">{{ item.symbol }}</span>
          </div>
          <div class="asset-info">
            <h3 class="asset-name">{{ item.name }}</h3>
            <p class="asset-origin">SOURCE: {{ item.source }}</p>
            <span class="asset-status">{{ item.status }}</span>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredItems.length === 0" class="empty-state">
          <p>NO_ASSETS_FOUND_IN_CURRENT_FILTER</p>
        </div>
      </div>
    </main>

    <footer class="inventory-footer">
      <p class="small-text glow-cyan">ENCRYPTION: AES_256 // VAULT_STATUS: SECURE</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentFilter = ref('all')

// Dummy data for the assets earned across the app
const items = ref([
  {
    id: 1,
    name: 'NEURAL_CHIP v4',
    type: 'gear',
    source: 'VOID_WALKER',
    status: 'EQUIPPED',
    symbol: '💾',
  },
  {
    id: 2,
    name: 'BIO_STIM_PACK',
    type: 'data',
    source: 'RECRE_ZONE',
    status: 'AVAILABLE',
    symbol: '💊',
  },
  {
    id: 3,
    name: 'DATA_FRAGMENT_7',
    type: 'data',
    source: 'DATA_STREAM',
    status: 'UNLOCKED',
    symbol: '📄',
  },
  {
    id: 4,
    name: 'SYNTHETIC_PET_CORE',
    type: 'bio',
    source: 'BIO_LINK',
    status: 'ACTIVE',
    symbol: '🧬',
  },
  {
    id: 5,
    name: 'MAP_FRAGMENT_ALPHA',
    type: 'data',
    source: 'ARCHIVE_NET',
    status: 'UNLOCKED',
    symbol: '🗺️',
  },
  {
    id: 6,
    name: 'VOID_CRYSTAL',
    type: 'gear',
    source: 'NEURAL_DRIFT',
    status: 'AVAILABLE',
    symbol: '💎',
  },
])

const filteredItems = computed(() => {
  if (currentFilter.value === 'all') return items.value
  return items.value.filter((item) => item.type === currentFilter.value)
})
</script>

<style scoped>
.inventory-view {
  min-height: 100vh;
  padding: 40px 20px;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-area {
  text-align: center;
  margin-bottom: 40px;
}

.inventory-container {
  width: 100%;
  max-width: 900px;
}

/* Filter Bar Styling */
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  padding: 15px;
  border: 1px solid var(--border-glow);
}

.filter-bar button {
  background: transparent;
  border: 1px solid var(--border-glow);
  color: var(--text-mint);
  padding: 8px 15px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-bar button.active {
  background: var(--glow-cyan);
  color: black;
  border-color: var(--glow-cyan);
}

/* Grid Layout */
.grid-vault {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.asset-card {
  padding: 20px;
  border: 1px solid var(--border-glow);
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.asset-card:hover {
  border-color: var(--glow-cyan);
  transform: translateY(-4px);
  background: rgba(20, 20, 30, 0.9);
}

.asset-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
  text-align: center;
}

.asset-info h3 {
  color: var(--text-mint);
  margin: 0 0 8px 0;
  font-size: 1rem;
  letter-spacing: 1px;
}

.asset-origin {
  font-size: 0.7rem;
  color: var(--glow-purple);
  margin-bottom: 10px;
}

.asset-status {
  display: inline-block;
  font-size: 0.65rem;
  padding: 2px 8px;
  border: 1px solid var(--glow-cyan);
  color: var(--glow-cyan);
  border-radius: 4px;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  opacity: 0.5;
  color: var(--text-mint);
}

/* Reusing established cyber-input style if needed */
.cyber-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glow);
  padding: 12px;
  color: var(--text-mint);
}

@media (max-width: 600px) {
  .grid-vault {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
</style>
