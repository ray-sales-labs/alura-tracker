<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo Alura Tracker">
    </h1>
    <div class="has-text-centered">
      <ButtonForm :label="statusButton" @clicked="changeTheme" :icon="darkModeActive ? 'fa-regular fa-lightbulb' : 'fa-solid fa-lightbulb'"/>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link class="link" to="/">
            <i class="fas fa-tasks">
              Tarefas
            </i>
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/projects">
            <i class="fas fa-project-diagram">
              Projetos
            </i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
import ButtonForm from './ButtonForm.vue';

  export default defineComponent({
    name: "SideBar",
    emits: ['ChangeTheme'],
    components: { ButtonForm },
    data(){
      return {
        darkModeActive: false
      }
    },
    computed: {
      statusButton (): string {
        return this.darkModeActive ? 'Desativar modo escuro' : 'Ativar modo escuro'
      }
    },
    methods: {
      changeTheme () {
        this.darkModeActive = !this.darkModeActive
        this.$emit('ChangeTheme', this.darkModeActive)
      }
    }
})
</script>

<style scoped>
  header {
    background: #8F5394;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }

  .panel li {
    margin: 8px 0;
  }

  .link {
    color: #fff;
  }
  .link:hover {
    color: #FAF0CA;
  }
  .link.router-link-active {
    color: #FAF0CA;
  }

</style>