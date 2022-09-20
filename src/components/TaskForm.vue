<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="formulário para criação de uma nova tarefa">
        <input 
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
          >
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="projectID">
            <option value="">Selecione o projeto</option>
            <option :value="project.id" v-for="project in projects" :key="project.id">
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TaskTimer @finished="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from '@/store'
import { ADD_NOTIFICATION } from '@/store/mutations_type'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TaskTimer from './TaskTimer.vue'
import { NotificationType } from '@/interfaces/INotification'
import { ADD_TASK } from '@/store/actions_type'

  export default defineComponent({
    name: 'TaskForm',
    components: {
      TaskTimer
    },

    setup() {
      const store = useStore(key)
      const description = ref('')
      const projectID = ref('')
      const projects = computed(() => store.state.project.projects)

      const finishTask = (elapsedTime: number) : void => {
        
        if(!projectID.value) {
          store.commit(ADD_NOTIFICATION, {
            title: 'Erro ao finalizar tarefa',
            text: 'A tarefa atual não possui um projeto vinculado.',
            type: NotificationType.DANGER
          })
          return
        }
        const project = projects.value.find(project => project.id == projectID.value)

          store.dispatch(ADD_TASK, {
            secondsDuration: elapsedTime,
            description: description,
            project: project
          }).then(() => {
            store.commit(ADD_NOTIFICATION, {
              title: 'Sucesso!',
              text: 'Sua tarefa foi registrada',
              type: NotificationType.SUCCESS
            })
            description.value = ''
          })
  
      }
      
      return {
        projectID,
        description,
        projects,
        finishTask
      }
    }
  })
</script>

<style>
  .form {
    color: var(--text-primary);
    background-color: var(--bg-primary);
  }
</style>