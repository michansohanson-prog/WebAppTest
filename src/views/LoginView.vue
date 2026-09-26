<template>
  <div class="login-page">
    <!-- Header Branding -->
    <header class="hub-header">
      <h1 class="glow-green flicker-text">ACCESS_POINT</h1>
      <p class="subtitle glow-cyan">ENTER CREDENTIALS TO INITIALIZE SESSION</p>
    </header>

    <main class="hub-container">
      <CyberTile
        title="AUTHENTICATION"
        subtitle="SECURE NODE ACCESS"
        variant="blue"
        layout="center"
        class="login-tile"
      >
        <!-- Form is now inside the content slot to prevent layout collapse -->
        <form @submit.prevent="handleLogin" class="login-form">
          <CyberInput
            v-model="credentials.username"
            label="USER_ID"
            placeholder="Enter Username"
            type="text"
            :error="errors.username"
          />

          <CyberInput
            v-model="credentials.password"
            label="PASS_KEY"
            placeholder="••••••••"
            type="password"
            :error="errors.password"
          />

          <div class="button-row">
            <CyberButton type="submit" variant="blue" size="lg"> AUTHORIZE </CyberButton>
            <CyberButton type="button" variant="grey" size="lg" @click="cancel">
              CANCEL
            </CyberButton>
          </div>
        </form>
      </CyberTile>
    </main>

    <footer class="hub-footer">
      <p class="small-text glow-cyan">&copy; 2026 SECURITY_PROTOCOL // ENCRYPTED_CONNECTION</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CyberTile from '../components/CyberTile.vue'
import CyberButton from '../components/CyberButton.vue'
import CyberInput from '../components/CyberInput.vue'

const router = useRouter()

// State Management for Authentication
const credentials = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: '',
  password: '',
})

/**
 * Handles the Login Logic
 * Validates against ADMIN / 1234
 */
const handleLogin = () => {
  errors.value.username = ''
  errors.value.password = ''

  const { username, password } = credentials.value

  if (!username || !password) {
    errors.value.username = 'REQUIRED_FIELD'
    return
  }

  if (username === 'ADMIN' && password === '1234') {
    console.log('Authorization successful. Initializing session...')
    router.push('/hub')
  } else {
    errors.value.username = 'INVALID_CREDENTIALS'
    errors.value.password = 'INVALID_CREDENTIALS'
    console.error('Unauthorized access attempt.')
  }
}

const cancel = () => {
  console.log('Session aborted.')
  credentials.value = { username: '', password: '' }
  errors.value = { username: '', password: '' }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: var(--space-md); /* Fixed typo */
  background: var(--bg-void);
}

/* Ensure branding is perfectly centered across all views */
.hub-header {
  text-align: center;
  margin-bottom: var(--space-xl); /* Fixed typo */
  width: 100%;
}

/* Container for the login tile to keep it dead-center in the viewport */
.hub-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Ensure the tile has enough internal space for inputs and buttons */
.login-tile {
  padding: var(--space-xl) !important; /* Fixed typo */
}

/* Use :deep() to ensure these styles reach inside CyberTile content slot */
:deep(.login-form) {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxl); /* Fixed typo */
  width: 100%;
}

/* Button Grouping - Centered and spaced */
.button-row {
  display: flex;
  gap: var(--space-md); /* Fixed typo */
  margin-top: var(--space-sm); /* Fixed typo */
  justify-content: center;
}

@media (max-width: 480px) {
  .button-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
