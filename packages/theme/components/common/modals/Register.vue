<template>
  <modal
    name="RegisterModal"
    :min-width="200"
    :min-height="200"
    :pivot-y="0.5"
    :adaptive="true"
    :scrollable="true"
    :reset="true"
    height="auto"
    :width="width"
  >
    <v-card>
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col
            v-show="$vuetify.breakpoint.smAndUp"
            lg="6"
            sm="6"
            class="pa-0 point-images"
          >
            <v-img
              class="max-w-full h-full"
              width="100%"
              :src="
                require(`~/assets/images/authentication/point/Group 9990.svg`)
              "
            />
          </v-col>
          <v-col lg="6" sm="6" xs="12">
            <v-card-title>
              <v-row no-gutters>
                <v-col lg="6" md="12">
                  <h4 class="text-sign-in">Register</h4>
                </v-col>
                <v-col lg="6" md="12">
                  <v-btn
                    style="float: right"
                    rounded
                    outlined
                    @click="openSignInModal"
                    >Sign in</v-btn
                  >
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
                    <span class="text-field-title"
                      >Mobile number<span class="red--text">&nbsp;*</span>
                    </span>
                    <v-text-field
                      v-model="$v.registerFormData.mobileNo.$model"
                      class="mobile-number-input"
                      placeholder="Mobile Number"
                      maxlength="9"
                      outlined
                      required
                      :error-messages="requiredErrorMsg('mobileNo')"
                      @keypress="forceNumberInput($event)"
                      @input="$v.registerFormData.mobileNo.$touch()"
                      @blur="$v.registerFormData.mobileNo.$touch()"
                    >
                      <template #prepend-inner>
                        <v-btn
                          disabled
                          depressed
                          tile
                          color="lightSilver"
                          class="ma-0"
                        >
                          +62
                        </v-btn>
                      </template>
                    </v-text-field>
                    <span class="text-field-title"
                      >Password<span class="red--text">&nbsp;*</span>
                    </span>
                    <v-text-field
                      v-model="$v.registerFormData.password.$model"
                      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="passwordShow ? 'text' : 'password'"
                      name="input-10-1"
                      placeholder="Password"
                      outlined
                      required
                      :error-messages="passwordErrorMsg"
                      @click:append="passwordShow = !passwordShow"
                      @input="$v.registerFormData.password.$touch()"
                      @blur="$v.registerFormData.password.$touch()"
                    />
                    <span class="text-field-title"
                      >Email <span class="optional">(optional)</span></span
                    >
                    <v-text-field
                      v-model="$v.registerFormData.email.$model"
                      :error-messages="emailErrorMsg"
                      placeholder="Email"
                      outlined
                      required
                      @input="$v.registerFormData.email.$touch()"
                      @blur="$v.registerFormData.email.$touch()"
                    />
                    <v-row>
                      <v-col cols="6" class="pb-0">
                        <span class="text-field-title"
                          >Name<span class="red--text">&nbsp;*</span>
                        </span>
                        <v-text-field
                          v-model="$v.registerFormData.name.$model"
                          :error-messages="requiredErrorMsg('name')"
                          placeholder="Name"
                          outlined
                          required
                          @input="$v.registerFormData.name.$touch()"
                          @blur="$v.registerFormData.name.$touch()"
                        />
                      </v-col>
                      <v-col cols="6" class="pb-0">
                        <span class="text-field-title"
                          >Last name<span class="red--text">&nbsp;*</span>
                        </span>
                        <v-text-field
                          v-model="$v.registerFormData.lastName.$model"
                          :error-messages="requiredErrorMsg('lastName')"
                          placeholder="Last Name"
                          outlined
                          required
                          @input="$v.registerFormData.lastName.$touch()"
                          @blur="$v.registerFormData.lastName.$touch()"
                        />
                      </v-col>
                    </v-row>
                    <div>
                      <span class="text-field-title"
                        >User type<span class="red--text">&nbsp;*</span>
                      </span>
                      <v-select
                        v-model="$v.registerFormData.userTypes.$model"
                        :error-messages="userTypesErrorMsg"
                        :items="userTypes"
                        placeholder="User type"
                        outlined
                      />
                    </div>
                  </v-card-text>
                </v-card>
                <v-btn
                  form="check-login-form"
                  color="primary"
                  type="submit"
                  rounded
                  block
                  >Register</v-btn
                >
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
                      <v-img
                        max-width="20px"
                        class="mr-1"
                        :src="
                          require(`~/assets/images/logo/socials/google.svg`)
                        "
                      />
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
                      By clicking Register or Continue with Google <br />
                      and Facebook, you agree to Mitraruma`s
                      <a
                        href="/terms-and-conditions"
                        class="text-decoration-none link-path"
                      >
                        Terms & Conditions </a
                      >and
                      <a
                        href="/policy-privacy"
                        class="text-decoration-none link-path"
                        >Privacy Policy</a
                      >.
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
import { required, email } from 'vuelidate/lib/validators'

const spacialCharactor = (value) => {
  const regex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
  return regex.test(value)
}

export default {
  name: 'RegisterModal',
  data() {
    return {
      tabs: null,
      passwordShow: false,
      apiMsgError: '',
      rules: {
        required: (value) => !!value || 'Required.',
      },
      userTypes: ['Customer', 'Applicator'],
      registerFormData: {
        mobileNo: '',
        email: '',
        password: '',
        name: '',
        lastName: '',
        userTypes: '',
      },
    }
  },
  validations: {
    registerFormData: {
      mobileNo: {
        required,
      },
      password: {
        required,
        spacialCharactor,
      },
      email: {
        email,
      },
      name: {
        required,
      },
      lastName: {
        required,
      },
      userTypes: {
        required,
      },
    },
  },
  computed: {
    register() {
      const register = {
        ...this.registerFormData,

        subscribeNewsletters: false,
        sharePersonalInfo: false,
        staySignedIn: false,
        otherOccupation: null,
        lang: 'th',
        occupation: 'Logistics Fleet',
        orgIdfier: 'scg',
        preferredLanguage: 'th',
        userType: 'BUYER',
        fullName: '',
      }

      return register
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 400
        case 'sm':
          return 600
        case 'md':
          return 600
        case 'lg':
          return 700
        case 'xl':
          return 700
      }
    },
    emailErrorMsg() {
      const errors = []
      if (
        !this.$v.registerFormData.email.$dirty ||
        this.$v.registerFormData.email.email
      )
        return errors
      !this.$v.registerFormData.email.email &&
        errors.push('Please enter a valid email.')
      return errors
    },
    passwordErrorMsg() {
      const errors = []
      // if (!this.$v.registerFormData.password.$dirty) return errors
      // !this.$v.registerFormData.password.required &&
      //   errors.push('This field is required')
      // !this.$v.registerFormData.password.spacialCharactor &&
      //   errors.push(
      //     'Password is case sensitive and must be at least 8 characters long'
      //   )
      return errors
    },
    userTypesErrorMsg() {
      return this.apiMsgError != ''
        ? this.apiMsgError
        : this.requiredErrorMsg('userTypes')
    },
  },
  methods: {
    requiredErrorMsg(name) {
      const errors = []
      if (!this.$v.registerFormData[name].$dirty) return errors
      !this.$v.registerFormData[name].required &&
        errors.push('This field is required')
      return errors
    },
    openSignInModal() {
      this.$modal.hide('RegisterModal')
      this.$modal.show('SignInModal')
    },

    async submit() {
      this.$v.registerFormData.$touch()
      if (!this.$v.registerFormData.$invalid) {
        this.apiMsgError = ''
        const registerData = {
          // customFields: undefined
          lang: 'th',
          occupation: 'Logistics Fleet',
          orgIdfier: 'scg',
          phoneCountryCode: '+66',
          preferredLanguage: 'th',
          userType: 'BUYER',
          staySignedIn: false,
        }
        registerData.fullName = `${
          this.register.name + ' ' + this.register.lastName
        }`
        registerData.phoneNo = `${
          registerData.phoneCountryCode + this.register.mobileNo
        }`
        registerData.password = this.register.password
        // registerData.userType = this.register.mobileUserTypes
        // for delete account but waiting 30 days
        // this.deleteUser(1941);
        await this.$repositories.user
          .signup(registerData)
          .then((res) => {
            console.log(res)
            if (res.error == null) {
              const login = {
                lang: 'th',
                userType: 'BUYER',
                occupation: 'Logistics Fleet',
                orgIdfier: 'scg',
                fullName: registerData.fullName,
                phoneCountryCode: registerData.phoneCountryCode,
                phoneNo: registerData.phoneNo,
                useremail: registerData.userEmail,
                password: registerData.password,
                preferredLanguage: 'th',
                staySignedIn: false,
              }
              this.$repositories.user
                .login(login)
                .then((user) => {
                  if (!user.error) {
                    this.$auth.setToken('local', `Bearer ${user.accessToken}`)
                    this.$axios.setToken(user.accessToken, 'Bearer')
                    this.$repositories.user
                      .getProfile(user)
                      .then((userProfile) => {
                        this.userProfile = userProfile
                        this.closeModal()
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              this.apiMsgError = res.error
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

    closeModal() {
      this.$modal.hide('RegisterModal')
      if (this.$store.state.user.beforeLogin) {
        this.$router.push(this.$store.state.user.beforeLogin)
        location.reload()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      } else {
        location.reload()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      }
    },

    async deleteUser(userId) {
      this.register.userId = userId
      return await this.$repositories.user
        .deleteUserRequest(this.register)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    async facebookLogin() {
      const redirectUrl = process.env.FACEBOOK_AUTH_URL
      location.replace(redirectUrl)
    },

    async googleLogin() {
      const redirectUrl = process.env.GOOGLE_AUTH_URL
      location.replace(redirectUrl)
    },

    forceNumberInput(e) {
      const charCode = e.which ? e.which : e.keyCode
      if (e.srcElement.value == 0 && charCode == 48) {
        e.preventDefault()
      }
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        e.preventDefault()
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.forgot-password {
  color: #007aff;
  float: right;
}

.v-dialog {
  width: 60%;
}

.link-path {
  color: #007aff;
}

.col-self-center {
  align-self: center;
  font-size: 14px;
}

.mobile-number-input {
  ::v-deep .v-input__slot {
    padding-left: 0px !important;
  }

  ::v-deep .v-input__prepend-inner {
    margin: 0px !important;
    height: 56px;

    button {
      height: 100%;
    }
  }
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
