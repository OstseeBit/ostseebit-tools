<script setup lang="ts">
import type { SignatureInfo } from '../pdf-signature-checker.types';

const props = defineProps<{ signature: SignatureInfo }>();
const { signature } = toRefs(props);

const tableHeaders = {
  validityPeriod: 'Validity period',
  issuedBy: 'Issued by',
  issuedTo: 'Issued to',
  pemCertificate: 'PEM certificate',
};

const certs = computed(() => signature.value.meta.certs.map((certificate, index) => ({
  ...certificate,
  validityPeriod: {
    notBefore: new Date(certificate.validityPeriod.notBefore).toLocaleString(),
    notAfter: new Date(certificate.validityPeriod.notAfter).toLocaleString(),
  },
  certificateName: `Certificate ${index + 1}`,
})),
);
</script>

<template>
  <div flex flex-col gap-2>
    <c-table :data="certs" :headers="tableHeaders">
      <template #validityPeriod="{ row }">
        <c-key-value-list
          :items="[{
            label: 'Not before',
            value: row.validityPeriod.notBefore,
          }, {
            label: 'Not after',
            value: row.validityPeriod.notAfter,
          }]"
        />
      </template>

      <template #issuedBy="{ row }">
        <c-key-value-list
          :items="[{
            label: 'Common name',
            value: row.issuedBy.commonName,
          }, {
            label: 'Organization name',
            value: row.issuedBy.organizationName,
          }, {
            label: 'Country name',
            value: row.issuedBy.countryName,
          }, {
            label: 'Locality name',
            value: row.issuedBy.localityName,
          }, {
            label: 'Organizational unit name',
            value: row.issuedBy.organizationalUnitName,
          }, {
            label: 'State or province name',
            value: row.issuedBy.stateOrProvinceName,
          }]"
        />
      </template>

      <template #issuedTo="{ row }">
        <c-key-value-list
          :items="[{
            label: 'Common name',
            value: row.issuedTo.commonName,
          }, {
            label: 'Organization name',
            value: row.issuedTo.organizationName,
          }, {
            label: 'Country name',
            value: row.issuedTo.countryName,
          }, {
            label: 'Locality name',
            value: row.issuedTo.localityName,
          }, {
            label: 'Organizational unit name',
            value: row.issuedTo.organizationalUnitName,
          }, {
            label: 'State or province name',
            value: row.issuedTo.stateOrProvinceName,
          }]"
        />
      </template>

      <template #pemCertificate="{ row }">
        <c-modal-value :value="row.pemCertificate" label="View PEM cert">
          <template #value>
            <div break-all text-xs>
              {{ row.pemCertificate }}
            </div>
          </template>
        </c-modal-value>
      </template>
    </c-table>
  </div>
</template>
