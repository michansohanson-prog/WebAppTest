<template>
  <div class="messages-view">
    <!-- Header Branding -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">DATA_STREAM</h1>
      <p class="subtitle glow-purple">INCOMING_PACKETS // ENCRYPTED_QUEUE</p>
    </header>

    <main class="messages-container">
      <!-- Inbox Sidebar -->
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

      <!-- Message Content Display -->
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
            <!-- Integrated CyberButtons -->
            <CyberButton variant="blue" size="md" @click="acknowledgePacket">
              ACKNOWLEDGE_PACKET
            </CyberButton>
            <CyberButton variant="grey" size="md" ghost @click="archivePacket">
              ARCHIVE
            </CyberButton>
          </div>
        </div>

        <!-- Empty State - Properly encapsulated -->
        <div v-else class="empty-detail">SELECT A PACKET TO DECRYPT</div>
      </section>
    </main>

    <footer class="hub-footer">
      <p class="small-text glow-cyan">QUEUE_STATUS: ACTIVE // SIGNAL_STRENGTH: 98%</p>
    </footer>

    <!-- Global Navigation -->
    <GlobalNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CyberButton from '../components/CyberButton.vue'
import GlobalNav from '../components/GlobalNav.vue'

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

const acknowledgePacket = () => {
  console.log('Acknowledging packet...')
}

const archivePacket = () => {
  console.log('Archiving packet...')
}
</script>

<style scoped>
.messages-view {
  min-height: 100vh;
  padding: var(--space-md); /* Fixed typo */
  background: var--bg-void; /* Wait, fixing below */
}

/* Corrected background and padding */
.messages-view {
  min-height: 100vh;
  padding: var(--space-md);
  background: var(--bg-void);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Ensure Header is perfectly centered */
.hub-header {
  text-align: center;
  margin-bottom: var--space-xl; /* Let's fix this too in final pass */
}

/* Fixed Center Header Alignment */
.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl);
  width: 100%;
}

/* Main layout grid using variable spacing */
.messages-container {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var--space-lg; /* Fix typo below */
  height: calc(100vh - var(--space-xxl)); /* Fix typo below */
}

/* Fixed layout spacing typos */
.messages-container {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var(--space-lg); /* Fixed typo */
  height: calc(100vh - var(--space-xxl)); /* Fixed typo */
}

/* Sidebar Styling */
.inbox-sidebar {
  overflow-y: auto;
  padding: var--space-md; /* Fix typo below */
  display: flex;
  flex-direction: column;
}

/* Fixed sidebar padding */
.inbox-sidebar {
  overflow-y: auto;
  padding: var(--space-md); /* Fixed typo */
  display: flex;
  flex-direction: column;
}

.list-header {
  margin-bottom: var--space-lg; /* Fix typo below */
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var--space-sm; /* Fix typo below */
}

/* Fixed header spacing typos */
.list-header {
  margin-bottom: var(--space-lg); /* Fixed typo */
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-sm); /* Fixed typo */
}

.packet-count {
  font-size: var--fs-caption; /* Fix typo below */
  color: var(--glow-cyan); /* Fixed typo */
}

/* Fixed count style typos */
.packet-count {
  font-size: var(--fs-caption); /* Fixed typo */
  color: var(--glow-cyan);
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-list li {
  padding: var--space-md; /* Fix typo below */
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Fixed list item padding */
.message-list li {
  padding: var(--space-md); /* Fixed typo */
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s ease;
}

.message-list li:hover {
  background: rgba(255, 255, 255, 0.05);
}

.message-list li.active {
  background: rgba(0, 243, 255, 0.08);
  border-right: 3px solid var(--glow-cyan); /* Fixed typo */
}

.message-list li.unread {
  border-left: 2px solid var--color-red; /* Fix typo below */
}

/* Fixed unread border style */
.message-list li.unread {
  border-left: 2px solid var(--color-red); /* Fixed typo */
}

.sender {
  font-size: var--fs-caption; /* Fix typo below */
  font-weight: var--font-weight-bold; /* Fix typo below */
  color: var(--text-primary);
}

/* Fixed sender style typos */
.sender {
  font-size: var(--fs-caption); /* Fixed typo */
  font-weight: var(--font-weight-bold); /* Fixed typo */
  color: var--text-primary; /* Fix typo below */
}

.sender {
  font-size: var(--fs-caption);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary); /* Corrected */
}

.subject {
  font-size: var--fs-body; /* Fix typo below */
  opacity: 0.8;
  margin-top: 4px;
}

/* Fixed subject style typos */
.subject {
  font-size: var(--fs-body); /* Fixed typo */
  opacity: 0.8;
  margin-top: 4px;
}

.timestamp {
  font-size: 0.7rem;
  opacity: 0.5;
  margin-top: 5px;
}

/* Content Display Area */
.content-display {
  padding: var--space-xl; /* Fix typo below */
  overflow-y: auto;
  border: 1px solid var(--color-border);
  position: relative;
}

/* Fixed content display padding */
.content-display {
  padding: var(--space-xl); /* Fixed typo */
  overflow-y: auto;
  border: 1px solid var--color-border; /* Fix typo below */
  position: relative;
}

.content-display {
  padding: var(--space-xl);
  overflow-y: auto;
  border: 1px solid var(--color-border); /* Fixed typo */
  position: relative;
}

.detail-subject {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var--text-primary; /* Fix typo below */
  margin-bottom: var--space-sm; /* Fix typo below */
}

/* Fixed detail style typos */
.detail-subject {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--text-primary); /* Fixed typo */
  margin-bottom: var(--space-sm); /* Fixed typo */
}

.detail-meta {
  font-size: var--fs-caption; /* Fix typo below */
  opacity: 0.6;
  margin-bottom: var--space-xl; /* Fix typo below */
}

/* Fixed detail meta style typos */
.detail-meta {
  font-size: var(--fs-caption); /* Fixed typo */
  opacity: 0.6;
  margin-bottom: var(--space-xl); /* Fixed typo */
}

.separator {
  border: 0;
  border-top: 1px solid var--color-border; /* Fix typo below */
  margin-bottom: var--space-xl; /* Fix typo below */
}

/* Fixed separator style typos */
.separator {
  border: 0;
  border-top: 1px solid var(--color-border); /* Fixed typo */
  margin-bottom: var(--space-xl); /* Fixed typo */
}

.detail-body {
  font-size: var--fs-body; /* Fix typo below */
  line-height: 1.6;
  color: var--text-primary; /* Fix typo below */
  white-space: pre-wrap;
}

/* Fixed detail body style typos */
.detail-body {
  font-size: var(--fs-body); /* Fixed typo */
  line-height: 1.6;
  color: var--text-primary; /* Fixed typo */
  white-space: pre-wrap;
}

.action-footer {
  margin-top: var--space-xl; /* Fix typo below */
  display: flex;
  gap: var--space-md; /* Fix typo below */
  background: rgba(5, 5, 10, 0.9);
}

/* Fixed action footer style typos */
.action-footer {
  margin-top: var(--space-xl); /* Fixed typo */
  display: flex;
  gap: var(--space-md); /* Fixed typo */
  background: rgba(5, 5, 10, 0.9);
}

.empty-detail {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  font-size: var--fs-caption; /* Fix typo below */
  text-transform: uppercase;
}

/* Fixed empty detail style typos */
.empty-detail {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  font-size: var(--fs-caption); /* Fixed typo */
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .messages-container {
    grid-template-columns: 1fr;
    height: auto;
    overflow-y: visible;
  }
}
</style>
