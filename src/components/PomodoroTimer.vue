<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card :class="{'mx-auto mt-4 mb-4 green accent-4': timer.breakTime, 'mx-auto mt-4 mb-4 red darken-3': !timer.breakTime}" max-width="700" min-height="300">
          <v-col>
            <v-img
              alt="Pomdoro Logo"
              class="shrink mr-2 pomodoro-color-header shake-animation"
              contain
              src="../assets/pomodoro.svg"
              width="30"
            />
          </v-col>
          <v-container class="timer-font-color">
            <v-row>
              <v-col class="timer-font" id="timer-pomodoro">
                {{getMinutes()}}:{{getSeconds()}}
              </v-col>
            </v-row>
            <v-row>
              <v-col class="font-weight-regular title" v-if="this.tasks.taskSelected">
                {{ this.tasks.taskSelected.description }}
              </v-col>
            </v-row>
            <v-row>
              <v-col class="font-weight-regular title" v-if="this.timer.numberPomodoros>0">
                 Pomodoros consumidos: {{ this.timer.numberPomodoros }}
              </v-col>
            </v-row>
            <v-row>
              <v-col class="font-weight-regular title" v-if="this.tasks.taskSelected && !this.timer.breakTime">
                <v-btn class="btn-timer-color" rounded bottom elevation="18" @click="endTask">
                  Finalizar tarea
                </v-btn>  
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>    
    </v-row>   
  </v-container>
</template>

<script> 

  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'PomodoroTimer',
    data: () => ({

    }),
    created() {    
      this.initTimer()
    },
    computed: {
      ...mapState([ 'users', 'tasks', 'timer' ])
    },
    methods: {
      ...mapMutations([ 'setTaskSelected', 'addEndingTask', 'dropPendingTask', 'setNumberPomodoroUsed', 'setBreakTime', 'initTimer', 'setTaskSelected' ]),
      ...mapActions([ 'persistTask' ]),
      endTask() {
        let taskSelected = this.tasks.taskSelected
        taskSelected.number_pomodoro_used = this.timer.numberPomodoros
        this.setTaskSelected(taskSelected)
        this.addEndingTask(taskSelected)
        this.dropPendingTask(this.tasks.taskSelected)        
        this.setBreakTime(false)
        if ( this.users.user ) {
          let dataUpdateTask = {
            'userName': this.users.user.username,
            'password': this.users.user.password,
            'taskId': this.tasks.taskSelected.id,
            'body': {
              'number_pomodoro_used': this.timer.numberPomodoros,
              'end_task': true
            }
          }          
          this.persistTask(dataUpdateTask)
        }       
        this.setTaskSelected(null)
        this.initTimer()
      },
      formatNumber( num ) {
        return (num < 10 ? '0' : '') + num.toString()
      },
      getMinutes() {
        return this.formatNumber(Math.floor(this.timer.time / 60))
      },
      getSeconds() {
        return this.formatNumber(this.timer.time % 60)
      }
    }
  }
</script>
