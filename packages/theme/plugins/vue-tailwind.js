import Vue from 'vue';
import VueTailwind from 'vue-tailwind';

import TInput from 'vue-tailwind/dist/t-input';
import TButton from 'vue-tailwind/dist/t-button';

const components = {
  't-input': {
    component: TInput,
    props: {
      fixedClasses:
        'block w-full px-3 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-black placeholder-gray-400 bg-white border-gray-300 focus:border-blue-500 ',
      variants: {
        danger: 'border-red-500 placeholder-red-200 text-red-900',
        success: 'border-green-300 bg-green-50 placeholder-gray-400 text-green-900'
      }
    }
  },
  't-button': {
    component: TButton,
    props: {
      fixedClasses:
        'block px-4 py-2 transition duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600',
      variants: {
        primary: 'text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600',
        secondary: 'text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600',
        danger: 'text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600',
        success: 'text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600',
        link: 'text-blue-500 underline hover:text-blue-600',
        xs: 'px-2 py-0'
      }
    }
  }
};

Vue.use(VueTailwind, components);

