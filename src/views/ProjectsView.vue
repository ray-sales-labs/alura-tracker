<template>
  <section class="projects">
    <h1 class="title">Projects</h1>
    <router-link to="/projects/new" class="button mb-20">
      <span class="icon is-small">
        <i class="fas fa-plus">

        </i>
      </span>
      <span>New Project</span>
    </router-link>
    <table class="table is-full-width">
      <thead>
        <tr>
          <th>
            id
          </th>
          <th>
            Name
          </th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>
            {{ project.id }}
          </td>
          <td>
            {{ project.name }}
          </td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt">

                </i>
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import {useStore} from '@/store'
  export default defineComponent({
    name: 'ProjectsView',
    setup() {
      const store = useStore()
      return {
        projects: computed(() => store.state.projects)
      }
    }
  })
</script>
<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>