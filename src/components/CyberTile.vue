<template>
  <div
    :class="['app-tile', `variant-${variant}`, layout === 'left' ? 'layout-left' : 'layout-center']"
    :style="{
      backgroundImage: props.bgImage
        ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${props.bgImage})`
        : '',
    }"
  >
    <h2 :class="['glow-' + variant, 'tile-label']">
      {{ title }}
    </h2>

    <p class="tile-sublabel">
      {{ subtitle }}
    </p>

    <!-- This is the missing slot that allows children to render -->
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  variant: {
    type: String,
    default: 'cyan',
    validator: (v) => ['cyan', 'green', 'purple', 'red', 'amber', 'blue'].includes(v),
  },
  bgImage: { type: String, default: '' },
  layout: {
    type: String,
    default: 'center',
    validator: (v) => ['center', 'left'].includes(v),
  },
})
</script>

<style scoped>
.app-tile {
  height: 100%;
  min-height: 200px;
}

.layout-center {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.layout-left {
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  padding-left: var(--space-md);
}

/* Colors pulled directly from variables.css */
.variant-cyan {
  background: var(--gradient-cyan);
  border: 2px solid var(--color-cyan);
}

.variant-green {
  background: var(--gradient-green);
  border: 2px solid var(--color-green); /* Fixed typo */
}

.variant-purple {
  background: var(--gradient-purple);
  border: 2px solid var(--color-purple);
}

.variant-red {
  background: var(--gradient-red);
  border: 2px solid var(--color-red);
}

.variant-amber {
  background: var(--gradient-amber);
  border: 2px solid var(--color-amber); /* Fixed typo */
}

.variant-blue {
  background: var(--gradient-blue);
  border: 2px solid var(--color-blue);
}

.tile-sublabel {
  margin-top: var(--space-sm);
}
</style>
