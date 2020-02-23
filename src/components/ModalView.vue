<template>
  <v-row justify="center">
    <v-dialog persistent transition="scale-transition" origin="center center" v-model="visible" max-width="400px" max-heigth="400px">
      <v-card class="d-inline-block mx-auto">
        <v-container>
          <v-alert type="error" :value="modals.error!=''">
            {{ modals.error }}
          </v-alert>
          <v-row class="font-weight-light body-2">            
            <v-col cols="12">                
              <slot name="form" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>                                                  
                <v-btn color="red" rounded dark small absolute outlined bottom right @click="showModal=false">
                    Volver
                </v-btn>               
                <v-btn color="red" rounded dark small absolute outlined bottom left @click="submit">
                    {{ action }}
                </v-btn>                    
            </v-col>
          </v-row>          
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ModalView',
  props: {
    visible: Boolean,
    action: String
  },  
  data: function () {
    return { 
    }
  },
  computed: {
    ...mapState([ 'modals' ]),
    showModal: {
      get () {
        return this.visible
      },
      set (value) {
        if ( !value ) {
          this.$emit('closeModal')
        }
      }     
    }                
  },
  methods: {
    ...mapMutations([ 'setModalError' ]),
    submit() {
        this.$emit('submitForm')
    }  
  }
}
</script>