import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { getStorage, connectStorageEmulator, provideStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions, connectFunctionsEmulator } from '@angular/fire/functions';
import { firebaseConfig } from './credentials';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://localhost:9099');
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      connectFirestoreEmulator(firestore, 'localhost', 8080); // This needs to be first.
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      connectStorageEmulator(storage, 'localhost', 9199);
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      connectFunctionsEmulator(functions, 'localhost', 5001);
      return functions;
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
