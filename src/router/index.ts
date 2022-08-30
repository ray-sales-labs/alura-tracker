import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectsForm from '../views/projects/ProjectsForm.vue'
const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'Tasks', 
    component: TasksView 
  },
  { 
    path: '/projects', 
    name: 'Projects', 
    component: ProjectsView 
  },
  { 
    path: '/projects/new', 
    name: 'New Project', 
    component: ProjectsForm 
  },
  { 
    path: '/projects/:id', 
    name: 'Edit Project', 
    component: ProjectsForm,
    props: true
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


export default router