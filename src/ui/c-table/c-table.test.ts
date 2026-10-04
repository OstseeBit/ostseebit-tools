import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import CTable from './c-table.vue';

describe('cTable', () => {
  it('passes the original row and cell value to named slots', () => {
    const certificate = { pemCertificate: 'PEM', issuedBy: { commonName: 'Issuer' } };
    const wrapper = mount(CTable<typeof certificate>, {
      props: { data: [certificate], headers: { issuedBy: 'Issuer' } },
      slots: {
        issuedBy: ({ row, value }) => {
          expect(row).toEqual(certificate);
          expect(value).toEqual(certificate.issuedBy);
          return h('span', row.issuedBy.commonName);
        },
      },
    });

    expect(wrapper.get('td').text()).toBe('Issuer');
  });
});
