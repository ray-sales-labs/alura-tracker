import http from "@/http";
import ITaskItem from "@/interfaces/ITaskItem";
import { State } from "@/store";
import { DEFINE_TASKS, UPDATE_TASK, PUSH_TASK } from "@/store/mutations_type";
import { Module } from "vuex";

import { 
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK
} from "../../actions_type";
export interface TaskState {
  tasks: ITaskItem[]
}


export const task: Module<TaskState, State> = {
  mutations: {
    [DEFINE_TASKS](state, tasks: ITaskItem[]) {
      state.tasks = tasks
    },
    [UPDATE_TASK](state, task: ITaskItem) {
      const index = state.tasks.findIndex(t => t.id == task.id)
      state.tasks[index] = task

    },
    [PUSH_TASK](state, task: ITaskItem) {
      state.tasks.push(task)
    },
  },
  actions: {
    [GET_TASKS]({ commit }) {
      http.get('tasks')
        .then(result => commit(DEFINE_TASKS, result.data))
    },
    [ADD_TASK]({ commit }, task: ITaskItem) {
      return http.post('tasks', task)
        .then(res => commit(PUSH_TASK, res.data))
    },
    [EDIT_TASK]({ commit }, task: ITaskItem) {
      return http.put(`tasks/${task.id}`, task)
        .then(res => commit(UPDATE_TASK, task))
    },
  }
}