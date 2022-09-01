<template>
      <TaskForm />
      <!-- Task list -->
      <div class="list">
        <TaskBox v-if="withoutTasks">
          Você não está muito produtivo hoje :(
        </TaskBox>
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task"/>
      </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'
import TaskBox from '../components/TaskBox.vue'
import { useStore } from '@/store';

export default defineComponent({
    name: "TasksView",
    components: {
    TaskForm,
    TaskItem,
    TaskBox
  },
  computed: {
    withoutTasks(): boolean {
      return this.tasks.length === 0
    }
  },
  setup() {
    const store = useStore()
    return {
      tasks: computed(()=> store.state.tasks)
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
