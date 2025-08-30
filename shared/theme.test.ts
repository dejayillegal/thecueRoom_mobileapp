import { theme } from './theme';

test('theme has lime primary', () => {
  expect(theme.colors.primary).toBe('#D1FF3D');
});
