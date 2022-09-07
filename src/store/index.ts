import { INotification } from "@/interfaces/INotification";
import IProjectItem from "@/interfaces/IProjectItem";
import ITaskItem from "@/interfaces/ITaskItem";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_NOTIFICATION, DEFINE_PROJECTS, REMOVE_PROJECT, DEFINE_TASKS } from "./mutations_type";
import { 
  GET_PROJECTS, 
  ADD_PROJECT, 
  DELETE_PROJECT, 
  EDIT_PROJECT, 
  GET_TASKS,
  ADD_TASK
} from "./actions_type";
import http from '@/http'
interface State {
  projects: IProjectItem[],
  tasks: ITaskItem[],
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  mutations: {
    [REMOVE_PROJECT](state, id: string) {
      state.projects = state.projects.filter(item => item.id != id)
    },
    [DEFINE_PROJECTS](state, projects: IProjectItem[]) {
      state.projects = projects
    },
    [DEFINE_TASKS](state, tasks: ITaskItem[]) {
      state.tasks = tasks
    },
    [ADD_NOTIFICATION](state, newNotification:INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
      }, 3000)
    }
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http.get('projects')
        .then(result => commit(DEFINE_PROJECTS, result.data))
    },
    [ADD_PROJECT](context, projectName: string) {
      return http.post('projects', {
        name: projectName
      })
    },
    [EDIT_PROJECT](context, project: IProjectItem) {
      return http.put(`projects/${project.id}`, project)
    },
    [DELETE_PROJECT]({ commit }, projectId: string) {
      return http.delete(`projects/${projectId}`).then(() => commit(DELETE_PROJECT, projectId))
    },
    [GET_TASKS]({ commit }) {
      http.get('tasks')
        .then(result => commit(DEFINE_TASKS, result.data))
    },
    [ADD_TASK](context, task: ITaskItem) {
      return http.post('tasks', task)
    },
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}