import { theme } from './theme';

test('theme exposes lime color', () => {
  expect(theme.colors.lime).toBe('#D1E231');
});
