# Expense Tracker (expense-tracker)

Expense Tracker helps you stay on top of your spending.

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## Run the tests

cd quasar-moneyballs-ts/expense-tracker

### Run specific test file

```bash
npm test Settings.test.ts
```

### Run tests matching a pattern

```bash
npm test -- -t "Settings"
```

It will skip the Entry.test.ts

```
 DEV  v4.0.14 /home/biroa/Work/quasar/quasar-moneyballs-ts/expense-tracker

 ↓ src/models/__tests__/Entry.test.ts (15 tests | 15 skipped)
 ✓ src/models/__tests__/Settings.test.ts (10 tests) 3ms

 Test Files  1 passed | 1 skipped (2)
      Tests  10 passed | 15 skipped (25)
   Start at  11:58:42
   Duration  262ms (transform 63ms, setup 0ms, import 81ms, tests 3ms, environment 185ms)

 PASS  Waiting for file changes...
       press h to show help, press q to quit

```

### Run a specific described block

```bash
npm test -- -t "dark mode helpers"
```

### Run a specific test

```bash
npm test --grep "should detect dark mode"
```
## To-do
````
To-Do 
- I'm aware of the settings page loses settings value when we navigate away (2026-01-06) - done
- I'm aware of the sort of the items are not stored properly
- Add unit tests for PINIA stores
- Planning to test the app with (Playwright e2e testing)
- AI integration
````