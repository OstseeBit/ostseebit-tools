import _ from 'lodash';

export { getCharsetLength, getPasswordCrackTimeEstimation };

type TranslateFn = (key: string) => string;

function prettifyExponentialNotation(exponentialNotation: number) {
  const [base, exponent] = exponentialNotation.toString().split('e');
  const baseAsNumber = Number.parseFloat(base);
  const prettyBase = baseAsNumber % 1 === 0 ? baseAsNumber.toLocaleString() : baseAsNumber.toFixed(2);
  return exponent ? `${prettyBase}e${exponent}` : prettyBase;
}

function getHumanFriendlyDuration({ seconds, t }: { seconds: number, t: TranslateFn }) {
  if (seconds <= 0.001) {
    return t('tools.password-strength-analyser.durationInstantly');
  }

  if (seconds <= 1) {
    return t('tools.password-strength-analyser.durationLessThanSecond');
  }

  const timeUnits = [
    { singular: t('tools.password-strength-analyser.unitMillenniumSingular'), secondsInUnit: 31536000000, format: prettifyExponentialNotation, plural: t('tools.password-strength-analyser.unitMillenniumPlural') },
    { singular: t('tools.password-strength-analyser.unitCenturySingular'), secondsInUnit: 3153600000, plural: t('tools.password-strength-analyser.unitCenturyPlural') },
    { singular: t('tools.password-strength-analyser.unitDecadeSingular'), secondsInUnit: 315360000, plural: t('tools.password-strength-analyser.unitDecadePlural') },
    { singular: t('tools.password-strength-analyser.unitYearSingular'), secondsInUnit: 31536000, plural: t('tools.password-strength-analyser.unitYearPlural') },
    { singular: t('tools.password-strength-analyser.unitMonthSingular'), secondsInUnit: 2592000, plural: t('tools.password-strength-analyser.unitMonthPlural') },
    { singular: t('tools.password-strength-analyser.unitWeekSingular'), secondsInUnit: 604800, plural: t('tools.password-strength-analyser.unitWeekPlural') },
    { singular: t('tools.password-strength-analyser.unitDaySingular'), secondsInUnit: 86400, plural: t('tools.password-strength-analyser.unitDayPlural') },
    { singular: t('tools.password-strength-analyser.unitHourSingular'), secondsInUnit: 3600, plural: t('tools.password-strength-analyser.unitHourPlural') },
    { singular: t('tools.password-strength-analyser.unitMinuteSingular'), secondsInUnit: 60, plural: t('tools.password-strength-analyser.unitMinutePlural') },
    { singular: t('tools.password-strength-analyser.unitSecondSingular'), secondsInUnit: 1, plural: t('tools.password-strength-analyser.unitSecondPlural') },
  ];

  return _.chain(timeUnits)
    .map(({ singular, secondsInUnit, plural, format = _.identity }) => {
      const quantity = Math.floor(seconds / secondsInUnit);
      seconds %= secondsInUnit;

      if (quantity <= 0) {
        return undefined;
      }

      const formattedQuantity = format(quantity);
      return `${formattedQuantity} ${quantity > 1 ? plural : singular}`;
    })
    .compact()
    .take(2)
    .join(', ')
    .value();
}

function getPasswordCrackTimeEstimation({ password, t, guessesPerSecond = 1e9 }: { password: string, t: TranslateFn, guessesPerSecond?: number }) {
  const charsetLength = getCharsetLength({ password });
  const passwordLength = password.length;

  const entropy = password === '' ? 0 : Math.log2(charsetLength) * passwordLength;

  const secondsToCrack = 2 ** entropy / guessesPerSecond;

  const crackDurationFormatted = getHumanFriendlyDuration({ seconds: secondsToCrack, t });

  const score = Math.min(entropy / 128, 1);

  return {
    entropy,
    charsetLength,
    passwordLength,
    crackDurationFormatted,
    secondsToCrack,
    score,
  };
}

function getCharsetLength({ password }: { password: string }) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /\W|_/.test(password);

  let charsetLength = 0;

  if (hasLowercase) {
    charsetLength += 26;
  }
  if (hasUppercase) {
    charsetLength += 26;
  }
  if (hasDigits) {
    charsetLength += 10;
  }
  if (hasSpecialChars) {
    charsetLength += 32;
  }

  return charsetLength;
}
