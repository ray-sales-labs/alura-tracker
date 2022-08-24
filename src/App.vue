<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @changeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarters content">
      <TaskForm @OnSaveTask="saveTask" />
      <!-- Task list -->
      <div class="list">
        <TaskBox v-if="withoutTasks">
          Você não está muito produtivo hoje :(
        </TaskBox>
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import TaskBox from './components/TaskBox.vue'
import ITaskItem from './interfaces/ITaskItem'

export default defineComponent({
    name: "App",
    components: {
    SideBar,
    TaskForm,
    TaskItem,
    TaskBox
  },
  data() {
    return {
      tasks: [] as ITaskItem[],
      darkModeActive: false
    }
  },
  computed: {
    withoutTasks(): boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTask(task: ITaskItem): void {
      this.tasks.push(task)
    },
    changeTheme(active: boolean): void {
      this.darkModeActive = active
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
