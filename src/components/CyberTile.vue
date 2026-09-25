<template>
  <!--
    The base class .app-tile handles the core flex behavior,
    padding, and hover effects defined in your main.css.
  -->
  <div
    :class="['app-tile', `variant-${variant}`, layout === 'left' ? 'layout-left' : 'layout-center']"
    :style="containerStyle"
  >
    <!-- Primary Label with dynamic color glow -->
    <h2 :class="['glow-' + variant, 'tile-label']">
      {{ title }}
    </h2>

    <!-- Secondary Label -->
    <p class="tile-sublabel">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  // Variants map to your brand colors
  variant: {
    type: String,
    default: 'cyan',
    validator: (v) => ['cyan', 'green', 'purple', 'red', 'amber'].includes(v),
  },
  bgImage: {
    type: String,
    default: '',
  },
  // Layout options: 'center' or 'left'
  layout: {
    type: String,
    default: 'center',
    validator: (v) => ['center', 'left'].includes(v),
  },
})

/**
 * Handles the dynamic background logic.
 * If bgImage is provided, it creates a composite background with:
 * 1. The user's image (centered/covered)
 * 2. A dark overlay gradient (rgba(0,0,0,0.6)) to ensure text readability
 * Otherwise, it returns an empty string so the CSS class gradients take over.
 */
const containerStyle = computed(() => {
  if (props.bgImage) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${props.bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  return {}
})
</script>

<style scoped>
/* Inherit .app-tile properties from main.css */
.app-tile {
  height: 100%;
  min-height: 200px; /* Mobile-friendly touch height */
}

/* Text Layout Options using spacing variables */
.layout-center {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.layout-left {
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  padding-left: var(--space-md); /* Use standard spacing */
}

/* Color Variant Styling - Integrated with variables.css */
/* We use linear gradients that transition from a deep dark base to your brand color */

.variant-cyan {
  background: linear-gradient(135deg, #0a0e14 0%, var(--color-blue) 100%);
  border: 2px solid var(--color-blue);
}

.variant-green {
  background: linear-gradient(135deg, #0a1208 0%, var(--color-green) 100%);
  border: 2px solid var(--color-green);
}

.variant-purple {
  background: linear-gradient(135deg, #0d081a 0%, var(--color-purple) 100%);
  border: 2px solid var(--color-purple);
}

.variant-red {
  background: linear-gradient(135deg, #1a0808 0%, var(--color-red) 100%);
  border: 2px solid var(--color-red);
}

.variant-amber {
  background: linear-gradient(135deg, #1c1405 0%, var(--color-amber) 100%);
  border: 2px solid var(--color-amber);
}

/* Sublabel Styling */
.tile-sublabel {
  margin-top: var(--space-sm); /* Use standard spacing variable */
}
</style>
