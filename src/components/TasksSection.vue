<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6" justify="left">        
        <ListTasks :listTasksConf="listPendingTasksConf" :taskCardConf="pendingTaskCardConf">
          <template slot="listTask">
            <span class="orange--text ma-10 card-text" block v-if="tasks.listPendingTask.length == 0">No hay tareas pendientes</span>        
            <Task :taskCardConf="pendingTaskCardConf" :task-data="task"  v-for="task in tasks.listPendingTask" :key="task.id">
              <template slot="footer">
                <v-btn color="orange" x-small outlined bottom block :disabled="tasks.taskSelected!=null" @click="initTask(task)">
                  Iniciar tarea
                </v-btn> 
              </template>
            </Task>
          </template>
        </ListTasks>  
      </v-col>
      <v-col cols="6">
        <ListTasks :listTasksConf="listEndingTasksConf" :taskCardConf="endingTaskCardConf">           
          <template slot="listTask">     
            <span class="green--text ma-10 card-text" block v-if="tasks.listEndingTask.length == 0">No hay tareas finalizadas</span>        
            <Task :taskCardConf="endingTaskCardConf" :task-data="task"  v-for="task in tasks.listEndingTask" :key="task.id">
              <template slot="footer">
                <v-chip class="pa-2" :color="listEndingTasksConf.colorTitle" text-color="white">
                  {{ task.number_pomodoro_used }}
                  <v-img
                      alt="Pomdoro Logo"
                      class="shrink mr-2 ml-2"
                      contain
                      src="../assets/pomodoro.svg"
                      width="16"/>      
                </v-chip>                         
              </template>
            </Task>
          </template>
        </ListTasks>        
      </v-col>
    </v-row>
    <ModalView :visible="modals.showCreateTask" action="Crear tarea" @closeModal="setShowModalCreateTask(false)" @submitForm="handleSubmit" >
      <template slot="form">          
        <v-text-field v-model="form.description" :error-messages="$v.form.$error && !$v.form.description.required? 'Descripción requerida': ''" label="Descripción" single-line solo></v-text-field>      
      </template>
    </ModalView>    
  </v-container>
</template>

<script>  

  import { mapState, mapMutations, mapActions } from 'vuex'
  import { required } from "vuelidate/lib/validators"
  import ListTasks from '@/components/ListTasks.vue'
  import Task from '@/components/Task.vue'
  import ModalView from '@/components/ModalView.vue' 

  export default {
    name: 'TasksSection',
    data: () => ({
      form: {      
        description: ''
      },
      listPendingTasksConf:{
        title: 'Tareas Pendientes',
        colorTitle: 'orange',
        icon: 'mdi-format-list-bulleted',
        isCreator: true
      },
      pendingTaskCardConf:{
        taskCardStyles: 'mx-auto mt-4 mb-2 body-2 pa-2 yellow lighten-5',
        taskCardTextStyles: "orange--text mb-2 card-text"        
      },
      listEndingTasksConf:{
        title: 'Tareas finalizadas',
        colorTitle: 'light-green accent-4',
        icon: 'mdi-clipboard-check-multiple-outline',
        isCreator: false
      },
      endingTaskCardConf:{
        taskCardStyles: 'mx-auto mt-4 mb-2 body-2 pa-2 light-green lighten-5',
        taskCardTextStyles: "green--text mb-2 card-text"
      }
    }),
    components: {
      ListTasks,
      Task,
      ModalView      
    },
    mounted() {
      this.getListPendingTasks(this.users.user)
      this.getListEndingTasks(this.users.user)
    },
    validations: {   
      form: {      
        description: { required }
      }
    },
    computed: {
      ...mapState([ 'modals', 'users', 'tasks' ])      
    },
    methods: {
      ...mapMutations([ 'setShowModalCreateTask', 'setTaskSelected', 'setTask', 'setModalError', 'setShowModalCreateTask', 'addPendingTask', 'playTimer' ]),
      ...mapActions([ 'createTask', 'getListPendingTasks', 'getListEndingTasks' ]),
      handleSubmit() {        
          this.$v.form.$touch()
          if ( this.$v.form.$invalid ) {
              return
          }
          let newTask = {            
            description: this.form.description,
            pub_date: new Date(),
            number_pomodoro_used: 0,
            end_task: false
          }   
          this.setTask(newTask)
          this.setModalError('')
          this.setShowModalCreateTask(false)
          if ( this.users.user ) {
            newTask.userId = this.users.user.id
            this.createTask(newTask)
          } else {
            this.addPendingTask(newTask)     
          }
      },
      initTask(task) {
        this.setTaskSelected(task)
        this.playTimer(task)
      }
    }    
  }
</script>
