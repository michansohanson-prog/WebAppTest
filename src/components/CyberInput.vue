<template>
  <div class="cyber-input-container">
    <label v-if="label" :for="id" class="cyber-input-label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @blur="$emit('blur')"
        class="cyber-input-field"
        :class="{ 'is-error': error, 'is-disabled': disabled }"
      />
      <span v-if="error" class="cyber-input-error">{{ error }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'text',
    validator: (v) => ['text', 'password', 'number', 'email'].includes(v),
  },
  placeholder: String,
  id: { type: String, default: () => `input-${Math.random().toString(36).substr(2, 9)}` },
  error: String,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'blur'])
const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<style scoped>
.cyber-input-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
}

.cyber-input-label {
  font-family: var(--font-mono, monospace);
  font-size: var(--fs-caption);
  color: var(--text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.cyber-input-field {
  width: 100%;
  padding: var(--space-md);
  background: var(--input-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  color: white;
  font-family: var(--font-main);
  font-size: var(--fs-body);
  transition: all var(--transition-fast);
}

.cyber-input-field:focus {
  outline: none;
  border-color: var(--color-cyan); /* Default focus */
  box-shadow: var(--glow-cyan);
  background: rgba(15, 20, 30, 0.9);
}

.cyber-input-field.is-error {
  border-color: var(--color-red);
  box-shadow: var(--glow-red);
}

.cyber-input-field.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.cyber-input-error {
  font-size: 0.65rem;
  color: var(--color-red);
  margin-top: var(--space-xs);
  font-family: var(--font-mono, monospace);
}

@media (max-width: 480px) {
  .cyber-input-field {
    padding: var(--space-sm);
  }
}
</style>
