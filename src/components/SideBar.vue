<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo Alura Tracker">
    </h1>
    <ButtonForm :label="statusButton" @clicked="changeTheme" />
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
    background: #0d3b66;
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

</style>