<template>
  <div class="comm-view">
    <!-- HEADER -->
    <header class="comm-header">
      <h1 class="glow-text flicker-text">COMM_LINK</h1>
      <p class="subtitle glow-purple">NEURAL_STREAM // ENCRYPTED</p>
    </header>

    <!-- MESSAGES AREA -->
    <main class="chat-container cyber-card">
      <div class="message-list">
        <!-- System Message -->
        <div class="message system">
          <span class="system-label">[SYSTEM_STATUS]:</span> Connection established via Neural Link.
        </div>

        <!-- Dummy User Messages -->
        <div class="message received">
          <span class="user-tag">USER_DELTA:</span> Are the protocols ready for deployment?
        </div>

        <div class="message sent">
          <span class="user-tag">YOU (ALPHA_09):</span> Systems are 85% calibrated. Just waiting on
          final sync.
        </div>

        <div class="message received">
          <span class="user-tag">USER_DELTA:</span> Copy that. Proceed when the stream stabilizes.
        </div>

        <div class="message system">
          <span class="system-label">[ENCRYPTION]:</span> Stream stabilized at 100%.
        </div>
      </div>

      <!-- INPUT AREA -->
      <footer class="input-area">
        <input type="text" placeholder="Transmit message..." class="cyber-input" />
        <button class="btn-primary cyber-button">SEND</button>
      </footer>
    </main>

    <footer class="comm-footer">
      <p class="small-text glow-cyan">BUFFER: ACTIVE // LATENCY: 4ms</p>
    </footer>
  </div>
</template>

<script setup>
// Logic for real-time messaging will be added in the Phase 3 (Real-Time & Social) phase.
</script>

<style scoped>
.comm-view {
  min-height: 100vh;
  padding: 20px;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
}

.comm-header {
  text-align: center;
  margin-bottom: 30px;
}

.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 75vh; /* Keeps it manageable on mobile */
  overflow: hidden;
  border: 1px solid var(--border-glow);
  background: rgba(0, 0, 0, 0.8);
}

.message-list {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  max-width: 85%;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.system {
  align-self: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed var(--border-glow);
  color: var(--text-mint);
  font-style: italic;
}

.system .system-label {
  color: var(--glow-cyan);
  font-weight: bold;
}

.received {
  align-self: flex-start;
  background: rgba(25, 25, 30, 0.8);
  border-left: 2px solid var(--glow-purple);
  color: var(--text-mint);
}

.sent {
  align-self: flex-end;
  background: rgba(40, 40, 50, 0.8);
  border-right: 2px solid var(--glow-cyan);
  color: var(--text-mint);
  text-align: right;
}

.user-tag {
  font-size: 0.75rem;
  display: block;
  margin-bottom: 4px;
  opacity: 0.6;
  font-weight: bold;
}

.input-area {
  padding: 20px;
  border-top: 1px solid var(--border-glow);
  display: flex;
  gap: 10px;
  background: rgba(5, 5, 10, 0.9);
}

.input-area input {
  flex-grow: 1;
}

.comm-footer {
  margin-top: 20px;
  text-align: center;
}

/* Reusing our established cyber-input style */
.cyber-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glow);
  padding: 12px;
  color: var(--text-mint);
  outline: none;
}

.cyber-input:focus {
  border-color: var(--glow-cyan);
}

/* Scrollbar styling for that extra cyberpunk feel */
.message-list::-webkit-scrollbar {
  width: 4px;
}
.message-list::-webkit-scrollbar-thumb {
  background: var(--border-glow);
}
</style>
