<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card class="mx-auto mt-4 mb-4 red darken-3" max-width="700" min-height="300">
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
              <v-col class="font-weight-regular title" v-if="this.tasks.taskSelected">
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
      defaultTime: 60 * 27,
      time: 0,
      timer: null
    }),
    created(){
      this.time = this.defaultTime;
      this.playPause()
    },
    computed: {
      ...mapState(['users', 'tasks'])
    },
    methods: {
      ...mapMutations(['setTaskSelected', 'addEndingTask', 'dropPendingTask']),
      ...mapActions(['persistEndTask']),
      endTask() {
        this.addEndingTask(this.tasks.taskSelected)
        this.dropPendingTask(this.tasks.taskSelected)        
        if (this.users.user) {
          let dataUpdateTask = {
            'userName': this.users.user.username,
            'password': this.users.user.password,
            'taskId': this.tasks.taskSelected.id,
            'body': {
              'end_task': true
            }
          }          
          this.persistEndTask(dataUpdateTask)
        }
        this.setTaskSelected(null)
      },
      formatNumber(num){
        return (num < 10 ? '0' : '') + num.toString();
      },
      getMinutes(){
        return this.formatNumber(Math.floor(this.time / 60));
      },
      getSeconds(){
        return this.formatNumber(this.time % 60);
      },
      playPause(){
        if(!this.timer){
          this.play();
        }else{
          this.pause();
        }
      },
      play(){
        if(this.time <= 0) this.time = this.defaultTime;
        this.timer = setInterval(() => {
          this.time -= 1;
          if(this.time <= 0) this.playPause();
        }, 1000);
      },
      pause(){
        clearInterval(this.timer);
        this.timer = null;
      },
      reset(){
        this.time = this.defaultTime;
      },
      getPlayState(){
        return !!this.timer;
      }
  
    }
  }
</script>
