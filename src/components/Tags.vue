<script setup lang="ts">
import { useNotes } from "@/composables/useNotes";

const { clearTagFilters, toggleTagFilter, selectedTags, allTags } = useNotes();
</script>

<template>
  <div
    class="tags-section"
    v-if="allTags.length > 0"
  >
    <h3>Filter by Tags:</h3>
    <div class="tag-filters">
      <button
        v-for="tag in allTags"
        :key="tag"
        @click="toggleTagFilter(tag)"
        :class="['tag-filter', { active: selectedTags.includes(tag) }]"
      >
        #{{ tag }}
      </button>
      <button
        v-if="selectedTags.length > 0"
        @click="clearTagFilters"
        class="btn-clear-tags"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.tags-section {
  margin-bottom: 1.5rem;
}

.tags-section h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #374151;
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-filter {
  background-color: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.tag-filter:hover {
  background-color: #e5e7eb;
}

.tag-filter.active {
  background-color: #6366f1;
  color: white;
  border-color: #6366f1;
}

.btn-clear-tags {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
}
</style>
