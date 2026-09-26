<template>
  <!-- Fixed: Removed complex custom classes and used only proven variables -->
  <div
    :class="['inventory-item', `variant-${variant}`, { 'is-selected': selected }]"
    @click="toggleSelection"
  >
    <div class="item-icon-slot">
      <slot name="icon"></slot>
    </div>

    <div class="item-content">
      <h3 class="item-name">{{ name }}</h3>
      <p v-if="description" class="item-desc">{{ description }}</p>
      <slot></slot>
    </div>

    <div class="item-meta-slot">
      <slot name="quantity"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  variant: {
    type: String,
    default: 'cyan',
    validator: (v) => ['cyan', 'green', 'purple', 'red', 'amber', 'blue'].includes(v),
  },
})

const selected = ref(false)
const toggleSelection = () => {
  selected.value = !selected.value
}
</script>

<style scoped>
/* Base Layout using confirmed variables */
.inventory-item {
  display: flex;
  align-items: center;
  padding: 0 var--space-md;
  height: 64px; /* Hardcoded height to ensure stability across grid rows */
  border: 2px solid transparent;
  background: rgba(10, 10, 15, 0.8); /* Reverted from non-existent surface-dark */
  border-radius: var--border-radius;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: var--space-md;
}

.inventory-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.is-selected {
  border-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5); /* Replaced non-existent glow-blue */
  background: rgba(255, 255, 255, 0.1);
}

.item-icon-slot {
  flex: 0 0 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.item-content {
  flex: 1;
  padding-left: var--space-md;
  min-width: 0; /* Crucial for preventing layout collapse */
}

.item-meta-slot {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding-left: var--space-md;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.item-name {
  font-size: var(--fs-caption); /* Reverted to confirmed token */
  color: var--text-primary;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-desc {
  font-size: var(--fs-caption);
  color: var--text-secondary;
  margin: 2px 0 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Variant Colors - Strictly mapped to your verified variables */
.variant-cyan {
  border-color: var--glow-cyan;
}
.variant-green {
  border-color: var(--color-green);
}
.variant-purple {
  border-color: var--color-purple;
}
.variant-red {
  border-color: var--color-red;
}
.variant-amber {
  border-color: var--color-amber;
}
.variant-blue {
  border-color: var(--color-blue);
}

@media (max-width: 360px) {
  .item-desc {
    display: none;
  }
}
</style>
