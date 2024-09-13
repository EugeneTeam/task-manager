import { faker } from '@faker-js/faker';

export const getRandomValue = (values: string | number[]): string | number => {
  const index = faker.number.int({ min: 0, max: values.length - 1 });

  return values[index];
};
