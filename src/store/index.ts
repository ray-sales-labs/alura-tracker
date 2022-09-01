import { INotification } from "@/interfaces/INotification";
import IProjectItem from "@/interfaces/IProjectItem";
import ITaskItem from "@/interfaces/ITaskItem";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_NOTIFICATION, ADD_PROJECT, ADD_TASK, DELETE_PROJECT, DELETE_TASK, EDIT_PROJECT, UPDATE_TASK } from "./mutations_type";

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
    [ADD_PROJECT](state, projectName: string) {
      
      const project = {
        id: new Date().toISOString(),
        name: projectName
      } as IProjectItem

      state.projects.push(project)
    },
    [EDIT_PROJECT](state, project: IProjectItem) {
      const index = state.projects.findIndex(item => item.id == project.id)
      console.log(index)
      state.projects[index] = project
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter(item => item.id != id)
    },
    [ADD_TASK](state, task: ITaskItem) {
      task.id = new Date().toISOString()
      state.tasks.push(task)
    },
    [DELETE_TASK](state, id: string) {
      state.tasks = state.tasks.filter(task => task.id != id)
    },
    [UPDATE_TASK](state, task: ITaskItem) {
      const index = state.tasks.findIndex(item => item.id == task.id)
      state.tasks[index] = task
    },
    [ADD_NOTIFICATION](state, newNotification:INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
      }, 3000)
    }
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}