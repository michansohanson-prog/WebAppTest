<template>
  <button
    :disabled="loading || disabled"
    type="button"
    :class="[
      'cyber-btn',
      `btn-${size}`,
      `variant-${variant}`,
      { 'is-loading': loading, 'is-on': isOn },
    ]"
    @click="$emit('click')"
  >
    <!-- Loading Spinner -->
    <span v-if="loading" class="spinner"></span>

    <!-- Button Content Slot (Supports Icons + Text) -->
    <span :class="{ 'btn-content': !loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'blue', // green, red, blue, yellow, purple
    validator: (v) => ['green', 'red', 'blue', 'yellow', 'purple'].includes(v),
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isOn: {
    type: Boolean,
    default: false, // Toggle state for active/on feel
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  soundEffect: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  if (loading || disabled) return

  if (props.soundEffect) {
    const audio = new Audio(props.soundEffect)
    audio.play().catch((e) => console.log('Audio play blocked by browser interaction.'))
  }

  emit('click')
}
</script>

<style scoped>
/* Base Button Styling using Global Variables */
.cyber-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  font-weight: 900;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 var(--space-md); /* Using new spacing variable */
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

/* Height Logic from variables.css */
.btn-sm {
  height: var(--btn-height-sm);
  font-size: 0.8rem;
}
.btn-md {
  height: var(--btn-height-md);
  font-size: 1rem;
}
.btn-lg {
  height: var(--btn-height-lg);
  font-size: 1.2rem;
}

/* Color Variants - Deep Dark to Neon Gradients */
/* Note: We use the brand colors from variables.css where possible */

.variant-blue {
  background: linear-gradient(135deg, #0a0e14 0%, var(--color-blue) 100%);
  border-color: var(--color-blue);
}

.variant-green {
  background: linear-gradient(135deg, #0a1208 0%, var(--color-green) 100%);
  border-color: var(--color-green);
}

.variant-red {
  background: linear-gradient(135deg, #1a0808 0%, var(--color-red) 100%);
  border-color: var(--color-red);
}

.variant-yellow {
  background: linear-gradient(135deg, #1c1405 0%, var(--color-amber) 100%);
  border-color: var--color-amber; /* Fallback to amber as it's our yellow */
}

.variant-purple {
  background: linear-gradient(135deg, #0d081a 0%, var(--color-purple) 100%);
  border-color: var(--color-purple);
}

/* Toggle / On State Logic */
.is-on {
  box-shadow: 0 0 20px currentColor; /* Dynamically uses the variant's color */
  border-width: 4px;
  transform: scale(1.03);
  filter: brightness(1.2);
}

/* Interaction States */
.cyber-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  filter: brightness(1.3);
}

.cyber-btn:active:not(:disabled) {
  transform: scale(0.95);
}

/* Loading and Disabled States */
.is-loading .btn-content {
  visibility: hidden;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cyber-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(1);
}

/* Content Layout */
.btn-content {
  display: flex;
  align-items: center;
  gap: var(--space-sm); /* Using new spacing variable */
}
</style>
