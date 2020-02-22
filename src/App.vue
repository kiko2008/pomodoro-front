<template>
  <v-app>
    <v-app-bar
      app
      color="red darken-3"
      dark>
      <div class="d-flex align-center">
        <v-img
          alt="Pomdoro Logo"
          class="shrink mr-2 pomodoro-color-header"
          contain
          src="./assets/pomodoro.svg"
          transition="scale-transition"
          width="50"
        />
        <v-col class="timer-font header-title">
          Timer
        </v-col>
      </div>
      <v-spacer></v-spacer>
      <span>{{ greeting }}</span>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="users.user==null" @click="setShowModalLogin(true)">
            <v-list-item-title>Iniciar sesión</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="users.user==null" @click="setShowModalLogup(true)">
            <v-list-item-title>Crear nuevo usuario</v-list-item-title>
          </v-list-item>        
          <v-list-item v-if="users.user!=null" @click="logout">
            <v-list-item-title>Finalizar sesión</v-list-item-title>
          </v-list-item>      
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <Home/>
    </v-content>¨

    <v-footer class="timer-font timer-font-color header-title" color="red darken-3">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Pomodoro timer</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<style>
  @import "./assets/styles/styles.css"
</style>


<script>

import {mapState, mapMutations, mapActions} from 'vuex'
import Home from './components/Home'

export default {
  name: 'App',

  components: {Home},
  data: () => ({
  }),
  created () {
    let userSession = JSON.parse(localStorage.getItem(`pomodoro-timer-user`))
    if (userSession) {
      this.setUser(userSession)
    }
  },
  computed: {
    ...mapState(['modals', 'users']),
    greeting () {
      let greeting = null
      let user = this.users.user
      if (user) {
        greeting = `Bienvenido ${user.first_name} ${user.last_name}`
      }
      return greeting
    }
  },
  methods: {
    ...mapMutations(['setShowModalLogin', 'setShowModalLogup', 'setUser']),
    ...mapActions(['logout'])
  }
};
</script>
