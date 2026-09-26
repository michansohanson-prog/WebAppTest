<template>
  <button
    :class="[
      'cyber-btn',
      `variant-${variant}`,
      size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : 'btn-md',
      { 'is-active': isOn },
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'cyan',
    validator: (v) => ['cyan', 'green', 'purple', 'red', 'amber', 'blue'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  isOn: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])
</script>

<style scoped>
.cyber-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var--space-md; /* Default md */
  border: 2px solid var(--color-border);
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-main);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--border-radius);
  text-transform: uppercase;
}

.cyber-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  filter: brightness(1.2);
  transform: translateY(-2px);
}

/* Size Variations */
.btn-sm {
  padding: var(--space-xs) var--space-sm;
  font-size: var(--fs-caption);
}
.btn-md {
  padding: var(--space-sm) var--space-lg;
  font-size: var(--fs-body);
}
.btn-lg {
  padding: var(--space-md) var--space-xl;
  font-size: var(--fs-h3);
}

/* Variant Styles using Gradients from variables.css */
.variant-cyan {
  border-color: var(--color-cyan);
  color: var(--color-cyan);
}
.variant-green {
  border-color: var(--color-green);
  color: var--(color-green);
}
.variant-purple {
  border-color: var(--color-purple);
  color: var(--color-purple);
}
.variant-red {
  border-color: var(--color-red);
  color: var(--color-red);
}
.variant-amber {
  border-color: var(--color-amber);
  color: var(--color-amber);
}
.variant-blue {
  border-color: var(--color-blue);
  color: var(--color-blue);
}

/* Glow effects on hover */
.cyber-btn:hover.variant-cyan {
  box-shadow: var(--glow-cyan);
  border-color: var(--color-cyan);
}
.cyber-btn:hover.variant-green {
  box-shadow: var(--glow-green);
  border-color: var(--color-green);
}
.cyber-btn:hover.variant-purple {
  box-shadow: var(--glow-purple);
  border-color: var(--color-purple);
}
.cyber-btn:hover.variant-red {
  box-shadow: var(--glow-red);
  border-color: (var--color-red);
}
.cyber-btn:hover.variant-amber {
  box-shadow: (var--glow-amber);
  border-color: (var--color-amber);
}
.cyber-btn:hover.variant-blue {
  box-shadow: var(--glow-blue);
  border-color: var(--color-blue);
}

.is-active {
  background: rgba(255, 255, 255, 0.15) !important;
}

.cyber-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(1);
}
</style>
