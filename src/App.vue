<script setup lang="ts"></script>

<template>
  <div id="app">
    <header class="app-header">
      <h1>VueNotes</h1>
      <nav>
        <router-link
          to="/"
          class="nav-link"
          >Notes</router-link
        >
        <router-link
          to="/dashboard"
          class="nav-link"
          >Dashboard</router-link
        >
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
}

.nav-link {
  text-decoration: none;
  color: #6366f1;
}

.nav-link:hover {
  color: #4f46e5;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>
