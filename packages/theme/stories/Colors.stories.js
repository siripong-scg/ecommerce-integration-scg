import TailwindConfig from '../tailwind.config';

export default {
  title: 'Atoms/Colors',
  argTypes: {}
};

const colorStringTemplate = () => {
  const colorKey = Object.keys(TailwindConfig.theme.colors);
  const colorTemplate = colorKey.reduce((result, current) => {
    result += `<div class="m-3 inline-block text-center text-body3"><div class="w-32 px-5 py-12 bg-${current}" />${current}</div>`;
    return result;
  }, '');
  return colorTemplate;
};

const ColorsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      ${colorStringTemplate()}
    </div>
  `
});

export const Colors = ColorsTemplate.bind({});
// AllButton.args = {};
