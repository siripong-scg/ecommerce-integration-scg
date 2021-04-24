<template>
  <modal
    name="SocialLoginModal"
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
            <v-card-title class="font-medium justify-center">Login with {{socialProvider()}}
            </v-card-title>
            <v-card-subtitle class="font-normal justify-center" align="center">
              <p class="justify-center">Please enter your mobile number for complete registration</p>
            </v-card-subtitle>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="socialLogin.mobileNo"
                  maxlength="9"
                  @keypress="forceNumberInput($event)"
                  placeholder="Mobile Number"
                  :error-messages="apiMsgError"
                  solo
                >
                  <template v-slot:prepend-inner>
                    <v-btn
                      disabled
                      depressed
                      tile
                      color="lightSilver"
                      class="ma-0">
                      +62
                    </v-btn>

                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" align="center">
                <v-btn color="primary" width="150px" @click="registerSocial" rounded>Register</v-btn>
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
    name: 'SocialLoginModal',
    data() {
      return {
        apiMsgError: '',
        rules: {
          required: value => !!value || 'Required.',
        },
      }
    },
    computed: {
      socialLogin() {
        return {
          mobileCode: '+66',
          mobileNo: '',
          email: '',
        };
      },
    },
    methods: {
      async registerSocial() {
        const hash = require('object-hash');
        const password = hash(
          this.$route.query.email + '0' + this.socialLogin.mobileNo,
        );
        if (this.socialLogin.mobileNo && this.socialLogin.mobileNo.length === 9) {
          const requestOtpData = {
            lang: 'th',
            userType: 'BUYER',
            orgIdfier: 'scg',
            locale: 'th',
            phone: this.socialLogin.mobileCode + this.socialLogin.mobileNo,
            email: this.$route.query.email ? this.$route.query.email : this.socialLogin.email,
            type: 'signup',
            otpTemplate: 'buyer_signup_otp_message',
            socialId: this.$route.query.socialId,
            authProvider: this.$route.query.authProvider,
            userId: '',
            userParams: {
              buyerName: this.$route.query.name,
            },
          };
          const socialRegisterData = {
            registerType: 'social',
            lang: 'th',
            userType: 'BUYER',
            orgIdfier: 'scg',
            fullName: this.$route.query.name,
            phoneNo: requestOtpData.phone,
            useremail: requestOtpData.email,
            password: password,
            preferredLanguage: 'th',
            staySignedIn: false,
            phoneCountryCode: this.socialLogin.mobileCode,
            socialId: this.$route.query.socialId,
            authProvider: this.$route.query.authProvider,
            action: 'signup',
            userId: '',
            customFields: {
              cookieEnabled: true,
            },
          };
          await this.$repositories.user
            .socialRequestOTP(requestOtpData)
            .then((res) => {
              socialRegisterData.requestOtpData = requestOtpData
              socialRegisterData.otpResponse = res
              this.$modal.hide('SocialLoginModal')
              this.$modal.show('VerifyOtpModal', {
                verifyParams: socialRegisterData
              });
            })
            .catch((err) => {
              console.log(err);
            });

        } else {
          this.apiMsgError = 'Please enter a valid mobile number.';
        }
      },
      socialProvider() {
        const value = `${this.$route.query.authProvider}`
        return value.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
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
    }
  }
</script>
