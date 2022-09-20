import { INotification } from "@/interfaces/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_NOTIFICATION } from "./mutations_type";
import { ProjectState, project } from "./modules/Project";
import { TaskState, task } from "./modules/Task";
export interface State {
  task: TaskState,
  notifications: INotification[],
  project: ProjectState
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    notifications: [],
    project: {
      projects: []
    },
    task: {
      tasks: []
    }
  },
  mutations: {
    [ADD_NOTIFICATION](state, newNotification:INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)

      setTimeout(() => {
        state.notifications = state.notifications.filter(notification => notification.id != newNotification.id)
      }, 3000)
    }
  },
  actions: {
    
  },
  modules: {
    project,
    task,
  }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}