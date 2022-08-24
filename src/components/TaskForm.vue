<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="formulário para criação de uma nova tarefa">
        <input 
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="description"
          >
      </div>
      <div class="column">
        <TaskTimer @finished="finishTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import TaskTimer from './TaskTimer.vue'

  export default defineComponent({
    name: 'TaskForm',
    emits: ['OnSaveTask'],
    components: {
      TaskTimer
    },
    data () {
      return {
        description: ''
      }
    },
    methods: {
      finishTask(elapsedTime: number) : void {
        this.$emit('OnSaveTask', {
          secondsDuration: elapsedTime,
          description: this.description
        })
        this.description = ''
      }
    },
  })
</script>

<style>
  .form {
    color: var(--text-primary);
    background-color: var(--bg-primary);
  }
</style>