import { sum } from '../src/utils/sum';

test('sum adds numbers', () => {
  expect(sum(2, 5)).toBe(7);
});
