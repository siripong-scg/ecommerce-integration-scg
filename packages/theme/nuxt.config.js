import webpack from 'webpack';
import colors from 'vuetify/es5/util/colors';

const result = require('dotenv').config({
  path: process.env.NODE_ENV ? `env/.env.${process.env.NODE_ENV}` : `env/.env.development`
});

if (result.error) {
  throw result.error;
}

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  component: false,
  head: {
    titleTemplate: '%s | Mitraruma',
    title: 'Mitraruma',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Logo-Mitraruma@3x.png' }
      // {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css'}
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    '~plugins/vue-js-modal',
    { src: '~/plugins/vue-tailwind' },
    { src: '~/plugins/axios', mode: 'server', ssr: true },
    '~/plugins/auth.js',
    '~/plugins/repository.js',
    { src: '~/plugins/vue-awesome-swiper', mode: 'client' },
    '~/plugins/vuelidate'
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt',
      {
        // @core-development-only-start
        coreDevelopment: true,
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/scgcommerce', '@vue-storefront/core'],
          prod: ['@vue-storefront/scgcommerce', '@vue-storefront/core']
        }
      }
    ],
    // @core-development-only-start
    [
      '@vue-storefront/nuxt-theme',
      {
        routes: false,
        generate: {
          replace: {
            apiClient: '@vue-storefront/scgcommerce-api',
            composables: '@vue-storefront/scgcommerce'
          }
        }
      }
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/scgcommerce/nuxt', {}]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@vue-storefront/middleware/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome 1'
        },
        th: {
          welcome: 'Welcome 2'
        }
      }
    }
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()]
      })
    ]
  },
  build: {
    standalone: true,
    transpile: ['vee-validate/dist/rules'],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  tailwindcss: {
    jit: true
  },
  // router setting
  router: {
    // middleware: 'authenticate',
    extendRoutes(routes, resolve) {
      const routesToAdd = [
        {
          name: 'home-page',
          path: '/',
          component: resolve(__dirname, 'pages/homepage/index.vue')
        },
        {
          name: 'support_redirect_form_api',
          path: '/login',
          component: resolve(__dirname, 'pages/homepage/index.vue')
        },
        {
          name: 'terms-and-conditions',
          path: '/terms-and-conditions',
          component: resolve(__dirname, 'pages/policy/TermsConditions.vue')
        },
        {
          name: 'policy-privacy',
          path: '/policy-privacy',
          component: resolve(__dirname, 'pages/policy/Privacy.vue')
        }
      ];

      routesToAdd.forEach(({ name, path, component }) => {
        routes.push({
          name: name,
          path: path,
          component: component
        });
      });
    },
    scrollBehavior(_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
  // Auth setting
  auth: {
    strategies: {
      local: {
        autoFetchUser: false,
        // user: {
        //   property: false, // <--- Default "user"
        //   autoFetch: true
        // },
        endpoints: {
          login: {
            url: process.env.BACKEND_API + '/api-gateway-service/auth/login',
            method: 'post',
            propertyName: 'accessToken'
          },
          logout: {
            url: process.env.BACKEND_API + '/api-gateway-service/auth/logout',
            method: 'post'
          },
          user: {
            url: process.env.BACKEND_API + '/authentication-service/user/userinfo',
            method: 'get',
            propertyName: ''
          }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/'
    },
    plugins: [{ src: '~/plugins/axios', mode: 'server', ssr: true }, '~/plugins/auth.js']
  },
  env: {
    BACKEND_API: process.env.BACKEND_API || 'https://qa.big-th.com',
    BASE_URL: process.env.BASE_URL || 'https://qa.big-th.com',
    FACEBOOK_AUTH_URL: process.env.FACEBOOK_AUTH_URL + process.env.FB_REDIRECT_URI,
    GOOGLE_AUTH_URL: process.env.GOOGLE_AUTH_URL + process.env.GOOGLE_REDIRECT_URI
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#EB0000', //colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          red: '#EB0000',
          firebrick: '#AA0814',
          gray: '#8D8D8D',
          mistyrose: '#F7E5E5',
          blue: '#007AFF',
          lightSilver: '#E0E0E0'
        }
      }
    }
  },

  // Axios setting
  axios: {
    baseURL: process.env.BACKEND_API || 'https://qa.big-th.com',
    debug: false
    // credentials: true,
    // proxy: true
  },

  proxy: {
    '/api': {
      target: 'https://qa.bigthailand.com',
      pathRewrite: {
        '^/api': '/'
      }
    },
    '/api_2c2p_gateway': {
      target: 'https://demo2.2c2p.com/2C2PFrontEnd/SecurePayment/PaymentAuth.aspx',
      pathRewrite: {
        '^/api_2c2p_gateway': '/'
      }
    }
  }
};
