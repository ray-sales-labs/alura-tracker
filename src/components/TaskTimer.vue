<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopWatch :timeInSeconds="timeInSeconds" />
    <ButtonForm 
      @clicked="startCounting"
      label="play"
      icon="fas fa-play"  
      :disabled="stopwatchInitied"
    />
    <ButtonForm 
      @clicked="stopCounting"
      label="stop"
      icon="fas fa-stop"  
      :disabled="!stopwatchInitied"
    />

  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import StopWatch from './StopWatch.vue'
import ButtonForm from './ButtonForm.vue'

  export default defineComponent({
    name: 'TaskTimer',
    emits: [
      'Finished'
    ],
    components: {
    StopWatch,
    ButtonForm
},
    data() {
      return {
        timeInSeconds: 0,
        stopwatch: 0,
        stopwatchInitied: false,
      }
    },
    methods: {
      startCounting() {
        //start contagem
        this.stopwatchInitied = true
        this.stopwatch = setInterval(() => {
          this.timeInSeconds++
        }, 1000)
      },
      stopCounting() {
        clearInterval(this.stopwatch)
        this.stopwatchInitied = false
        this.$emit('Finished', this.timeInSeconds)
        this.timeInSeconds = 0
      }
    },
  })

</script>