<template>
  <div class="inventory-view">
    <!-- HEADER -->
    <header class="hub-header">
      <h1 class="glow-text flicker-text">STORAGE_NODE</h1>
      <p class="subtitle glow-purple">SECURE_ASSET_REPOSITORY // VAULT_ACCESS</p>
    </header>

    <main class="inventory-container">
      <!-- FILTER BAR -->
      <nav class="filter-bar cyber-card">
        <div class="scroll-container">
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
        </div>
      </nav>

      <!-- INVENTORY LIST -->
      <div class="inventory-stack">
        <InventoryItem
          v-for="item in filteredItems"
          :key="item.id"
          :name="item.name"
          :description="`SOURCE: ${item.source}`"
          :variant="mapTypeToVariant(item.type)"
          :quantity="item.status === 'EQUIPPED' ? 1 : null"
          :class="[
            `rarity-${item.rarity}`, 
            { 'is-selected': selectedItemId === item.id }
          ]"
          @click="selectItem(item.id)"
        >
          <template #icon>
            <span class="entity-symbol">{{ item.symbol }}</span>
          </template>

          <template #quantity>
            <span :class="['status-badge', item.status.toLowerCase()]">
              {{ item.status }}
            </span>
          </template>
        </InventoryItem>

        <!-- EMPTY STATE -->
        <div v-if="filteredItems.length === 0" class="empty-state">
          NO_ASSETS_FOUND_IN_CURRENT_FILTER
        </div>
      </div>
    </main>

    <footer class="inventory-footer">
      <p class="small-text glow-cyan">ENCRYPTION: AES_256 // VAULT_STATUS: SECURE</p>
    </footer>

    <GlobalNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InventoryItem from '../components/InventoryItem.vue'
import GlobalNav from '../components/GlobalNav.vue'

const currentFilter = ref('all')
const selectedItemId = ref(null)

// Logic: If you click the same item again, it deselects. 
// This ensures only 1 item is active at a time.
const selectItem = (id) => {
  if (selectedItemId.value === id) {
    selectedItemId.value = null
  } else {
    selectedItemId.value = id
  }
}

const mapTypeToVariant = (type) => {
  switch (type) {
    case 'gear': return 'blue'
    case 'data': return 'purple'
    case 'bio': return 'green'
    default: return 'grey'
  }
}

const items = ref([
  { id: 1, name: 'NEURAL_CHIP v4', type: 'gear', rarity: 'normal', source: 'VOID_WALKER', status: 'EQUIPPED', symbol: '💾' },
  { id: 2, name: 'BIO STIM PACK', type: 'data', rarity: 'magic', source: 'RECRE_ZONE', status: 'AVAILABLE', symbol: '💊' },
  { id: 3, name: 'DATA_FRAGMENT_7', type: 'data', rarity: 'legendary', source: 'DATA_STREAM', status: 'UNLOCKED', symbol: '📄' },
  { id: 4, name: 'SYNTHETIC_PET_CORE', type: 'bio', rarity: 'epic', source: 'BIO_LINK', status: 'ACTIVE', symbol: '🧬' },
  { id: 5, name: 'MAP_FRAGMENT_ALPHA', type: 'data', rarity: 'epic', source: 'ARCHIVE_NET', status: 'UNLOCKED', symbol: '🗺️' },
  { id: 6, name: 'VOID_CRYSTAL', type: 'gear', rarity: 'legendary', source: 'NEURAL_DRIFT', status: 'AVAILABLE', symbol: '💎' },
])

const filteredItems = computed(() => {
  if (currentFilter.value === 'all') return items.value
  return items.value.filter((item) => item.type === currentFilter.value)
})
</script>

<style scoped>
.inventory-view {
  min-height: 100vh;
  padding: var(--space-md);
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  width: 100%;
}

.inventory-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* --- FILTER BAR --- */
.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl);
  padding: var(--space-md);
  border: 2px solid var(--color-border);
  background: rgba(10, 10, 15, 0.8);
}

.scroll-container {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  white-space: nowrap;
  padding: 8px;
  scrollbar-width: none;
}

.filter-bar button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--text-primary);
  padding: var(--space-sm) 24px;
  font-size: var(--fs-caption);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-bar button.active {
  background: var(--color-blue);
  color: #ffffff !important;
  border-color: var(--color-blue);
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.4);
}

.inventory-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  width: 100%;
}

/* --- DYNAMIC RARITY GLOW LOGIC --- */
/* We define a CSS variable --rarity-color for each tier */

.rarity-normal {
  --rarity-color: var(--color-green);
  border-color: rgba(57, 255, 20, 0.2) !important;
}

.rarity-magic {
  --rarity-color: var(--color-blue);
  border-color: rgba(0, 123, 255, 0.2) !important;
}

.rarity-legendary {
  --rarity-color: var(--color-amber);
  border-color: rgba(255, 157, 0, 0.2) !important;
}

.rarity-epic {
  --rarity-color: var(--color-purple);
  border-color: rgba(188, 19, 254, 0.2) !important;
}

/* --- POWERFUL SELECTION EFFECT --- */
.is-selected {
  position: relative;
  z-index: 10;
  transform: scale(1.03);
  background: rgba(255, 255, 255, 0.1) !important;
  
  /* The "High Fidelity" Glow: 
     Uses the rarity color for both the outer glow and the inner bloom */
  box-shadow: 
    0 0 30px var(--rarity-color), 
    inset 0 0 20px var(--rarity-color) !important;
  
  border-color: white !important;
  
  /* Pulsing animation to make it feel "active" */
  animation: selection-pulse 2s infinite ease-in-out;
}

@keyframes selection-pulse {
  0% {
    box-shadow: 0 0 20px var(--rarity-color), inset 0 0 10px var(--rarity-color);
  }
  50% {
    box-shadow: 0 0 45px var(--rarity-color), inset 0 0 25px var(--rarity-color);
  }
  100% {
    box-shadow: 0 0 20px var(--rarity-color), inset 0 0 10px var(--rarity-color);
  }
}

.empty-state {
  text-align: center;
  padding: var(--space-xxl);
  opacity: 0.5;
  color: var(--text-secondary);
}

.status-badge {
  font-size: 0.6rem;
  padding: 2px 8px;
  border: 1px solid var(--glow-cyan);
  color: var(--glow-cyan);
  border-radius: 4px;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .inventory-stack {
    max-width: 900px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .inventory-view {
    padding: var(--space-xs);
  }
}
</style>
