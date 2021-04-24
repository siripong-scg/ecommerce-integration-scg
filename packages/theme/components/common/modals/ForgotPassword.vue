<template>
  <modal
    name="ForgotPasswordModal"
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
            <v-form
              method="POST"
              enctype="text/plain"
              @submit.prevent="validate"
              @keyup.native.enter="validate"
              id="forgot-password-form"
              ref="form"
              lazy-validation
            >
              <v-card-title class="font-medium justify-center">Forgot Your Password ?</v-card-title>
              <v-card-subtitle class="font-normal justify-center" align="center">
                <p class="justify-center">Enter your {{tabTitle}} and we`ll send you a link to reset your password</p>
              </v-card-subtitle>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="mobileNo"
                    placeholder="Mobile Number"
                    :error-messages="mobileNoErrors"
                    @input="$v.mobileNo.$touch()"
                    @blur="$v.mobileNo.$touch()"
                    @keypress="forceNumberInput($event)"
                    maxLength="9"
                    solo
                    required
                    v-if="isMobile"
                  >
                    <template v-slot:prepend-inner>
                      <v-btn
                        disabled
                        depressed
                        tile
                        color="lightSilver"
                        class="ma-0">
                        +66
                      </v-btn>

                    </template>
                  </v-text-field>

                  <v-text-field
                    v-model="userEmail"
                    placeholder="Email"
                    :error-messages="userEmailErrors"
                    @input="$v.userEmail.$touch()"
                    @blur="$v.userEmail.$touch()"
                    solo
                    required
                    v-if="!isMobile"
                  />
                </v-col>
                <v-col cols="12" align="center" class="pb-5 pt-0">
                  <v-btn form="forgot-password-form" color="primary" width="150px" type="submit" rounded>Submit</v-btn>
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
  import {validationMixin} from 'vuelidate'
  import {required, minLength, email} from 'vuelidate/lib/validators'

  export default {
    name: 'ForgotPasswordModal',
    mixins: [validationMixin],
    validations: {
      mobileNo: {required, minLength: minLength(9)},
      userEmail: {required, email},
    },
    data() {
      return {
        tabTitle: '',
        isMobile: false,
        apiMsgError: '',

        mobileCode: '+66',
        mobileNo: '',
        userEmail: '',
      }
    },
    computed: {
      mobileNoErrors() {
        const errors = []
        if (!this.$v.mobileNo.$dirty) return errors
        !this.$v.mobileNo.minLength && errors.push('Mobile number must be 9 digits')
        !this.$v.mobileNo.required && errors.push('Mobile number is required.')
        return errors
      },
      userEmailErrors() {
        const errors = []
        if (!this.$v.userEmail.$dirty) return errors
        !this.$v.userEmail.email && errors.push('Email must be a valid email address.')
        !this.$v.userEmail.required && errors.push('Email is required')
        return errors
      },
      width() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return 400
          case 'sm':
            return 400
          case 'md':
            return 100
          case 'lg':
            return 400
          case 'xl':
            return 400
        }
      },
    },
    methods: {
      validate() {
        this.$v.$touch();
        if (this.isMobile) {
          this.formTouched = !this.$v.mobileNo.$anyDirty;
          this.errors = this.$v.mobileNo.$anyError;
        } else {
          this.formTouched = !this.$v.userEmail.$anyDirty;
          this.errors = this.$v.userEmail.$anyError;
        }
        if (this.errors === false && this.formTouched === false) {
          this.submit();
        }
      },

      async submit() {
        this.$nuxt.$loading.start()
        const forgotPasswordData = {
          lang: 'th',
          userType: 'BUYER',
          orgIdfier: 'scg',
        }
        const requestOtpData = {
          locale: 'th',
        };
        if (this.isMobile) {
          const mobile = this.mobileCode + this.mobileNo
          requestOtpData.phone = mobile
          forgotPasswordData.phoneNo = mobile
        } else {
          const email = this.userEmail
          requestOtpData.email = email
          forgotPasswordData.useremail = email
        }

        await this.$repositories.user
          .requestOTP(requestOtpData)
          .then((res) => {
            if (res.status) {
              forgotPasswordData.requestOtpData = requestOtpData
              forgotPasswordData.otpResponse = res
              forgotPasswordData.registerType = 'forgot_password'

              this.$nuxt.$loading.finish()
              this.$modal.hide('ForgotPasswordModal')
              this.$modal.show('VerifyOtpModal', {
                verifyParams: forgotPasswordData
              });
            } else {
              console.log('Something Went wrong, Please try again')
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },

      beforeOpen(event) {
        if (event.params !== undefined) {
          if (event.params.isTab === 'mobile-tab') {
            this.isMobile = true
            this.tabTitle = 'mobile number'
          } else {
            this.isMobile = false
            this.tabTitle = 'email'
          }
        }
      },

      forceNumberInput(e) {
        const charCode = e.which ? e.which : e.keyCode;
        if (e.srcElement.value == 0 && charCode == 48) {
          e.preventDefault();
        }
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          e.preventDefault();
        } else {
          return true;
        }
      },
    },
  }
</script>
