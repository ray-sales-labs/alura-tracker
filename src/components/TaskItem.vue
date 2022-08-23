<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ description }}
      </div>
      <div class="column">
        <StopWatch :timeInSeconds="secondsDuration" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import StopWatch from './StopWatch.vue'
  import ITaskItem from './interfaces/ITaskItem'

  export default defineComponent({
    name: 'TaskItem',
    components: {
      StopWatch
    },
    props: {
      task: {
        type: Object as PropType<ITaskItem>,
        required: true
      }
    }
  })
</script>

<style scoped>
  .box {
    background: #FAF0CA;
  }
</style>