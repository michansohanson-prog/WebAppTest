<template>
  <div id="app">
    <!-- Hub Header Section -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">Command Center</h1>
      <p class="subtitle">System Initialization Complete</p>
    </header>

    <!-- Main Container -->
    <main class="hub-container">
      <section class="app-grid">
        <CyberTile type="messenger" title="Messenger" subtitle="Encrypted Comms" />

        <CyberTile type="email" title="Mailbox" subtitle="Priority Inbound" />

        <CyberTile type="games" title="Arcade" subtitle="Training Simulators" />

        <CyberTile type="pets" title="Biotech" subtitle="Pet Care Units" />

        <CyberTile type="inventory" title="Storage" subtitle="Hardware Assets" />

        <CyberTile type="database" title="Database" subtitle="Core Records" />
      </section>
    </main>

    <!-- Hub Footer Section -->
    <footer class="hub-footer">
      <p>&copy; 2026 Neural Network Interface | System v4.0.2</p>
      <div class="glow-purple" style="font-size: 0.8rem">STATUS: ONLINE</div>
    </footer>

    <!-- Typography & General Content Examples (Hidden or bottom) -->
    <section
      style="
        margin-top: 100px;
        padding: 20px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <h2>General Documentation</h2>
      <h3>Section One</h3>
      <p>
        This is a standard paragraph demonstrating the subtext-mint color and line height defined in
        your main.css file.
      </p>

      <h3 class="glow-amber">Interactive Example</h3>
      <p>
        The grid system automatically adjusts from 2 columns on mobile to 3 columns on desktop
        screens as per your media queries.
      </p>
    </section>
  </div>
</template>

<script setup>
import CyberTile from './components/CyberTile.vue'
// No logic required for the initial layout showcase
</script>

<style>
/*
   In a standard Vue project, you would usually import these via <style> tags:
   @import './assets/styles/variables.css';
   @import './assets/styles/main.css';
*/
</style>
