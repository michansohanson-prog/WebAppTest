<template>
  <div class="comm-view">
    <!-- Header Branding -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">COMM_LINK</h1>
      <p class="subtitle glow-purple">NEURAL_STREAM // ENCRYPTED</p>
    </header>

    <!-- Messaging Area -->
    <main class="chat-container">
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

      <!-- Input Area -->
      <footer class="input-area">
        <CyberInput v-model="newMessage" placeholder="Transmit message..." type="text" />
        <CyberButton variant="blue" size="md" @click="sendMessage"> SEND </CyberButton>
      </footer>
    </main>

    <footer class="hub-footer">
      <p class="small-text glow-cyan">BUFFER: ACTIVE // LATENCY: 4ms</p>
    </footer>

    <GlobalNav />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CyberInput from '../components/CyberInput.vue'
import CyberButton from '../components/CyberButton.vue'
import GlobalNav from '../components/GlobalNav.vue'

const newMessage = ref('')

const sendMessage = () => {
  if (newMessage.value.trim()) {
    console.log('Transmitting:', newMessage.value)
    newMessage.value = ''
  }
}
</script>

<style scoped>
.comm-view {
  min-height: 100vh;
  padding: var(--space-md); /* Corrected typo */
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
}

/* Ensure Header is Centered across all views */
.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  width: 100%;
}

.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - var(--space-huge)); /* Corrected typo */
  overflow: hidden;
  border: 2px solid var(--color-border);
  background: rgba(5, 5, 8, 0.9);
  border-radius: var(--border-radius);
}

.message-list {
  flex-grow: 1;
  padding: var(--space-lg); /* Corrected typo & increased for breathing room */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.message {
  max-width: 85%;
  padding: var(--space-sm) var--space-md; /* Note: Keep checking typos */
  /* Let's fix that specific line below */
}

.message {
  max-width: 85%;
  padding: var(--space-sm) var(--space-md); /* Final correction */
  border-radius: 4px;
  font-size: var(--fs-body);
  line-height: 1.4;
}

.system {
  align-self: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed var(--color-border);
  color: var(--text-primary);
  font-style: italic;
}

.system .system-label {
  color: var(--glow-cyan); /* Corrected typo */
  font-weight: var(--font-weight-bold); /* Corrected typo */
  margin-right: var(--space-sm); /* Corrected typo */
}

.received {
  align-self: flex-start;
  background: rgba(20, 20, 25, 0.8);
  border-left: 3px solid var(--color-purple); /* Corrected typo */
  color: var(--text-primary);
}

.sent {
  align-self: flex-end;
  background: rgba(35, 35, 45, 0.8);
  border-right: 3px solid var(--color-blue); /* Corrected typo */
  color: var(--text-primary);
  text-align: right;
}

.user-tag {
  font-size: var(--fs-caption); /* Corrected typo */
  display: block;
  margin-bottom: 4px;
  opacity: 0.6;
  font-weight: var(--font-weight-bold); /* Corrected typo */
  font-family: var(--font-mono, monospace); /* Corrected typo */
}

.input-area {
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var--space-md; /* Let's fix this too in the final pass */
  background: rgba(5, 5, 10, 0.9);
}

/* Final Correction for input area gap typo */
.input-area {
  padding: var(--space-md);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--space-md); /* Fixed */
  background: rgba(5, 5, 10, 0.9);
}

:deep(.cyber-input-container) {
  flex-grow: 1;
}

.message-list::-webkit-scrollbar {
  width: 4px;
}
.message-list::-webkit-scrollbar-thumb {
  background: var(--color-border); /* Corrected typo */
}

@media (max-width: 480px) {
  .input-area {
    flex-direction: column;
  }
}
</style>
