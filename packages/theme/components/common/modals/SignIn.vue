<template>
  <modal
    name="SignInModal"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    :width="width"
    height="auto"
  >
    <v-card>
      <v-container class="pa-0 ma-0">
        <v-row no-gutters>
          <v-col v-show="$vuetify.breakpoint.smAndUp" lg="6" sm="6" class="pa-0 point-images">
            <v-img
              class="max-w-full h-full"
              width="100%"
              :src="require(`~/assets/images/authentication/point/Group 9990.svg`)"
            />
          </v-col>
          <v-col lg="6" sm="6" xs="12">
            <v-card-title>
              <v-row no-gutters>
                <v-col :cols="6">
                  <h4 class="text-sign-in">Sign In</h4>
                </v-col>
                <v-col :cols="6">
                  <v-btn style="float: right" rounded outlined @click="openRegisterModal">register</v-btn>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-form
                id="check-login-form"
                method="POST"
                enctype="text/plain"
                @submit.prevent="submit"
                @keyup.native.enter="submit"
              >
                <v-card flat>
                  <v-card-text class="pa-1 pb-0 mt-4">
                    <span class="text-field-title">Mobile Number or Email<span class="red--text">&nbsp;*</span> </span>
                    <v-text-field
                      v-model="$v.loginFormData.username.$model"
                      placeholder="Mobile Number or Email"
                      solo
                      :error-messages="requiredErrorMsg('username')"
                      @input="$v.loginFormData.username.$touch()"
                      @blur="$v.loginFormData.username.$touch()"
                    >
                    </v-text-field>
                    <span class="text-field-title">Password<span class="red--text">&nbsp;*</span> </span>
                    <v-text-field
                      v-model="$v.loginFormData.password.$model"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="passwordShow ? 'text' : 'password'"
                      name="input-10-1"
                      placeholder="Password"
                      solo
                      :error-messages="passwordErrorMsg"
                      @click:append="passwordShow = !passwordShow"
                      @input="$v.loginFormData.password.$touch()"
                      @blur="$v.loginFormData.password.$touch()"
                    />
                  </v-card-text>
                </v-card>
                <div class="flex justify-end w-full mb-4">
                  <a class="text-decoration-none forgot-password" @click="openForgotPasswordModal"
                    ><span color="bule">Forgot your Password ?</span></a
                  >
                </div>
                <!-- <v-row class="social-login-container" no-gutters>
                  <v-col :cols="6" class="col-self-center">
                    <v-checkbox
                      v-model="login.staySignedIn"
                      label="Stay Signed in"
                      color="gray"
                    />
                  </v-col>
                </v-row> -->
                <v-btn form="check-login-form" type="submit" color="primary" rounded block>Sign In</v-btn>
              </v-form>

              <v-container>
                <v-row align="center" class="mb-2 mt-2">
                  <v-divider />
                  <span class="pl-2 pr-2">Or Contiue with</span>
                  <v-divider />
                </v-row>
                <v-row no-gutters>
                  <v-col :cols="6" class="col-self-center pr-1" align="right">
                    <v-btn outlined rounded width="95%" @click="googleLogin">
                      <v-img max-width="20px" class="mr-1" :src="require(`~/assets/images/logo/socials/google.svg`)" />
                      Google
                    </v-btn>
                  </v-col>
                  <v-col :cols="6" class="col-self-center">
                    <v-btn outlined rounded width="95%" @click="facebookLogin">
                      <v-icon class="pr-1" color="blue">mdi-facebook</v-icon>
                      Facebook
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col :cols="12">
                    <div class="text--primary" style="font-size: 12px">
                      By Clicking Sign in or Continue with Google <br />
                      and Facebook, you agree to Mitraruma`s
                      <a href="/terms-and-conditions" class="text-decoration-none link-path"> Terms & Conditions </a>and
                      <a href="/policy-privacy" class="text-decoration-none link-path">Privacy Policy</a>.
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { useUser } from '@vue-storefront/scgcommerce';
import { onMounted } from '@vue/composition-api';

export default {
  name: 'SignInModal',
  setup() {
    const { load, login } = useUser();
    // console.log({ search, categories });
    //
    onMounted(async () => {
      await login({ username: 'test', password: 'test' });
      // try {
      //   await logIn({ username: 'test', password: 'test'});
      // } catch (error) {
      //   console.log(error);
      // }
    });

    return {};
  },
  data() {
    return {
      tabs: null,
      passwordShow: false,
      apiMsgError: '',
      rules: {
        required: (value) => !!value || 'Required.'
      },
      loginFormData: {
        username: '',
        password: ''
      }
    };
  },
  validations: {
    loginFormData: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    login() {
      return {
        mobileCode: '+66',
        mobileNo: this.isEmail ? '' : this.loginFormData.username,
        mobilePassword: this.isEmail ? '' : this.loginFormData.password,
        userEmail: this.isEmail ? this.loginFormData.username : '',
        emailPassword: this.isEmail ? this.loginFormData.password : '',
        staySignedIn: false
      };
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 400;
        case 'sm':
          return 600;
        case 'md':
          return 600;
        case 'lg':
          return 700;
        case 'xl':
          return 700;
      }
    },
    passwordErrorMsg() {
      return this.apiMsgError != '' ? this.apiMsgError : this.requiredErrorMsg('password');
    },
    isEmail() {
      const regex = /^[0-9]*$/;
      return !regex.test(this.loginFormData.username);
    }
  },
  methods: {
    requiredErrorMsg(name) {
      const errors = [];
      if (!this.$v.loginFormData[name].$dirty) return errors;
      !this.$v.loginFormData[name].required && errors.push('This field is required');
      return errors;
    },
    async submit() {
      this.$v.loginFormData.$touch();
      if (!this.$v.loginFormData.$invalid) {
        this.$nuxt.$loading.start();
        const loginData = {
          lang: 'th',
          userType: 'BUYER',
          orgIdfier: 'scg',
          preferredLanguage: 'th',
          staySignedIn: this.login.staySignedIn
        };
        if (this.tabs === 'mobile-tab') {
          loginData.phoneNo = this.login.mobileCode + this.login.mobileNo;
          loginData.password = this.login.mobilePassword;
        } else {
          loginData.useremail = this.login.userEmail;
          loginData.password = this.login.emailPassword;
        }

        await this.$auth
          .loginWith('local', { data: loginData })
          .then((res) => {
            if (!res.data.accessToken) {
              this.apiMsgError = 'Email or Mobile number and Password is Incorrect';
              this.$axios.setToken(false);
              this.$nuxt.$loading.finish();
            } else {
              this.apiMsgError = '';
              this.$auth.setUser(res.data);
              this.closeModal();
            }
          })
          .catch((err) => {
            console.log('err:' + err);
            if (this.login.mobileNo === '') {
              this.apiMsgError = 'Email and Password is Incorrect';
            } else {
              this.apiMsgError = 'Mobile number and Password is Incorrect';
            }
          });
      }
    },

    async facebookLogin() {
      const redirectUrl = process.env.FACEBOOK_AUTH_URL;
      location.replace(redirectUrl);
    },

    async googleLogin() {
      const redirectUrl = process.env.GOOGLE_AUTH_URL;
      location.replace(redirectUrl);
    },

    closeModal() {
      this.$modal.hide('SignInModal');
      if (this.$store.state.user.beforeLogin) {
        this.$router.push(this.$store.state.user.beforeLogin);
        setTimeout(() => {
          this.$nuxt.$loading.finish();
          this.$auth.redirect('/');
        }, 500);
      } else {
        this.$nuxt.$loading.finish();
        this.$auth.redirect('/');
      }
    },

    openRegisterModal() {
      this.$modal.hide('SignInModal');
      this.$modal.show('RegisterModal');
    },

    openForgotPasswordModal() {
      this.$modal.hide('SignInModal');
      this.$modal.show('ForgotPasswordModal', { isTab: this.tabs });
    },

    forceNumberInput(e) {
      const charCode = e.which ? e.which : e.keyCode;
      if (e.srcElement.value == 0 && charCode == 48) {
        e.preventDefault();
      }
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        e.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.forgot-password {
  color: #007aff;
  float: right;
}

.link-path {
  color: #007aff;
}

.col-self-center {
  align-self: center;
  font-size: 14px;
}

.text-field-title {
  color: #6f6f6f;
  font-size: 14px;
  font-weight: bold;

  .optional {
    font-weight: normal;
  }
}
</style>
