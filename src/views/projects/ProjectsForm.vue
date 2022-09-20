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
import { defineComponent } from 'vue'
import {useStore} from '@/store'
import { NotificationType } from '@/interfaces/INotification'
import useNotifier from '@/hooks/notifier'
import { ADD_PROJECT, EDIT_PROJECT } from '@/store/actions_type'
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
        const project = this.store.state.project.projects.find(project => project.id == this.id)
        this.projectName = project?.name || ''
      }
    },
    methods: {
      save() {
        if(this.id) {
          this.store.dispatch(EDIT_PROJECT, {
            id: this.id,
            name: this.projectName
          }).then(() => this.onSuccess())
        } else {
          this.store.dispatch(ADD_PROJECT, this.projectName)
            .then(() => this.onSuccess())
        }
        
      },
      onSuccess() {
        this.projectName = ''
        this.notify(NotificationType.SUCCESS, 'Excelente', 'O projeto foi cadastrado com sucesso!')
        this.$router.push('/projects')
      }

    },
    setup() {
      const store = useStore()
      const { notify } = useNotifier()
      return {
        store,
        notify   
      }
    }
  })
</script>