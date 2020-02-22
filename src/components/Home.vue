<template>
  <div class="home">
    <ModalView :visible="modals.showLogin" action="Iniciar sesión" @closeModal="setShowModalLogin(false); setModalError('')" @submitForm="handleSubmitLogin" >
      <template slot="form">
          <v-text-field v-model="form.userName" :error-messages="$v.form.$error && !$v.form.userName.required? 'Usuario requerido': ''" label="Usuario" single-line solo></v-text-field>
          <v-text-field single-line solo
                  v-model="form.password"    
                  :error-messages="$v.form.$error && !$v.form.password.required? 'Contraseña requerida': ''"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
         </template>      
    </ModalView>    
    <ModalView :visible="modals.showLogup" action="Crear usuario" @closeModal="setShowModalLogup(false); setModalError('')" @submitForm="handleSubmitLogup" >
      <template slot="form">          
          <v-text-field v-model="formLogup.firstName" :error-messages="$v.formLogup.$error && !$v.formLogup.firstName.required? 'Nombre requerido': ''" label="Nombre" single-line solo></v-text-field>
          <v-text-field v-model="formLogup.lastName" :error-messages="$v.formLogup.$error && !$v.formLogup.lastName.required? 'Apellidos requerido': ''" label="Apellidos" single-line solo></v-text-field>
          <v-text-field v-model="formLogup.email" :error-messages="$v.formLogup.$error && !$v.formLogup.email.required? 'Email requerido': ''" label="Correo electronico" single-line solo></v-text-field>
          <v-text-field v-model="formLogup.userName" :error-messages="$v.formLogup.$error && !$v.formLogup.userName.required? 'Usuario requerido': ''" label="Usuario" single-line solo></v-text-field>
          <v-text-field single-line solo
                  v-model="formLogup.password"    
                  :error-messages="$v.formLogup.$error && !$v.formLogup.password.required? 'Contraseña requerida': ''"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
      </template>      
    </ModalView>    
    <PomodoroTimer />
    <TasksSection />
  </div>
</template>

<script>

import {mapState, mapMutations, mapActions} from 'vuex'
import { required } from "vuelidate/lib/validators"
import PomodoroTimer from '@/components/PomodoroTimer.vue'
import TasksSection from '@/components/TasksSection.vue'
import ModalView from '@/components/ModalView.vue'

export default {
  name: 'home',
  data: function () {
    return {
      showPassword: false,  
      form: {      
        userName: '',
        password: ''        
      },
      formLogup: {      
        firstName: '',
        lastName: '',
        email: '',        
        userName: '',
        password: ''
      }
    }
  },
  components: {
    PomodoroTimer,
    TasksSection,
    ModalView
  },
  validations: {   
    form: {      
      userName: { required },
      password: { required }    
    },
    formLogup: {      
      firstName: { required },
      lastName: { required },
      email: { required },        
      userName: { required },
      password: { required }    
    }
  },
  computed: {
    ...mapState(['modals'])
  },
  methods: {    
    ...mapMutations(['setShowModalLogin', 'setShowModalLogup', 'setModalError']),
    ...mapActions(['login', 'logup', 'logout']),
    handleSubmitLogin() {        
        this.$v.form.$touch();
        if (this.$v.form.$invalid) {
            return;
        }        
        this.login(this.form)
    },
    handleSubmitLogup() {        
        this.$v.formLogup.$touch();
        if (this.$v.formLogup.$invalid) {
            return;
        }        
        this.logup(this.formLogup)
    }  
  }
}
</script>
