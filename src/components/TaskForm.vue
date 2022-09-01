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
import { ADD_NOTIFICATION, ADD_TASK } from '@/store/mutations_type'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import TaskTimer from './TaskTimer.vue'
import { NotificationType } from '@/interfaces/INotification'

  export default defineComponent({
    name: 'TaskForm',
    components: {
      TaskTimer
    },
    data () {
      return {
        description: '',
        projectID: '',
      }
    },
    methods: {
      finishTask(elapsedTime: number) : void {
        const project = this.projects.find(project => project.id == this.projectID)
        
        if(!project) {
          this.store.commit(ADD_NOTIFICATION, {
            title: 'Erro ao finalizar tarefa',
            text: 'A tarefa atual não possui um projeto vinculado.',
            type: NotificationType.DANGER
          })
          return
        }
          this.store.commit(ADD_TASK, {
            secondsDuration: elapsedTime,
            description: this.description,
            project: project
          })
  
          this.description = ''
      }
    },
    setup() {
      const store = useStore(key)
      return {
        store,
        projects: computed(() => store.state.projects)
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