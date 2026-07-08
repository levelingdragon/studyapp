# Engineering Study App

A polished, client-side educational study app built with React + Vite. It includes:

- animated splash screen
- local-only authentication flow
- course, note, and lecture cards
- offline-friendly demo dashboard
- persistent user state via localStorage
- test coverage and production build support

## Run locally

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Android APK

Build a debug APK locally:

```bash
npx cap sync android
cd android
./gradlew assembleDebug
```

The APK will be generated at android/app/build/outputs/apk/debug/app-debug.apk.

A GitHub Actions workflow is also included to attach the APK automatically to a tagged release.

## Architecture notes

- App shell and screens live in src/App.jsx
- Demo content is stored in src/data/demoData.js
- Styling is centralized in src/index.css
- Tests live in src/App.test.jsx
