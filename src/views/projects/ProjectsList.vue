<template>
  <section class="projects">
    <router-link to="/projects/new" class="button mb-5">
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
            <button class="button ml-2 is-danger" @click="deleteItem(project.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import {useStore} from '@/store'
  import { DELETE_PROJECT } from '@/store/mutations_type'
  
  export default defineComponent({
    name: 'ProjectsList',
    methods: {
      deleteItem(id: string) {
        this.store.commit(DELETE_PROJECT, id)
      }
    },
    setup() {
      const store = useStore()
      return {
        store,
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