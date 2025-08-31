import { theme } from './theme';

test('theme exposes background color', () => {
  expect(theme.colors.background).toBe('#0B0F1A');
});
