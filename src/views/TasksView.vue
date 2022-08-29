<template>
      <TaskForm @OnSaveTask="saveTask" />
      <!-- Task list -->
      <div class="list">
        <TaskBox v-if="withoutTasks">
          Você não está muito produtivo hoje :(
        </TaskBox>
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
      </div>
>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'
import TaskBox from '../components/TaskBox.vue'
import ITaskItem from '../interfaces/ITaskItem'

export default defineComponent({
    name: "TasksView",
    components: {
    TaskForm,
    TaskItem,
    TaskBox
  },
  data() {
    return {
      tasks: [] as ITaskItem[],
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
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
