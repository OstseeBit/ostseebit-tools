const random = () => Math.random();

const randFromArray = (array: unknown[]) => array[Math.floor(random() * array.length)];

const randIntFromInterval = (min: number, max: number) => Math.floor(random() * (max - min) + min);

const generateRandomId = () => `id-${random().toString(36).substring(2, 12)}`;

export {
  generateRandomId,
  randFromArray,
  randIntFromInterval,
  random,
};
