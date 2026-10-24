<script setup lang="ts">
import type { SignatureInfo } from '../pdf-signature-checker.types';

const props = defineProps<{ signature: SignatureInfo }>();
const { signature } = toRefs(props);

const { t, locale } = useI18n();

const tableHeaders = computed(() => ({
  validityPeriod: t('tools.pdf-signature-checker.validityPeriod'),
  issuedBy: t('tools.pdf-signature-checker.issuedBy'),
  issuedTo: t('tools.pdf-signature-checker.issuedTo'),
  pemCertificate: t('tools.pdf-signature-checker.pemCertificate'),
}));

const certs = computed(() => signature.value.meta.certs.map(certificate => ({
  ...certificate,
  validityPeriod: {
    notBefore: new Date(certificate.validityPeriod.notBefore).toLocaleString(locale.value),
    notAfter: new Date(certificate.validityPeriod.notAfter).toLocaleString(locale.value),
  },
})),
);
</script>

<template>
  <div flex flex-col gap-2>
    <c-table :data="certs" :headers="tableHeaders">
      <template #validityPeriod="{ row }">
        <c-key-value-list
          :items="[{
            label: t('tools.pdf-signature-checker.notBefore'),
            value: row.validityPeriod.notBefore,
          }, {
            label: t('tools.pdf-signature-checker.notAfter'),
            value: row.validityPeriod.notAfter,
          }]"
        />
      </template>

      <template #issuedBy="{ row }">
        <c-key-value-list
          :items="[{
            label: t('tools.pdf-signature-checker.commonName'),
            value: row.issuedBy.commonName,
          }, {
            label: t('tools.pdf-signature-checker.organizationName'),
            value: row.issuedBy.organizationName,
          }, {
            label: t('tools.pdf-signature-checker.countryName'),
            value: row.issuedBy.countryName,
          }, {
            label: t('tools.pdf-signature-checker.localityName'),
            value: row.issuedBy.localityName,
          }, {
            label: t('tools.pdf-signature-checker.organizationalUnitName'),
            value: row.issuedBy.organizationalUnitName,
          }, {
            label: t('tools.pdf-signature-checker.stateOrProvinceName'),
            value: row.issuedBy.stateOrProvinceName,
          }]"
        />
      </template>

      <template #issuedTo="{ row }">
        <c-key-value-list
          :items="[{
            label: t('tools.pdf-signature-checker.commonName'),
            value: row.issuedTo.commonName,
          }, {
            label: t('tools.pdf-signature-checker.organizationName'),
            value: row.issuedTo.organizationName,
          }, {
            label: t('tools.pdf-signature-checker.countryName'),
            value: row.issuedTo.countryName,
          }, {
            label: t('tools.pdf-signature-checker.localityName'),
            value: row.issuedTo.localityName,
          }, {
            label: t('tools.pdf-signature-checker.organizationalUnitName'),
            value: row.issuedTo.organizationalUnitName,
          }, {
            label: t('tools.pdf-signature-checker.stateOrProvinceName'),
            value: row.issuedTo.stateOrProvinceName,
          }]"
        />
      </template>

      <template #pemCertificate="{ row }">
        <c-modal-value :value="row.pemCertificate" :label="t('tools.pdf-signature-checker.viewPemCert')">
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
