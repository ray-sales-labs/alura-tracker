import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectsForm from '../views/projects/ProjectsForm.vue'
import ProjectsList from '../views/projects/ProjectsList.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'Tasks', 
    component: TasksView 
  },
  {
    path: '/projects',
    component: ProjectsView,
    children: [
      {
        path: '',
        component: ProjectsList,
      },
      { 
        path: 'new', 
        name: 'New Project', 
        component: ProjectsForm 
      },
      { 
        path: ':id', 
        name: 'Edit Project', 
        component: ProjectsForm,
        props: true
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router