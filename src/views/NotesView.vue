<script setup lang="ts">
import { useNotes } from "@/composables/useNotes";
import { Tags, Search, CreateEditModal, NoteCard } from "@/components";

const { handleCreate, filteredNotes } = useNotes();
</script>

<template>
  <div>
    <div class="notes-header">
      <h2>My Notes</h2>
      <button
        @click="handleCreate"
        class="btn-primary"
      >
        Add Note
      </button>
    </div>

    <Tags />
    <Search />
    <CreateEditModal />

    <div class="notes-grid">
      <NoteCard
        v-for="note in filteredNotes"
        :key="note.id"
        :note="note"
      />
    </div>

    <div
      v-if="filteredNotes.length === 0"
      class="empty-state"
    >
      <p>No notes found</p>
    </div>
  </div>
</template>

<style scoped>
.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #4f46e5;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}
</style>
