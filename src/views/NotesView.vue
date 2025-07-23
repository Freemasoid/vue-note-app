<script setup lang="ts">
import { ref } from "vue";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

const notes = ref<Note[]>([
  {
    id: 1,
    title: "First Note",
    content: "this is my first note",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Vue Learning",
    content: "Learning Vue.js concepts",
    createdAt: new Date(),
  },
]);

const isEditing = ref(false);
const editingId = ref<number | null>(null);
const noteForm = ref({
  title: "",
  content: "",
});

const handleCreate = () => {
  isEditing.value = true;
  editingId.value = null;
  noteForm.value = { title: "", content: "" };
};

const handleEdit = (note: Note) => {
  isEditing.value = true;
  editingId.value = note.id;
  noteForm.value = { title: note.title, content: note.content };
};

const handleDelete = (id: number) => {
  notes.value = notes.value.filter((note) => note.id !== id);
};

const cancelEdit = () => {
  isEditing.value = false;
  editingId.value = null;
  noteForm.value = { title: "", content: "" };
};

const handleSave = () => {
  if (!noteForm.value.title.trim()) return;

  if (editingId.value) {
    const index = notes.value.findIndex((n) => n.id === editingId.value);
    if (index !== -1) {
      notes.value[index] = {
        ...notes.value[index],
        title: noteForm.value.title,
        content: noteForm.value.content,
      };
    }
  } else {
    const newNote: Note = {
      id: Date.now(),
      title: noteForm.value.title,
      content: noteForm.value.content,
      createdAt: new Date(),
    };
    notes.value.push(newNote);
  }

  cancelEdit();
};
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

    <div class="notes-grid">
      <div
        v-for="note in notes"
        :key="note.id"
        class="note-card"
      >
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
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

.btn-secondary {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
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
</style>
