import TailwindConfig from '../tailwind.config';

export default {
  title: 'Atoms/Typography',
  argTypes: {}
};


const fontSizeTemplate = () => {
  const fontKey = Object.keys(TailwindConfig.theme.fontSize);
  const fontSizeTemplate = fontKey.reduce((result, current) => {
    result += `<div class="mb-4 text-${current}">${current}</div>`;
    return result;
  }, '');
  return fontSizeTemplate;
};

const AllTextTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      ${fontSizeTemplate()}
    </div>
  `
});

export const AllText = AllTextTemplate.bind({});
// AllButton.args = {};

const TextWithStyleTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <span class="text-h1 font-bold">Heading 1 Bold</span>
      <br />
      <span class="text-h1 font-light"> Heading 1 Light</span>
      <br />
      <span class="text-h2 italic"> Heading 2 Italic</span>
      <br />
      <span class="text-h3 underline">Heading 3 underline</span>
      <br />
      <span class="text-h4 line-through">Heading 4</span>
      <br /><br />
      <span class="text-subtitle1 text-pink-900">subtitle 1</span>
      <br />
      <span class="text-subtitle2 text-red-800">subtitle 2</span>
      <br />
      <span class="text-subtitle3 text-green-700">subtitle 3</span>
      <br /><br />
    </div>
  `
});

export const TextWithStyle = TextWithStyleTemplate.bind({});
// AllButton.args = {};
