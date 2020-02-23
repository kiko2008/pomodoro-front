<template>
  <v-container>          
    <v-chip class="ma-2 pa-4" :color="listTasksConf.colorTitle" text-color="white">
      {{ listTasksConf.title }}
      <v-icon right>{{ listTasksConf.icon }}</v-icon>
    </v-chip>
    <v-card class="mx-auto mt-4 mb-4 pt-4 pa-2 " max-width="700" min-height="300" align="left" justify="left">
      <v-row class="text-center">          
        <v-btn v-if="listTasksConf.isCreator" absolute dark fab top left class="red accent-2" @click="setShowModalCreateTask(true)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <slot name="listTask" />          
      </v-row>
    </v-card>     
  </v-container>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ListTasks',
  props: {
    listTasksConf: Object
  },
  data: function () {
    return {      
    }
  },
  computed: {
    ...mapState(['modals', 'users'])
  },
  methods: {
    ...mapMutations(['setShowModalCreateTask'])
  }
}
</script>