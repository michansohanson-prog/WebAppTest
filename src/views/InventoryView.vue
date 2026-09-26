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

      <!-- INVENTORY LIST - Optimized for single column stack -->
      <div class="inventory-stack">
        <InventoryItem
          v-for="item in filteredItems"
          :key="item.id"
          :name="item.name"
          :description="`SOURCE: ${item.source}`"
          :variant="mapTypeToVariant(item.type)"
          :quantity="item.status === 'EQUIPPED' ? 1 : null"
        >
          <!-- Slot for the icon/symbol -->
          <template #icon>
            <span class="entity-symbol">{{ item.symbol }}</span>
          </template>

          <!-- Custom slot to display status if not using quantity slot -->
          <template #quantity>
            <span :class="['status-badge', item.status.toLowerCase()]">
              {{ item.status }}
            </span>
          </template>
        </InventoryItem>

        <!-- EMPTY STATE -->
        <div v-if="filteredItems.length === 0" class="empty-state">
          <p>NO_ASSETS_FOUND_IN_CURRENT_FILTER</p>
        </div>
      </div>
    </main>

    <footer class="inventory-footer">
      <p class="small-text glow-cyan">ENCRYPTION: AES_256 // VAULT_STATUS: SECURE</p>
    </footer>

    <!-- Global Navigation -->
    <GlobalNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InventoryItem from '../components/InventoryItem.vue'
import GlobalNav from '../components/GlobalNav.vue'

const currentFilter = ref('all')

// Mapping logic to ensure items use the correct brand variants
const mapTypeToVariant = (type) => {
  switch (type) {
    case 'gear':
      return 'blue'
    case 'data':
      return 'purple'
    case 'bio':
      return 'green'
    default:
      return 'grey'
  }
}

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
    name: 'BIO STIM PACK',
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
/* Standard layout tokens used across the project */
.inventory-view {
  min-height: 100vh;
  padding: var--space-md;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hub-header {
  text-align: center;
  margin-bottom: var--space-xl;
}

/* Container for the content stack */
.inventory-container {
  width: 100%;
  max-width: 800px; /* Slightly narrower to keep vertical items focused */
  margin: 0 auto;
}

/* FILTER BAR - Reverted to standard tokens */
.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-xl);
  padding: var--space-md;
  border: 2px solid var(--color-border);
  background: rgba(10, 10, 15, 0.8);
}

/* Scrollable container for mobile */
.scroll-container {
  display: flex;
  gap: var--space-md;
  overflow-x: auto;
  white-space: nowrap;
  padding: 4px 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.filter-bar button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var--text-primary;
  padding: var(--space-sm) 24px;
  font-size: var--fs-caption;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-bar button.active {
  background: var--color-blue;
  color: #ffffff !important;
  border-color: var(--color-blue);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
}

/* INVENTORY STACK - Single column for portrait phones */
.inventory-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg); /* Large vertical gap between items */
  width: 100%;
}

/* Ensure the container handles wide text within its own constraints */
.empty-state {
  text-align: center;
  padding: var--space-xxl;
  opacity: 0.5;
  color: var(--text-secondary);
}

/* Status Badge Styling */
.status-badge {
  font-size: 0.6rem;
  padding: 2px 8px;
  border: 1px solid var--glow-cyan;
  color: var(--glow-cyan);
  border-radius: 4px;
  text-transform: uppercase;
}

@media (min-width: 768px) {
  /* We keep it in a single column for clarity as requested,
     but you could easily switch this to grid on large monitors if needed */
  .inventory-stack {
    max-width: 900px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .inventory-view {
    padding: var--space-xs;
  }
}
</style>
