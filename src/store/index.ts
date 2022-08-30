import IProjectItem from "@/interfaces/IProjectItem";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";

interface State {
  projects: IProjectItem[],
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: []
  },
  mutations: {
    'ADD_PROJECT'(state, projectName: string) {
      
      const project = {
        id: new Date().toISOString(),
        name: projectName
      } as IProjectItem

      state.projects.push(project)
    },
    'EDIT_PROJECT'(state, project: IProjectItem) {
      const index = state.projects.findIndex(item => item.id == project.id)
      console.log(index)
      state.projects[index] = project
    }
  },
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}