<template>
  <modal
    name="ResetPasswordModal"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    width="28%"
    height="auto"
  >
    <v-card>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-form
              method="POST"
              enctype="text/plain"
              @submit.prevent="submit"
              @keyup.native.enter="submit"
              id="reset-password-form"
            >
              <v-card-title class="font-medium justify-center">Reset Your Password</v-card-title>
              <v-card-subtitle class="font-normal justify-center" align="center">
                <p class="justify-center">Please enter and confirm your new password bellow to access your account</p>
              </v-card-subtitle>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="resetPassword.password"
                    type="password"
                    placeholder="New Password"
                    hide-details
                    solo
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="resetPassword.confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    solo
                    :error-messages="apiMsgError"
                  />
                </v-col>
                <v-col cols="12" align="center" class="mb-5 pt-0">
                  <v-btn form="reset-password-form" color="primary" type="submit" rounded>Reset
                    Password
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </modal>
</template>

<script>
  export default {
    name: 'ResetPasswordModal',
    data() {
      return {
        apiMsgError: '',
        rules: {
          required: value => !!value || 'Required.',
        },
        successData : {
          iconImg: require(`~/assets/images/logo/success.svg`),
          title : 'Reset Password Successfully',
          subtitle : 'You can now use new password to sign in to your account',
          btnName : 'Go to Sign In',
          btnToModal : 'SignInModal',
        }
      }
    },
    computed: {
      resetPassword() {
        return {
          password: '',
          confirmPassword: '',
        };
      },
    },
    methods: {
      async submit() {
        if(this.resetPassword.password !== '' && this.resetPassword.password === this.resetPassword.confirmPassword){
          this.apiMsgError = ''
            const resetData = {
              lang: 'th',
              newPassword: this.resetPassword.password,
              orgIdfier: 'scg',
              token: this.$route.query.resetPassToken,
              userType: 'BUYER',
            };

          await this.$repositories.user
            .resetPassword(resetData)
            .then((res) => {
              if(res.error){
                this.apiMsgError = res.error
              }else{
                this.apiMsgError = '';
                this.$modal.hide('ResetPasswordModal')
                this.$modal.show('SuccessDialogModal',{item : this.successData})
              }
            })
            .catch((err) => {
              this.apiMsgError = 'Reset Password Fail.'
            });
        }else{
            this.apiMsgError = 'Password not match.'
        }
      },
    },
  }
</script>
