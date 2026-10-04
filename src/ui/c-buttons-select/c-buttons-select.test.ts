import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CButtonsSelect from './c-buttons-select.vue';

const global = {
  stubs: {
    CLabel: { template: '<div><slot /></div>' },
    CTooltip: { template: '<div><slot /></div>' },
    CButton: {
      props: ['size'],
      emits: ['click'],
      template: '<button :data-size="size" @click="$emit(&quot;click&quot;)"><slot /></button>',
    },
  },
};

describe('cButtonsSelect', () => {
  it('emits the original function value used by the MAC address formatter', async () => {
    const upper = (value: string) => value.toUpperCase();
    const lower = (value: string) => value.toLowerCase();
    const options = [{ label: 'Uppercase', value: upper }, { label: 'Lowercase', value: lower }] as const;
    const wrapper = shallowMount(CButtonsSelect, { props: { options, value: upper }, global });

    await wrapper.findAll('button')[1].trigger('click');

    expect(wrapper.emitted('update:value')?.[0]?.[0]).toBe(lower);
  });

  it('accepts readonly options and keeps size reactive', async () => {
    const options = ['raw', 'json'] as const;
    const wrapper = shallowMount(CButtonsSelect, { props: { options, value: 'raw' }, global });

    expect(wrapper.get('button').attributes('data-size')).toBe('medium');
    await wrapper.setProps({ size: 'small' });
    expect(wrapper.get('button').attributes('data-size')).toBe('small');
    await wrapper.findAll('button')[1].trigger('click');
    expect(wrapper.emitted('update:value')?.[0]?.[0]).toBe('json');
  });
});
