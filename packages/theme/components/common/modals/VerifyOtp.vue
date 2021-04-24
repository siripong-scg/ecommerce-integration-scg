<template>
  <modal
    name="VerifyOtpModal"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    height="auto"
    :width="width"
    @before-open="beforeOpen"
  >
    <v-card>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-card-title class="font-medium justify-center text-4xl">Verification</v-card-title>
            <div align="center">
              <v-img class="mr-3"
                     :src="require(`~/assets/images/authentication/otp/Group 10004_2021-04-16/Group 10004.svg`)"
                     max-width="120px"/>
            </div>
            <v-card-subtitle class="font-normal justify-center" align="center">
              We have sent a verification code to {{ this.maskedPhone }}
              <br>This code will expire in 10 minutes.
              <br>(OPT Reference : {{this.otpId}} )
            </v-card-subtitle>
            <v-row>
              <v-form
                method="POST"
                enctype="text/plain"
                @submit.prevent="verifyOTP"
                @keyup.native.enter="verifyOTP"
                id="verify-otp-form"
              >
                <v-col cols="12" align="center" class="pl-8 pr-8">
                  <vue-otp-input
                    inputClasses="pl-6 px-3 py-5 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full mr-1 ml-1"
                    separator=""
                    :numInputs="6"
                    :shouldAutoFocus="true"
                    @on-complete="handleOnComplete"
                    :error-messages="otpError"
                  />
                  <v-row class="mt-5" no-gutters>
                    <v-col cols="12" align="center">
                      <span class="red--text" v-text="otpError"/>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" align="center">
                  <v-btn color="primary" form="verify-otp-form" type="submit" :disabled='isDisabled' rounded block>
                    Verify
                  </v-btn>
                </v-col>
              </v-form>

              <v-card-subtitle class="font-normal">
                Haven't received verification code on your mobile yet? <br>
                <a
                  @click="resendOtp"
                  class="text-decoration-none link-path"
                ><span>Resend verification code</span></a> <br>
                <a
                  @click="openRegisterModal"
                  class="text-decoration-none link-path"
                  v-if="isShowBackToRegister"
                ><span>Use anothor email address</span></a>

              </v-card-subtitle>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </modal>
</template>

<script>
  import VueOtpInput from "@bachdgvn/vue-otp-input";

  export default {
    name: 'VerifyOtpModal',
    components: {
      'vue-otp-input': VueOtpInput
    },
    props: {
      numInputs: {
        default: 4,
      },
      separator: {
        type: String,
        default: '',
      },
      inputClasses: {
        type: String,
      },
      isInputNum: {
        type: Boolean,
      },
      shouldAutoFocus: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        isShowBackToRegister: false,
        isDisabled: true,
        verifyData: '',
        otpError: '',
        maskedPhone: '',
        otp: '',
        otpId: '',
        socialAccessToken: ''
      }
    },
    computed: {
      width() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return 300
          case 'sm':
            return 300
          case 'md':
            return 300
          case 'lg':
            return 400
          case 'xl':
            return 500
        }
      },
    },
    methods: {
      async verifyOTP() {
        if (this.verifyData.registerType === 'local' || this.verifyData.registerType === 'forgot_password') {
          await this.$repositories.user
            .verifyOTP(this.verifyData.otpResponse.otpId, this.otp)
            .then((res) => {
              if (res.verified) {
                this.otp = '';
                this.otpError = null;
                if (this.verifyData.registerType === 'forgot_password') {
                  this.forgotPassword()
                } else {
                  this.register();
                }
              } else {
                this.otpError = 'The OTP you entered is invalid.';
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const requestOtpData = {
            lang: 'th',
            userType: 'BUYER',
            orgIdfier: 'scg',
            locale: 'th',
            otp: this.otp,
            otpId: this.verifyData.otpResponse.otpId,
            phone: this.verifyData.phoneNo,
            buyerName: this.verifyData.fullName,
            type: 'signup',
          };

          await this.$repositories.user
            .socialVerifyOTP(requestOtpData)
            .then((res) => {
              if (res !== undefined && res.verified) {
                this.$modal.hide('VerifyOtpModal')
                this.otp = '';
                this.otpError = null;
                this.socialSignUp();
              } else {
                this.otpError = 'The OTP you entered is invalid.';
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },

      async forgotPassword() {
        await this.$repositories.user
          .forgetPassword(this.verifyData)
          .then((res) => {
            if (res.phoneNo != null || res.useremail != null) {
              this.otpError = '';
              this.$modal.hide('VerifyOtpModal')
            } else {
              this.$modal.hide('VerifyOtpModal')
              alert('User not found.');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },

      async socialSignUp() {
        this.$nuxt.$loading.start()
        await this.$repositories.user
          .socialSignup(
            this.verifyData,
            this.$route.query.signupToken,
            this.verifyData.action,
          )
          .then((res) => {
            if (res.accessToken) {
              this.socialAccessToken = res.accessToken;
              this.$auth.setToken('local', `Bearer ${res.accessToken}`);
              this.$axios.setToken(res.accessToken, 'Bearer');
              this.$repositories.user
                .getProfile(res)
                .then((userProfile) => {
                  this.userProfile = userProfile;
                })
                .catch((err) => console.log(err));
              this.$nuxt.$loading.finish()
            } else {
              alert(res.error)
              // this.$bvToast.toast(res.error, {
              //   title: 'Register Fail!',
              //   variant: 'danger',
              //   solid: true,
              // });
              this.otpError = null;
              this.$nuxt.$loading.finish()
              this.$modal.show('SignInModal')
            }
          })
          .catch((err) => {
            // this.$bvToast.toast(error, {
            //   title: 'Register Fail!',
            //   variant: 'danger',
            //   solid: true,
            // });
            console.log(err)
            this.$nuxt.$loading.finish()
            this.$modal.show('SignInModal')
          });
      },

      resendOtp() {
        return this.$repositories.user
          .requestOTP(this.verifyData.requestOtpData)
          .then((res) => {
            this.verifyData.otpResponse = res
          })
          .catch((err) => {
            console.log(err);
          });
      },

      handleOnComplete(value) {
        if (value.length === 6) {
          this.otp = value
          this.isDisabled = false
        }
      },

      openRegisterModal() {
        this.$modal.hide('VerifyOtpModal')
        this.$modal.show('RegisterModal')
      },

      beforeOpen(event) {
        if (event.params !== undefined) {
          this.maskedPhone = event.params.verifyParams.otpResponse.maskedPhone ? event.params.verifyParams.otpResponse.maskedPhone : 'your email'
          this.otpId = event.params.verifyParams.otpResponse.otpId
          this.verifyData = event.params.verifyParams
          this.isShowBackToRegister = this.verifyData.registerType === 'local'
        }
      }
    }
  }
</script>
<style scoped>
  .link-path {
    color: #007AFF;
  }

  .nolinkstyle {
    color: #000;
    text-decoration: unset;
  }

  .otp-input {
    width: 40px !important;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    textalign: "center";
  }

  .otp-input.error {
    border: 1px solid red !important;
  }

  otp-error-msg {
    float: left;
  }
</style>
