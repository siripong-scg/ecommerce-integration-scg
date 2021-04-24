<template>
  <modal
    name="SuccessDialogModal"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="28%"
    height="auto"
    @before-open="beforeOpen"
  >
    <v-card>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <div align="center">
              <v-img class="mr-3"
                     :src="item.iconImg"
                     max-width="120px"/>
            </div>
            <v-card-title class="font-medium justify-center">{{item.title}}</v-card-title>
            <v-card-subtitle class="font-normal justify-center" align="center">
              <p class="justify-center" v-html="item.subtitle"/>
            </v-card-subtitle>
            <v-row>
              <v-col cols="12" align="center" class="mb-5 pt-0">
                <v-btn @click="openModal()" color="primary" rounded>{{item.btnName}}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </modal>
</template>

<script>
  export default {
    name: 'SuccessDialogModal',
    data() {
      return {
        item: '',
      }
    },
    methods: {
      openModal() {
        this.$modal.hide('SuccessDialogModal')
        if (this.item.btnToModal) {
          this.$modal.show(this.item.btnToModal)
        }
      },
      beforeOpen(event) {
        this.item = event.params.item
      }
    },
  }
</script>
