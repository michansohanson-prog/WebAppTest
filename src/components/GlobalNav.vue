<template>
  <nav class="global-nav">
    <div class="nav-container">
      <!-- HUB -->
      <router-link to="/hub" class="nav-btn" :class="{ active: $route.path === '/hub' }">
        <span class="nav-icon">⌗</span>
        <span class="nav-label">HUB</span>
      </router-link>

      <!-- COMM -->
      <router-link to="/comm" class="nav-btn" :class="{ active: $route.path === '/comm' }">
        <span class="nav-icon">⌬</span>
        <span class="nav-label">COMM</span>
      </router-link>

      <!-- MESSAGES -->
      <router-link to="/messages" class="nav-btn" :class="{ active: $route.path === '/messages' }">
        <span class="nav-icon">✉️</span>
        <span class="nav-label">MSG</span>
      </router-link>

      <!-- GAMES -->
      <router-link to="/games" class="nav-btn" :class="{ active: $route.path === '/games' }">
        <span class="nav-icon">🕹️</span>
        <span class="nav-label">GRID</span>
      </router-link>

      <!-- FAMILIARS -->
      <router-link
        to="/familiars"
        class="nav-btn"
        :class="{ active: $route.path === '/familiars' }"
      >
        <span class="nav-icon">🧬</span>
        <span class="nav-label">PETS</span>
      </router-link>

      <!-- INVENTORY -->
      <router-link
        to="/inventory"
        class="nav-btn"
        :class="{ active: $route.path === '/inventory' }"
      >
        <span class="nav-icon">📦</span>
        <span class="nav-label">VAULT</span>
      </router-link>

      <!-- ARCHIVES -->
      <router-link to="/archives" class="nav-btn" :class="{ active: $route.path === '/archives' }">
        <span class="nav-icon">📂</span>
        <span class="nav-label">ARCHIVE</span>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
.global-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 85px;
  background: var(--surface-dark);
  backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-container {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 var--space-sm;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav-container::-webkit-scrollbar {
  display: none;
}

.nav-btn {
  text-decoration: none;
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
  font-size: var(--fs-caption);
  font-weight: var(--font-weight-bold);
  padding: 10px var--space-md;
  letter-spacing: 1px;
  transition: all var(--transition-fast);
  scroll-snap-align: center;
}

.nav-icon {
  display: block;
  font-size: 1.4rem;
  margin-bottom: 4px;
}

.nav-label {
  display: block;
}

/* Active State */
.nav-btn.active {
  color: var(--color-blue);
  text-shadow: var(--glow-blue) !important;
  border-bottom: 2px solid var--color-blue;
}

.nav-btn:active {
  transform: scale(0.95);
}
</style>
