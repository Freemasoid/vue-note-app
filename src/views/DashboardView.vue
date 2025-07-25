<script setup lang="ts">
import { useNotes } from "@/composables/useNotes";

const { dashboardStats, notes } = useNotes();
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h2>Dashboard</h2>
      <p class="subtitle">Overview of your notes</p>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-content">
          <h3>{{ dashboardStats.totalNotes }}</h3>
          <p>Total Notes</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">🏷️</div>
        <div class="stat-content">
          <h3>{{ dashboardStats.totalTags }}</h3>
          <p>Unique Tags</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📅</div>
        <div class="stat-content">
          <h3>{{ dashboardStats.recentNotes }}</h3>
          <p>Notes This Week</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>{{ dashboardStats.avgContentLength }}</h3>
          <p>Avg. Content Length</p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section">
      <!-- Most Used Tags -->
      <div class="chart-card">
        <h3>Most Used Tags</h3>
        <div class="tag-chart">
          <div
            v-for="[tag, count] in dashboardStats.mostUsedTags"
            :key="tag"
            class="tag-bar-item"
          >
            <span class="tag-name">#{{ tag }}</span>
            <div class="tag-bar-container">
              <div
                class="tag-bar"
                :style="{
                  width: `${
                    (count / dashboardStats.mostUsedTags[0]?.[1] || 1) * 100
                  }%`,
                }"
              ></div>
              <span class="tag-count">{{ count }}</span>
            </div>
          </div>
          <div
            v-if="dashboardStats.mostUsedTags.length === 0"
            class="no-data"
          >
            No tags yet
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="chart-card">
        <h3>Recent Notes</h3>
        <div class="recent-notes">
          <div
            v-for="note in notes.slice(0, 5)"
            :key="note.id"
            class="recent-note-item"
          >
            <div class="recent-note-content">
              <h4>{{ note.title }}</h4>
              <p>
                {{ note.content.substring(0, 100)
                }}{{ note.content.length > 100 ? "..." : "" }}
              </p>
              <small>{{ note.createdAt.toLocaleDateString() }}</small>
            </div>
            <div class="recent-note-tags">
              <span
                v-for="tag in note.tags.slice(0, 3)"
                :key="tag"
                class="mini-tag"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
          <div
            v-if="notes.length === 0"
            class="no-data"
          >
            No notes yet
          </div>
        </div>
      </div>
    </div>

    <!-- Summary Cards -->
    <div
      class="summary-section"
      v-if="dashboardStats.oldestNote && dashboardStats.newestNote"
    >
      <div class="summary-card">
        <h3>📅 First Note</h3>
        <p>
          <strong>{{ dashboardStats.oldestNote.title }}</strong>
        </p>
        <small
          >Created
          {{ dashboardStats.oldestNote.createdAt.toLocaleDateString() }}</small
        >
      </div>

      <div class="summary-card">
        <h3>✨ Latest Note</h3>
        <p>
          <strong>{{ dashboardStats.newestNote.title }}</strong>
        </p>
        <small
          >Created
          {{ dashboardStats.newestNote.createdAt.toLocaleDateString() }}</small
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h2 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.subtitle {
  color: #6b7280;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
  background: #f3f4f6;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content h3 {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
}

.stat-content p {
  margin: 0.25rem 0 0 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.chart-card h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.tag-chart {
  space-y: 0.75rem;
}

.tag-bar-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.tag-name {
  min-width: 80px;
  font-size: 0.875rem;
  color: #374151;
}

.tag-bar-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tag-bar {
  height: 8px;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  border-radius: 4px;
  min-width: 4px;
}

.tag-count {
  font-size: 0.75rem;
  color: #6b7280;
  min-width: 20px;
}

.recent-notes {
  space-y: 1rem;
}

.recent-note-item {
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.recent-note-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.recent-note-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  color: #1f2937;
}

.recent-note-content p {
  margin: 0 0 0.25rem 0;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.4;
}

.recent-note-content small {
  color: #9ca3af;
  font-size: 0.75rem;
}

.recent-note-tags {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.mini-tag {
  background: #f0f9ff;
  color: #0369a1;
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.5rem;
}

.summary-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.summary-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.summary-card h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1rem;
}

.summary-card p {
  margin: 0 0 0.5rem 0;
  color: #374151;
}

.summary-card small {
  color: #6b7280;
}

.no-data {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 2rem 0;
}

@media (max-width: 768px) {
  .charts-section {
    grid-template-columns: 1fr;
  }

  .summary-section {
    grid-template-columns: 1fr;
  }
}
</style>
