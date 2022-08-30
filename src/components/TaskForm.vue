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
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
  import TaskTimer from './TaskTimer.vue'

  export default defineComponent({
    name: 'TaskForm',
    emits: ['OnSaveTask'],
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
        this.$emit('OnSaveTask', {
          secondsDuration: elapsedTime,
          description: this.description,
          project: this.projects.find(project => project.id == this.projectID)
        })
        this.description = ''
      }
    },
    setup() {
      const store = useStore(key)
      return {
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