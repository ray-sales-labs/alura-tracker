<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @changeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarters content">
      <NotificationsAlert />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue'
import NotificationsAlert from './components/Notifications.vue';

export default defineComponent({
    name: "App",
    components: {
    SideBar,
    NotificationsAlert
},
  data() {
    return {
      darkModeActive: false
    }
  },
  methods: {
    changeTheme(active: boolean): void {
      this.darkModeActive = active
    }
  }
});
</script>

<style>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
