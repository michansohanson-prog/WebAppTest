<template>
  <div class="messages-view">
    <!-- HEADER -->
    <header class="data-header">
      <h1 class="glow-text flicker-text">DATA_STREAM</h1>
      <p class="subtitle glow-purple">INCOMING_PACKETS // ENCRYPTED_QUEUE</p>
    </header>

    <main class="messages-container">
      <!-- INBOX LIST -->
      <aside class="inbox-sidebar cyber-card">
        <div class="list-header">
          <h2 class="list-title">INBOX</h2>
          <span class="packet-count">{{ unreadCount }} UNREAD</span>
        </div>

        <ul class="message-list">
          <li
            v-for="(msg, index) in messages"
            :key="index"
            :class="{ active: selectedIndex === index, unread: !msg.read }"
            @click="selectedIndex = index"
          >
            <div class="sender">{{ msg.sender }}</div>
            <div class="subject">{{ msg.subject }}</div>
            <div class="timestamp">{{ msg.time }}</div>
          </li>
        </ul>
      </aside>

      <!-- CONTENT AREA -->
      <section class="content-display cyber-card">
        <div v-if="selectedIndex !== null && messages[selectedIndex]" class="message-detail">
          <h2 class="detail-subject">{{ messages[selectedIndex].subject }}</h2>
          <p class="detail-meta">
            From: {{ messages[selectedIndex].sender }} | Date: {{ messages[selectedIndex].time }}
          </p>
          <hr class="separator" />
          <div class="detail-body">
            {{ messages[selectedIndex].body }}
          </div>
          <div class="action-footer">
            <button class="btn-primary cyber-button">ACKNOWLEDGE_PACKET</button>
            <button class="btn-ghost cyber-button">ARCHIVE</button>
          </div>
        </div>
        <div v-else class="empty-detail">SELECT A PACKET TO DECRYPT</div>
      </section>
    </main>

    <footer class="messages-footer">
      <p class="small-text glow-cyan">QUEUE_STATUS: ACTIVE // SIGNAL_STRENGTH: 98%</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedIndex = ref(null)

const messages = ref([
  {
    sender: 'SYSTEM_CORE',
    subject: 'PROTOCOL UPDATE v.1.0.8',
    time: '2026-09-24 14:22',
    body: 'Standard encryption protocols have been updated to mitigate neural leakage in high-bandwidth streams. Please verify your local hardware node for compatibility.',
    read: true,
  },
  {
    sender: 'USER_DELTA',
    subject: 'Private Packet - Urgent',
    time: '2026-09-24 13:45',
    body: "I've secured the data fragments from the Archive Net. They are ready for integration into our local storage node. Let me know when you want to initiate the merge.",
    read: false,
  },
  {
    sender: 'NEURAL_LINK_AUTH',
    subject: 'Security Alert: Gateway Ping',
    time: '2026-09-24 12:10',
    body: 'Multiple login attempts detected from external node 192.x.x.x. No unauthorized access was successful, but we recommend a session refresh.',
    read: true,
  },
])

const unreadCount = computed(() => {
  return messages.value.filter((m) => !m.read).length
})
</script>

<style scoped>
.messages-view {
  min-height: 100vh;
  padding: 40px 20px;
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.data-header {
  text-align: center;
  margin-bottom: 30px;
}

.messages-container {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  height: 70vh;
}

/* Sidebar List */
.inbox-sidebar {
  overflow-y: auto;
  padding: 20px;
  border: 1px solid var(--border-glow);
  display: flex;
  flex-direction: column;
}

.list-header {
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-glow);
  padding-bottom: 10px;
}

.packet-count {
  font-size: 0.7rem;
  color: var(--glow-cyan);
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-list li {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.3s ease;
}

.message-list li:hover {
  background: rgba(255, 255, 255, 0.05);
}

.message-list li.active {
  background: rgba(0, 255, 255, 0.1);
  border-right: 3px solid var(--glow-cyan);
}

.message-list li.unread {
  border-left: 2px solid var(--glow-red);
}

.sender {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--text-mint);
}

.subject {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-top: 4px;
}

.timestamp {
  font-size: 0.7rem;
  opacity: 0.5;
  margin-top: 5px;
}

/* Content Display */
.content-display {
  padding: 40px;
  overflow-y: auto;
  border: 1px solid var(--border-glow);
  position: relative;
}

.detail-subject {
  font-size: 1.8rem;
  color: var(--text-mint);
  margin-bottom: 5px;
}

.detail-meta {
  font-size: 0.8rem;
  opacity: 0.6;
  margin-bottom: 30px;
}

.separator {
  border: 0;
  border-top: 1px solid var(--border-glow);
  margin-bottom: 30px;
}

.detail-body {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-mint);
  white-space: pre-wrap;
}

.action-footer {
  margin-top: 40px;
  display: flex;
  gap: 20px;
}

.btn-ghost {
  background: transparent;
  border: none;
  color: var(--text-mint);
  text-decoration: underline;
  cursor: pointer;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
}

@media (max-width: 768px) {
  .messages-container {
    grid-template-columns: 1fr;
    height: auto;
    overflow-y: visible;
  }
  .inbox-sidebar {
    margin-bottom: 20px;
  }
}

/* Reusing established classes */
.cyber-card {
  padding: 20px;
  border: 1px solid var(--border-glow);
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(5px);
}

.btn-primary.cyber-button {
  padding: 12px 24px;
  background: var(--glow-cyan);
  color: black;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
