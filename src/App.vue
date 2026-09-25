<template>
  <div id="app">
    <!-- Hub Header Section -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">Component Library</h1>
      <p class="subtitle">Design System & Interaction Sandbox</p>
    </header>

    <main class="hub-container">
      <!-- SECTION 1: TYPOGRAPHY SHOWCASE -->
      <section class="showcase-block">
        <h2 class="glow-cyan">01. Typography</h2>
        <div class="typography-gallery">
          <div class="type-card">
            <p class="label">Headline H1</p>
            <h1>Fluid Headline One</h1>
          </div>
          <div class="type-card">
            <p class="label">Headline H2</p>
            <h2>Fluid Headline Two</h2>
          </div>
          <div class="type-card">
            <p class="label">Headline H3</p>
            <h3>Fluid Headline Three</h3>
          </div>
        </div>

        <hr class="divider" />

        <div class="typography-gallery">
          <div class="type-card">
            <p class="label">Paragraph Text</p>
            <p>
              This is the standard body text. It uses the subtext-mint color and incorporates the
              1.7 line height defined in your variables. It is optimized for readability across all
              screen sizes.
            </p>
          </div>
          <div class="type-card">
            <p class="label">Subtitle Style</p>
            <p class="subtitle">Monospace Subtitle Example</p>
          </div>
        </div>

        <hr class="divider" />

        <div class="typography-gallery">
          <div class="type-card">
            <p class="label">Utility Labels</p>
            <p>
              <span class="glow-cyan">Cyan Glow</span> |
              <span class="glow-green">Green Glow</span> |
              <span class="glow-purple">Purple Glow</span> |
              <span class="glow-red">Red Glow</span> |
              <span class="glow-amber">Amber Glow</span>
            </p>
          </div>
        </div>
      </section>

      <!-- SECTION 2: CYBERTILE GALLERY -->
      <section class="showcase-block">
        <h2 class="glow-purple">02. CyberTiles</h2>
        <div class="app-grid">
          <!-- Mapping the 5 core colors to tiles -->
          <CyberTile title="Status Unit" subtitle="Active System" variant="cyan" />
          <CyberTile title="Logs Unit" subtitle="Real-time Stream" variant="green" layout="left" />
          <CyberTile title="Purple Module" subtitle="Encrypted Data" variant="purple" />
          <CyberTile title="Alert Hub" subtitle="Critical Error" variant="red" />
          <CyberTile title="Amber Unit" subtitle="Pending Task" variant="amber" />
          <!-- Spanning Example -->
          <CyberTile title="Wide Module" subtitle="Spans 2 Columns" variant="blue" class="span-2" />
        </div>
      </section>

      <!-- SECTION 3: CYBERBUTTON GALLERY -->
      <section class="showcase-block">
        <h2 class="glow-amber">03. CyberButtons</h2>
        <div class="button-layout">
          <!-- Grouped by Color Variants -->
          <div class="button-group">
            <p class="label">Color Variants (Medium)</p>
            <CyberButton variant="blue" size="md">Blue Action</CyberButton>
            <CyberButton variant="green" size="md">Green Action</CyberButton>
            <CyberButton variant="purple" size="md">Purple Action</CyberButton>
          </div>

          <div class="button-group">
            <p class="label">Accent Variants (Medium)</p>
            <CyberButton variant="red" size="md">Red Alert</CyberButton>
            <CyberButton variant="yellow" size="md">Yellow Warn</CyberButton>
          </div>

          <!-- Grouped by Sizes -->
          <div class="button-group">
            <p class="label">Size Comparison</p>
            <CyberButton variant="blue" size="sm">Small</CyberButton>
            <CyberButton variant="green" size="md">Medium</CyberButton>
            <CyberButton variant="purple" size="lg">Large</CyberButton>
          </div>

          <!-- Grouped by Toggle States -->
          <div class="button-group">
            <p class="label">Toggle State (On/Off)</p>
            <CyberButton variant="blue" :isOn="true">Active Toggle</CyberButton>
            <CyberButton variant="green" :isOn="false">Inactive Toggle</CyberButton>
          </div>
        </div>
      </section>
    </main>

    <!-- Hub Footer Section -->
    <footer class="hub-footer">
      <p>&copy; 2026 Style Reference | Mobile-First Optimized</p>
    </footer>
  </div>
</template>

<script setup>
import CyberTile from './components/CyberTile.vue'
import CyberButton from './components/CyberButton.vue'
</script>

<style>
/* Gallery Layout Helpers - These follow the same spacing variables as the rest of the app */
.showcase-block {
  margin-bottom: var(--space-huge);
}

.typography-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.type-card {
  padding: var(--space-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.02);
}

.label {
  font-family: var(--font-mono, monospace);
  color: var(--text-secondary);
  font-size: var(--fs-caption);
  margin-bottom: var(--space-md);
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: var(--space-xs);
}

.divider {
  border: none;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: var(--space-xl) 0;
}

/* Button Grid Layout */
.button-layout {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxl);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  padding: var(--space-md);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
}

@media (max-width: 480px) {
  .button-group .cyber-btn {
    flex: 1 1 auto;
    min-width: 160px;
  }
}
</style>
