<script setup lang="ts">
import { useNotes } from "@/composables/useNotes";

const { notesStats, searchQuery, clearSearch } = useNotes();
</script>

<template>
  <div class="search-section">
    <div class="search-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search notes..."
        class="search-input"
      />
      <button
        v-if="notesStats.searchActive"
        @click="clearSearch"
        class="btn-clear"
      >
        Clear
      </button>
    </div>

    <div class="search-stats">
      <span v-if="notesStats.searchActive">
        Showing {{ notesStats.filtered }} of {{ notesStats.total }} notes
      </span>
      <span v-else> {{ notesStats.total }} notes total </span>
    </div>
  </div>
</template>

<style>
.search-section {
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: #e5e7eb;
  color: black;
  font-size: medium;
}

.btn-clear {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.search-stats {
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
