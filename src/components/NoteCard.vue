<script setup lang="ts">
import { useNotes } from "@/composables/useNotes";

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

defineProps<{
  note: Note;
}>();

const { handleEdit, handleDelete } = useNotes();
</script>

<template>
  <div class="note-card">
    <h3>{{ note.title }}</h3>
    <p>{{ note.content }}</p>

    <div
      class="note-tags"
      v-if="note.tags.length > 0"
    >
      <span
        v-for="tag in note.tags"
        :key="tag"
        class="note-tag"
      >
        #{{ tag }}
      </span>
    </div>

    <small>{{ note.createdAt.toLocaleDateString() }}</small>
    <div class="note-actions">
      <button
        @click="handleEdit(note)"
        class="btn-edit"
      >
        Edit
      </button>
      <button
        @click="handleDelete(note.id)"
        class="btn-delete"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<style>
.note-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: white;
}

.note-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.note-card p {
  margin: 0 0 1rem 0;
  color: #6b7280;
}

.note-card small {
  color: #9ca3af;
}

.note-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-edit,
.btn-delete {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-edit {
  background-color: #10b981;
  color: white;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 0.5rem 0;
}

.note-tag {
  background-color: #f0f9ff;
  color: #0369a1;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.75rem;
}
</style>
