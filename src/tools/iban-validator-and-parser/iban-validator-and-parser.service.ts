import { ValidationErrorsIBAN } from 'ibantools';

export { getFriendlyErrors };

type TranslateFn = (key: string) => string;

function getIbanErrorToMessage(t: TranslateFn) {
  return {
    [ValidationErrorsIBAN.NoIBANProvided]: t('tools.iban-validator-and-parser.errorNoIban'),
    [ValidationErrorsIBAN.NoIBANCountry]: t('tools.iban-validator-and-parser.errorNoIbanCountry'),
    [ValidationErrorsIBAN.WrongBBANLength]: t('tools.iban-validator-and-parser.errorWrongBbanLength'),
    [ValidationErrorsIBAN.WrongBBANFormat]: t('tools.iban-validator-and-parser.errorWrongBbanFormat'),
    [ValidationErrorsIBAN.ChecksumNotNumber]: t('tools.iban-validator-and-parser.errorChecksumNotNumber'),
    [ValidationErrorsIBAN.WrongIBANChecksum]: t('tools.iban-validator-and-parser.errorWrongIbanChecksum'),
    [ValidationErrorsIBAN.WrongAccountBankBranchChecksum]: t('tools.iban-validator-and-parser.errorWrongAccountBankBranchChecksum'),
    [ValidationErrorsIBAN.QRIBANNotAllowed]: t('tools.iban-validator-and-parser.errorQrIbanNotAllowed'),
  };
}

function getFriendlyErrors(errorCodes: ValidationErrorsIBAN[], t: TranslateFn) {
  const ibanErrorToMessage = getIbanErrorToMessage(t);
  return errorCodes.map(errorCode => ibanErrorToMessage[errorCode]).filter(Boolean);
}
