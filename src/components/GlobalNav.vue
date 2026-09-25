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
  height: 85px; /* Slightly taller to accommodate labels well */
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-glow);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-container {
  display: flex;
  gap: 20px;
  overflow-x: auto; /* Enables horizontal scrolling */
  white-space: nowrap; /* Prevents buttons from wrapping to a new line */
  padding: 0 15px;
  scroll-snap-type: x mandatory; /* Snaps to each button when swiping */
  scrollbar-width: none; /* Hides scrollbar for Firefox */
  -ms-overflow-style: none; /* Hides scrollbar for IE/Edge */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.nav-container::-webkit-scrollbar {
  display: none;
}

.nav-btn {
  text-decoration: none;
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: bold;
  padding: 10px 15px;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  scroll-snap-align: center; /* Ensures button centers when snapping */
}

.nav-icon {
  display: block;
  font-size: 1.4rem;
  margin-bottom: 4px;
}

.nav-label {
  display: block;
}

/* High Contrast Active State */
.nav-btn.active {
  color: var(--neon-blue);
  text-shadow: 0 0 8px rgba(0, 243, 255, 0.8);
  border-bottom: 2px solid var(--neon-blue);
}

.nav-btn:active {
  transform: scale(0.95); /* Visual feedback for touch */
}
</style>
