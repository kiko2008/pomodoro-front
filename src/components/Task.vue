<template>
  <v-card :class="taskCardConf.taskCardStyles" min-width="210" max-width="210" min-height="120" max-height="120" align="left">    
    <v-tooltip top>
      <template v-slot:activator="{ on }">                   
        <p height="60%" v-on="on" :class="taskCardConf.taskCardTextStyles" v-line-clamp:30="3">{{taskData.description}}</p>    
        <v-card-actions justify="bottom">
          <v-spacer></v-spacer>
          <slot name="footer" />
        </v-card-actions>   
      </template>
      <span>{{taskData.description}}</span>
    </v-tooltip>   
  </v-card>  
</template>

<script>

export default {
  name: 'Tasks',
  props: {
    taskCardConf: Object,
    taskData: Object
  },
  data: function () {
    return {      
    }
  }
}
</script>