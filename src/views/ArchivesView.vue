<template>
  <div class="archives-container">
    <header class="archive-header">
      <h1 class="glow-text flicker-text">ARCHIVE_NET</h1>
      <p class="subtitle glow-red">DATABASE_ACCESS // READ_ONLY</p>
    </header>

    <main class="content-area">
      <div class="search-bar cyber-card">
        <input type="text" placeholder="QUERY DATABASE..." class="cyber-input" />
      </div>

      <div class="archive-grid">
        <!-- Category: Navigation -->
        <div class="archive-section">
          <h2 class="section-title">NAVIGATION_DATA</h2>
          <ul class="archive-list">
            <li><span class="bullet">▶</span> SECTOR_01 - NORTH_RIM</li>
            <li><span class="bullet">▶</span> SUB_LEVEL_4 - DEPOT_ZONE</li>
            <li><span class="bullet">▶</span> THE_VOID - OUTSIDE_BOUNDS</li>
          </ul>
        </div>

        <!-- Category: World Lore -->
        <div class="archive-section">
          <h2 class="section-title">WORLD_LORE</h2>
          <ul class="archive-list">
            <li><span class="bullet">▶</span> THE_GREAT_LINK_HISTORY</li>
            <li><span class="bullet">▶</span> NEURAL_COLLAPSE_RECORDS</li>
            <li><span class="bullet">▶</span> ARCHITECTS_OF_THE_VOID</li>
          </ul>
        </div>

        <!-- Category: Technical -->
        <div class="archive-section">
          <h2 class="section-title">TECHNICAL_SPECS</h2>
          <ul class="archive-list">
            <li><span class="bullet">▶</span> PROTOCOL_OVERVIEW</li>
            <li><span class="bullet">▶</span> HARDWARE_COMPATIBILITY</li>
            <li><span class="bullet">▶</span> ENCRYPTION_LEVELS</li>
          </ul>
        </div>
      </div>
    </main>

    <footer class="archive-footer">
      <p class="small-text glow-cyan">DATABASE STATUS: ONLINE // SYNCING WITH NEURAL LINK...</p>
    </footer>
  </div>
</template>

<script setup>
// Placeholder for search and filtering logic in future phases.
</script>

<style scoped>
.archives-container {
  min-height: 100vh;
  padding: 40px 20px;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.archive-header {
  text-align: center;
  margin-bottom: 30px;
}

.content-area {
  width: 100%;
  max-width: 900px;
}

.search-bar {
  margin-bottom: 40px;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.archive-section {
  background: rgba(10, 10, 15, 0.6);
  border: 1px solid var(--border-glow);
  padding: 20px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.archive-section:hover {
  border-color: var(--glow-cyan);
  transform: translateY(-2px);
}

.section-title {
  font-size: 1rem;
  color: var(--text-mint);
  margin-bottom: 15px;
  border-left: 3px solid var(--glow-red);
  padding-left: 10px;
}

.archive-list {
  list-style: none;
  padding: 0;
}

.archive-list li {
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: var(--text-mint);
  opacity: 0.8;
}

.bullet {
  color: var(--glow-cyan);
  margin-right: 10px;
}

.archive-footer {
  margin-top: auto;
  padding: 40px 0;
}

/* Reusing our cyber-input class from the main CSS */
.cyber-input {
  width: 80%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glow);
  padding: 12px;
  color: var(--text-mint);
  outline: none;
}

.cyber-input:focus {
  border-color: var(--glow-cyan);
}
</style>
