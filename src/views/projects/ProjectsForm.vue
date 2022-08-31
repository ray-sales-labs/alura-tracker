<template>
  <section>
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
  import { computed, defineComponent } from 'vue'
  import {useStore} from '@/store'
import { ADD_PROJECT, EDIT_PROJECT } from '@/store/mutations_type'
  export default defineComponent({
    name: 'ProjectsForm',
    props: {
      id: {
        type: String
      }
    },
    data(){
      return {
        projectName: '',
      }
    },
    mounted() {
      if(this.id) {
        const project = this.store.state.projects.find(project => project.id == this.id)
        this.projectName = project?.name || ''
      }
    },
    methods: {
      save() {
        if(this.id) {
          this.store.commit(EDIT_PROJECT, {
            id: this.id,
            name: this.projectName
          })
        } else {
          this.store.commit(ADD_PROJECT, this.projectName)
        }

        this.projectName = ''
        this.$router.push('/projects')
      }
    },
    setup() {
      const store = useStore()
      return {
        store      
      }
    }
  })
</script>