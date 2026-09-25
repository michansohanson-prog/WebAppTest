<template>
  <div class="login-container">
    <!-- DEBUG HEADER: If you don't see this red text, the component isn't mounting -->
    <h1
      style="
        color: red;
        position: fixed;
        top: 0;
        width: 100%;
        text-align: center;
        z-index: 9999;
        background: black;
      "
    >
      DEBUG: LOGIN VIEW MOUNTED
    </h1>

    <div class="auth-card cyber-card">
      <header class="auth-header">
        <h1 class="glow-text flicker-text">SYSTEM_ACCESS</h1>
        <p class="subtitle glow-cyan">NEURAL LINK GATEWAY</p>
      </header>

      <div class="form-group">
        <label for="username" class="input-label">USER_ID</label>
        <input
          type="text"
          id="username"
          placeholder="Enter identification..."
          class="cyber-input"
        />
      </div>

      <div class="form-group">
        <label for="passcode" class="input-label">PASS_CODE</label>
        <input type="password" id="passcode" placeholder="••••••••" class="cyber-input" />
      </div>

      <button class="btn-primary cyber-button">INITIALIZE CONNECTION</button>

      <div class="auth-footer">
        <p class="glow-purple small-text">UNAUTHORIZED ACCESS IS LOGGED & PROHIBITED.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Navigation logic will be added here.
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #020308; /* Hardcoded fallback */
  background: var(--bg-void);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border: 1px solid var(--border-glow, #2a2f3e);
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(10px);
  box-shadow:
    var(--shadow-void, rgba(0, 0, 0, 0.5)),
    inset var(--glow-inner, rgba(255, 255, 255, 0.05));
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

.input-label {
  color: var(--text-mint, #d1e8d4);
  font-size: 0.8rem;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.cyber-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glow, #2a2f3e);
  padding: 12px;
  color: var(--text-mint, #d1e8d4);
  outline: none;
  transition: all 0.3s ease;
}

.cyber-input:focus {
  border-color: var(--glow-cyan, #00f3ff);
  background: rgba(255, 255, 255, 0.1);
}

.auth-footer {
  margin-top: 30px;
  text-align: center;
}

.small-text {
  font-size: 0.7rem;
  opacity: 0.6;
}

.btn-primary {
  width: 100%;
  padding: 15px;
  background: var(--neon-blue, #00f3ff);
  border: none;
  color: #000;
  font-weight: bold;
  cursor: pointer;
}

.btn-primary:hover {
  transform: scale(1.02);
}
</style>
