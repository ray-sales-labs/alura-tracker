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
import { defineComponent, ref } from 'vue'
import {useStore} from '@/store'
import { NotificationType } from '@/interfaces/INotification'
import useNotifier from '@/hooks/notifier'
import { ADD_PROJECT, EDIT_PROJECT } from '@/store/actions_type'
import { useRouter } from 'vue-router'
  export default defineComponent({
    name: 'ProjectsForm',
    props: {
      id: {
        type: String
      }
    },
    setup(props) {
      const store = useStore()
      const router = useRouter()
      const { notify } = useNotifier()
      const projectName = ref('')

      if (props.id) {
        const project = store.state.project.projects.find(project => project.id == props.id)
        projectName.value = project?.name || ''  
      }

      const save = () => {
        if(props.id) {
          store.dispatch(EDIT_PROJECT, {
            id: props.id,
            name: projectName.value
          }).then(() => onSuccess())
        } else {
          store.dispatch(ADD_PROJECT, projectName.value)
            .then(() => onSuccess())
        }
        
      }

      const onSuccess = () => {
        projectName.value = ''
        notify(NotificationType.SUCCESS, 'Excelente', 'O projeto foi cadastrado com sucesso!')
        router.push('/projects')
      }

      return {
        projectName,
        save,
        onSuccess
      }
    }
  })
</script>