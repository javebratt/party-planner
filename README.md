# Party Planner Example

Example party planner app built with:

- Ionic Framework v6
- Firebase v9
- AngularFire v7

You can test it adding your own Firebase Credentials.

## Firebase Initialization

You can see how to initialize Firebase Inside the `src/app/app.module.ts`.

## Firebase Authentication

For authentication, most of the code relevant to Firebase Auth is inside `src/app/authentication/authentication.service.ts`, but you can still see everything including the UI in the authentication module `src/app/authentication`.

One of the authentication functions, `onAuthStateChanged()` is shown inside `src/app/authentication/authentication.guard.ts`.

## Firestore Usage

All of the Firestore functions are extracted into one service the app uses to talk to Firebase, you can find everything inside `src/app/party/party.service.ts`
