const taiwindForm = require('@tailwindcss/forms');
const pxToRem = (px, base = 16) => `${px / base}rem`;

const fontSize = {
  h1: pxToRem(36),
  h2: pxToRem(28),
  h3: pxToRem(24),
  h4: pxToRem(20),
  h5: pxToRem(16),
  h6: pxToRem(12),
  subtitle1: pxToRem(20),
  subtitle2: pxToRem(16),
  subtitle3: pxToRem(12),
  body1: pxToRem(20),
  body2: pxToRem(16),
  body3: pxToRem(12)
};

const colors = {
  red: '#EB0000',
  fireBrick: '#AA0814',
  mistyRose: '#F7E5E5',
  slateGray1: '#818A91',
  slateGray2: '#61686D',
  white: '#FFFFFF',
  blue: '#007AFF',
  navyBlue: '#1155CC',
  green: '#07B53B',
  greenLeaf: '#05882C',
  lightGreen: '#CDF0D8',
  orange: '#FBA422',
  yellow: '#FFD60A',
  lightYellow: '#FEFFE6',
  black: '#020202',
  dark: '#393939',
  drakGray: '#525252',
  dimGray: '#6F6F6F',
  gray: '#8D8D8D',
  lightGray: '#A8A8A8',
  silver: '#C6C6C6',
  lightSilver: '#E0E0E0',
  whiteSmoke: '#F0F0F0'
};

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      'node_modules/vue-tailwind/dist/*.js'
    ]
  },
  darkMode: false,
  theme: {
    fontSize,
    colors,
    extend: {}
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      textColor: ['disabled'],
      backgroundColor: ['disabled', 'active'],
      borderColor: ['disabled', 'active']
      // outline: ['active', 'focus']
    }
  },
  plugins: [taiwindForm]
};
