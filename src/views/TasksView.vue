<template>
      <TaskForm />
      <!-- Task list -->
      <div class="list">
        <TaskBox v-if="withoutTasks">
          Você não está muito produtivo hoje :(
        </TaskBox>
        <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @select-task="selectTask"/>
        <div class="modal" :class="{'is-active': taskSelected}" v-if="taskSelected">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Editar Tarefa</p>
              <button class="delete" @click="closeModal" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label for="taskDescription" class="label">
                  Descrição
                </label>
                <input type="text" class="input" v-model="taskSelected.description" id="taskDescription">
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" @click="updateTask">Salvar</button>
              <button class="button" @click="closeModal">Cancel</button>
            </footer>
          </div>
        </div>
      </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'
import TaskBox from '../components/TaskBox.vue'
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, EDIT_TASK } from '@/store/actions_type';
import ITaskItem from '@/interfaces/ITaskItem';

export default defineComponent({
    name: "TasksView",
    components: {
    TaskForm,
    TaskItem,
    TaskBox,
},
  data() {
    return {
      taskSelected: null as ITaskItem | null
    }
  },
  methods: {
    selectTask(task: ITaskItem) {
      this.taskSelected = task
    },
    closeModal() {
      this.taskSelected = null
    },
    updateTask() {
      this.store.dispatch(EDIT_TASK, this.taskSelected)
        .then(() => this.closeModal())
    }
  },
  computed: {
    withoutTasks(): boolean {
      return this.tasks.length === 0
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)
    return {
      store,
      tasks: computed(()=> store.state.task.tasks)
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
