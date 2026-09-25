<template>
  <div class="app-wrapper">
    <header class="hero">
      <h1 class="text-neon pulse-active">NEURAL_LINK // CORE</h1>
      <p class="subtitle">
        System Status: <span class="status-pulse">ACTIVE</span> | Connection:
        <span class="status-pulse">SECURE</span>
      </p>
    </header>

    <main class="content">
      <section class="grid-container">
        <!-- Card Type A -->
        <div class="card-void">
          <h2 class="glow-purple">Void_Module</h2>
          <p>
            The "Murky" gradient creates a sense of hollow depth. It feels like an empty chamber in
            the system architecture.
          </p>
          <small class="data-field">ID: 0x4F32_VOID</small><br /><br />
          <button class="btn-cyber btn-secondary">Access Logs</button>
        </div>

        <!-- Card Type B (Multi-Option Hardware Unit) -->
        <!-- Swap 'hw-green' for 'hw-blue' or 'hw-purple' to change the primary accent color! -->
        <div class="card-dark-steel hw-green">
          <h2 class="glow-green">Hardware_Unit</h2>
          <p>
            A dark steel aesthetic. It blends the void with metallic textures and a faint green
            trace of light.
          </p>
          <small class="data-field">MODEL: STEEL_7_MARK_II</small><br /><br />
          <button
            class="btn-cyber btn-secondary"
            style="border-color: var(--neon-green); color: var(--neon-green)"
          >
            Override
          </button>
        </div>

        <!-- Card Type C -->
        <div class="card-iridescent">
          <h2 class="glow-blue">Iridescent_Core</h2>
          <p>
            A "muted" colorful finish. It captures the light of the neon spectrum without being
            overbearing.
          </p>
          <small class="data-field">PROC: IRIS_CORE_V4</small><br /><br />
          <button class="btn-cyber btn-primary">Initialize</button>
        </div>
      </section>

      <section class="grid-container">
        <div class="card-void full-width">
          <h2 class="glow-blue">Command_Console</h2>
          <p>Test the "Snappy" active states on mobile. Tap buttons to trigger feedback:</p>
          <div class="button-group">
            <button class="btn-cyber btn-primary">Main Dashboard</button>
            <button class="btn-cyber btn-primary">Game Gallery</button>
            <button class="btn-cyber btn-secondary">Messenger_Link</button>
            <button
              class="btn-cyber btn-secondary"
              style="color: var(--neon-green); border-color: var(--neon-green)"
            >
              Emergency_Sync
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>SYSTEM_VERSION v1.0.4 // ARCHITECTURE: WEB_APP_TEST</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const systemOnline = true
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.subtitle {
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 2px;
}

.content {
  width: 100%;
  max-width: 1100px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.full-width {
  grid-column: 1 / -1;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 2rem;
}

@keyframes neonPulse {
  0% {
    filter: drop-shadow(0 0 5px var(--neon-blue));
  }
  50% {
    filter: drop-shadow(0 0 20px var(--neon-blue));
  }
  100% {
    filter: drop-shadow(0 0 5px var(--neon-blue));
  }
}

.pulse-active {
  animation: neonPulse 3s infinite ease-in-out;
}

@keyframes pulse-opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

.status-pulse {
  color: var(--neon-green);
  animation: pulse-opacity 2s infinite;
}

.footer {
  margin-top: auto;
  padding: 2rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}
</style>
