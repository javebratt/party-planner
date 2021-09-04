import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {}

  getUser(): User {
    return this.auth.currentUser;
  }

  getUser$(): Observable<User> {
    return of(this.getUser());
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup(email: string, password: string): Promise<UserCredential> {
    try {
      const newUserCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      const userProfileDocumentReference = doc(this.firestore, `users/${newUserCredential.user.uid}`);

      await setDoc(userProfileDocumentReference, { email });

      return newUserCredential;
    } catch (error) {
      throw error;
    }
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
