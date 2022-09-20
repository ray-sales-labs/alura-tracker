<template>
 <TaskBox>
  <div class="columns pointer" @click="selectTask">
    <div class="column is-4">
      {{ task.description || 'Task without description' }}
    </div>
    <div class="column is-3">
      {{ task.project?.name || 'N/D' }}
    </div>
    <div class="column">
      <StopWatch :timeInSeconds="task.secondsDuration" />
    </div>
  </div>
 </TaskBox>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import StopWatch from './StopWatch.vue'
  import ITaskItem from '../interfaces/ITaskItem'
  import TaskBox from './TaskBox.vue'
  export default defineComponent({
    name: 'TaskItem',
    components: {
      StopWatch,
      TaskBox
    },
    emits: [
      'selectTask'
    ],
    props: {
      task: {
        type: Object as PropType<ITaskItem>,
        required: true
      }
    },
    setup(props, { emit }) {
      
      const selectTask = (): void => {
        emit('selectTask', props.task)
      }

      return {
        selectTask
      }
    }
  })
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>