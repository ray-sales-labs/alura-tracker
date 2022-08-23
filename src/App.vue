<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarters">
      <TaskForm @OnSaveTask="saveTask" />
      <!-- Task list -->
      <div class="list">
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import TaskForm from './components/TaskForm.vue';
import TaskItem from './components/TaskItem.vue'
import ITaskItem from './interfaces/ITaskItem'

export default defineComponent({
    name: "App",
    components: {
    SideBar,
    TaskForm,
    TaskItem
  },
  data() {
    return {
      tasks: [] as ITaskItem[]
    }
  },
  methods: {
    saveTask(task: ITaskItem): void {
      this.tasks.push(task)
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
