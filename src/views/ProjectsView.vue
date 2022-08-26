<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <form @submit.prevent="save">
      <div class="field">
        <label for="projectName" class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="projectName" id="nameProject">
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ProjectsView'
  })
</script>