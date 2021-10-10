import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.send({ message: 'Hello from Firebase emulator!' });
});

export const sayHello = functions.https.onCall((data, context) => {
  return { message: 'Hello from the emulator' };
});

export const newPartyCreated = functions.firestore
  .document('users/{userId}/party/{partyId}')
  .onCreate((snap, context) => {
    const partyId: string = snap.id;

    console.log(partyId);

    return;
  });
