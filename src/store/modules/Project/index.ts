import http from "@/http";
import IProjectItem from "@/interfaces/IProjectItem";
import { State } from "@/store";
import { GET_PROJECTS, ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from "@/store/actions_type";
import { DEFINE_PROJECTS, REMOVE_PROJECT } from "@/store/mutations_type";
import { Module } from "vuex";

export interface ProjectState {
  projects: IProjectItem[]
}


export const project: Module<ProjectState, State> = {
  mutations: {
    [REMOVE_PROJECT](state, id: string) {
      state.projects = state.projects.filter(item => item.id != id)
    },
    [DEFINE_PROJECTS](state, projects: IProjectItem[]) {
      state.projects = projects
    },
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
      return http.delete(`projects/${projectId}`).then(() => commit(REMOVE_PROJECT, projectId))
    },
  }
}