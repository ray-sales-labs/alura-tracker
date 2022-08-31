<template>
    <button class="button" @click="clicked" :disabled="disabled">
      <span v-if="icon" class="icon">
        <i :class="icon">
        
        </i>
      </span>
      <span>{{ label }}</span>
    </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ButtonForm',
    emits: [
      'Clicked'
    ],
    props: {
      label: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clicked(): void {
        this.$emit('Clicked')
      }
    }
  })
</script>
<style scoped>
  .button {
    border: none;
  }
</style>