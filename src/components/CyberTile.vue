<template>
  <!--
    The class "app-tile" handles base padding, flex centering, transitions,
    and hover effects. The dynamic "tile-" class handles specific borders and gradients.
  -->
  <div :class="['app-tile', `tile-${type}`]" :style="containerStyle">
    <!-- Automatic Dark Overlay (applied via background-image multi-layer if bgImage exists) -->

    <!-- Primary Label with dynamic glow based on the tile type -->
    <h2 :class="['glow-' + glowColor, 'tile-label']">
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
  // types: 'messenger', 'email', 'games', 'pets', 'inventory', 'database'
  type: {
    type: String,
    default: 'messenger',
    required: true,
  },
  bgImage: {
    type: String,
    default: '',
  },
})

/**
 * Maps the tile type to its respective glow color and specific styling
 * to ensure consistency with your main.css definitions.
 */
const glowColor = computed(() => {
  switch (props.type) {
    case 'messenger':
      return 'cyan' // Matches label #d8b4fe style
    case 'email':
      return 'green' // Matches label #4ade80 style
    case 'games':
      return 'amber' // Matches label #fbbf24 style
    case 'pets':
      return 'cyan' // Matches label #0ff style
    case 'inventory':
      return 'purple' // Matches label #fff style
    case 'database':
      return 'red' // Matches label #f87171 style
    default:
      return 'cyan'
  }
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
/*
   Note: .app-tile and .tile-xxx classes are imported from your main.css.
   We use scoped styles only for component-specific overrides if needed.
*/
.app-tile {
  height: 100%;
  min-height: 200px; /* Ensures visibility even without content */
}

/* Ensure the tile label doesn't overflow small containers */
.tile-label {
  word-wrap: break-word;
  overflow-wrap: anywhere;
}
</style>
