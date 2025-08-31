# Troubleshooting

Common issues and fixes when working on thecueRoom.

## Supabase CLI missing
**Error:** `command not found: supabase`

**Fix:**
```bash
npm install -g supabase
```

## ESLint: pages directory cannot be found
Occurs when running `npm run lint`.

**Fix:**
- Ensure you're in the repo root
- Or run:
```bash
npm run lint -- --no-error-on-unmatched-pattern
```

## TypeScript project error for `next.config.js`
If ESLint complains about `parserOptions.project`, add `next.config.js` to the Admin `tsconfig.json` `include` array.

## `ENOWORKSPACES` when starting admin
**Error:** `npm error code ENOWORKSPACES`

**Fix:** Use:
```bash
npm --prefix admin run dev
```

## Metro bundler stuck
If the Expo bundler hangs, clear the cache:
```bash
npm --prefix mobile run start -- --clear
```

## Ports already in use
Kill existing processes or change ports:
```bash
lsof -i :54321 # example
kill -9 <pid>
```
