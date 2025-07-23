import { computed, ref, watch } from "vue";

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
}

export const useNotes = () => {
  const notes = ref<Note[]>([
    {
      id: 1,
      title: "First Note",
      content: "this is my first note",
      tags: ["personal", "ideas"],
      createdAt: new Date(),
    },
    {
      id: 2,
      title: "Vue Learning",
      content: "Learning Vue.js concepts",
      tags: ["learning", "vue", "frontend"],
      createdAt: new Date(),
    },
  ]);

  const isEditing = ref(false);
  const editingId = ref<number | null>(null);
  const noteForm = ref({
    title: "",
    content: "",
    tags: [] as string[],
  });
  const searchQuery = ref("");
  const selectedTags = ref<string[]>([]);
  const newTag = ref("");

  const allTags = computed(() => {
    const tagSet = new Set<string>();
    notes.value.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  });

  const filteredNotes = computed(() => {
    let result = notes.value;

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query) ||
          note.tags.some((tag) => tag.toLowerCase().includes(query))
      );

      if (selectedTags.value.length > 0) {
        result = result.filter((note) =>
          selectedTags.value.every((tag) => note.tags.includes(tag))
        );
      }
    }

    return result;
  });

  watch(
    notes,
    (newNotes) => {
      localStorage.setItem("vue-notes", JSON.stringify(newNotes));
    },
    { deep: true }
  );

  const notesStats = computed(() => ({
    total: notes.value.length,
    filtered: filteredNotes.value.length,
    searchActive: searchQuery.value.trim().length > 0,
  }));

  const clearSearch = () => {
    searchQuery.value = "";
  };

  const handleCreate = () => {
    isEditing.value = true;
    editingId.value = null;
    noteForm.value = { title: "", content: "", tags: [] };
  };

  const handleEdit = (note: Note) => {
    isEditing.value = true;
    editingId.value = note.id;
    noteForm.value = {
      title: note.title,
      content: note.content,
      tags: [...note.tags],
    };
  };

  const handleDelete = (id: number) => {
    notes.value = notes.value.filter((note) => note.id !== id);
  };

  const cancelEdit = () => {
    isEditing.value = false;
    editingId.value = null;
    noteForm.value = { title: "", content: "", tags: [] };
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
          tags: noteForm.value.tags,
        };
      }
    } else {
      const newNote: Note = {
        id: Date.now(),
        title: noteForm.value.title,
        content: noteForm.value.content,
        tags: noteForm.value.tags,
        createdAt: new Date(),
      };
      notes.value.push(newNote);
    }

    cancelEdit();
  };

  const addTagToNote = () => {
    const tag = newTag.value.trim().toLowerCase();
    if (tag && !noteForm.value.tags.includes(tag)) {
      noteForm.value.tags.push(tag);
      newTag.value = "";
    }
  };

  const removeTagFromNote = (tag: string) => {
    noteForm.value.tags = noteForm.value.tags.filter((t) => t !== tag);
  };

  const toggleTagFilter = (tag: string) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) {
      selectedTags.value.splice(index, 1);
    } else {
      selectedTags.value.push(tag);
    }
  };

  const clearTagFilters = () => {
    selectedTags.value = [];
  };

  return {
    notes,
    isEditing,
    editingId,
    noteForm,
    searchQuery,
    filteredNotes,
    notesStats,
    handleCreate,
    handleEdit,
    handleSave,
    handleDelete,
    cancelEdit,
    clearSearch,
    allTags,
    selectedTags,
    newTag,
    addTagToNote,
    removeTagFromNote,
    toggleTagFilter,
    clearTagFilters,
  };
};
