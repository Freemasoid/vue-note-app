<script setup lang="ts">
import { useNotes } from "@/composables/useNotes";

const {
  isEditing,
  editingId,
  noteForm,
  newTag,
  handleSave,
  cancelEdit,
  addTagToNote,
  removeTagFromNote,
} = useNotes();
</script>

<template>
  <div
    v-if="isEditing"
    class="modal-overlay"
  >
    <div class="modal">
      <h3>{{ editingId ? "Edit Note" : "Create Note" }}</h3>

      <input
        v-model="noteForm.title"
        type="text"
        placeholder="Note title..."
        class="form-input"
      />

      <textarea
        v-model="noteForm.content"
        placeholder="Write your note..."
        rows="6"
        class="form-textarea"
      ></textarea>

      <div class="tag-management">
        <label>Tags:</label>
        <div class="tag-input-section">
          <input
            v-model="newTag"
            @keyup.enter="addTagToNote"
            type="text"
            placeholder="Add a tag..."
            class="tag-input"
          />
          <button
            @click="addTagToNote"
            class="btn-add-tag"
          >
            Add
          </button>
        </div>

        <div
          class="current-tags"
          v-if="noteForm.tags.length > 0"
        >
          <span
            v-for="tag in noteForm.tags"
            :key="tag"
            class="tag-chip"
          >
            #{{ tag }}
            <button
              @click="removeTagFromNote(tag)"
              class="tag-remove"
            >
              ×
            </button>
          </span>
        </div>
      </div>

      <div class="modal-actions">
        <button
          @click="handleSave"
          class="btn-primary"
        >
          Save
        </button>
        <button
          @click="cancelEdit"
          class="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal h3 {
  margin-top: 0;
  color: #4f46e5;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  font-family: inherit;
  background-color: #e5e7eb;
  color: black;
  font-size: medium;
}

.form-textarea {
  resize: vertical;
}

.modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
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

.btn-secondary {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.tag-management {
  margin-bottom: 1rem;
}

.tag-management label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.tag-input-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
}

.btn-add-tag {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
}

.current-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-chip {
  background-color: #ede9fe;
  color: #7c3aed;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tag-remove {
  background: none;
  border: none;
  color: #7c3aed;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
  line-height: 1;
}
</style>
