<template>
  <TaskForm />
  <!-- Task list -->
  <div class="list">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filter">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TaskBox v-if="withoutTasks">
      Você não está muito produtivo hoje :(
    </TaskBox>
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @select-task="selectTask"/>
    <ModalCard :show="taskSelected != null">
      <template v-slot:modalHeader>
        <p class="modal-card-title">Editar Tarefa</p>
        <button class="delete" @click="closeModal" aria-label="close"></button>
      </template>
      <template v-slot:modalBody>
        <div class="field">
          <label for="taskDescription" class="label">
            Descrição
          </label>
          <input type="text" class="input" v-model="taskSelected.description" id="taskDescription">
        </div>
      </template>
      <template v-slot:modalFooter>
        <button class="button is-success" @click="updateTask">Salvar</button>
        <button class="button" @click="closeModal">Cancel</button>
      </template>
    </ModalCard>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import TaskForm from '../components/TaskForm.vue'
import TaskItem from '../components/TaskItem.vue'
import TaskBox from '../components/TaskBox.vue'
import ModalCard from '../components/ModalCard.vue'
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, EDIT_TASK } from '@/store/actions_type';
import ITaskItem from '@/interfaces/ITaskItem';

export default defineComponent({
    name: "TasksView",
    components: {
    TaskForm,
    TaskItem,
    TaskBox,
    ModalCard
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
  setup() {
    const store = useStore()
    const filter = ref('')
    const tasks = computed(() => store.state.task.tasks)

    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)

    watchEffect(() => {
      store.dispatch(GET_TASKS, filter.value)
    })

    const withoutTasks = (): boolean => {
      return tasks.value.length === 0
    }

    return {
      store,
      filter,
      tasks,
      withoutTasks
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
