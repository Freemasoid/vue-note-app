import { ref } from "vue";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export const useNotes = () => {
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

  return {
    // State
    notes,
    isEditing,
    editingId,
    noteForm,
    // Actions
    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
    cancelEdit,
  };
};
