export default {
  title: 'Atoms/Button',
  argTypes: {
    // backgroundColor: { control: 'color' },
    // size: { control: { type: 'select', options: ['small', 'medium', 'large'] } }
  }
};

const AllButtonTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<button v-bind="$props">PRIMARY</button>'
});

export const AllButton = AllButtonTemplate.bind({});
AllButton.args = {
  class: 'btn',
  disabled: false
};

export const ContainedButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
     <button class="btn small">PRIMARY</button>
      <button class="btn btn-secondary small">SECONDARY</button>
      <button class="btn btn-black small">BLACK</button>

      <br />
      <br />

      <button class="btn">PRIMARY</button>
      <button class="btn btn-secondary">SECONDARY</button>
      <button class="btn btn-black">BLACK</button>

      <br />
      <br />

      <button class="btn large">PRIMARY</button>
      <button class="btn btn-secondary large">SECONDARY</button>
      <button class="btn btn-black large">BLACK</button>

      <br />
      <br />
      <button class="btn large" disabled>PRIMARY</button>
      <button class="btn btn-secondary large" disabled>SECONDARY</button>
      <button class="btn btn-black large" disabled>BLACK</button>
    </div>
  `
});

export const OutlinedButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div>
      <button class="btn outline small">PRIMARY</button>
      <button class="btn btn-secondary outline small">SECONDARY</button>
      <button class="btn btn-black outline small">BLACK</button>

      <br />
      <br />

      <button class="btn outline">PRIMARY</button>
      <button class="btn btn-secondary outline">SECONDARY</button>
      <button class="btn btn-black outline">BLACK</button>

      <br />
      <br />

      <button class="btn outline large">PRIMARY</button>
      <button class="btn btn-secondary outline large">SECONDARY</button>
      <button class="btn btn-black outline large">BLACK</button>

      <br />
      <br />

      <button class="btn outline large" disabled>PRIMARY</button>
      <button class="btn btn-secondary outline large" disabled>SECONDARY</button>
      <button class="btn btn-black outline large" disabled>BLACK</button>
    </div>
  `
});
