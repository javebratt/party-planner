import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  doc,
  docData,
  DocumentReference,
  deleteDoc,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Party } from './party.model';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(
    private readonly auth: AuthenticationService,
    private readonly firestore: Firestore
  ) {}

  getPartyList(): Observable<Party[]> {
    const userId: string = this.auth.getUser().uid;
    const partyCollection: CollectionReference<Party> = collection(
      this.firestore,
      `users/${userId}/party`
    ) as CollectionReference<Party>;
    return collectionData<Party>(partyCollection, { idField: 'id' });
  }

  getPartyDetail(partyId: string): Observable<Party> {
    const userId: string = this.auth.getUser().uid;
    const partyDocument: DocumentReference<Party> = doc(
      this.firestore,
      `users/${userId}/party/${partyId}`
    ) as DocumentReference<Party>;
    return docData<Party>(partyDocument);
  }

  createParty(party: Party) {
    const userId: string = this.auth.getUser().uid;
    const partyCollection = collection(
      this.firestore,
      `users/${userId}/party/`
    );
    return addDoc(partyCollection, party);
  }

  deleteParty(partyId: string) {
    const userId: string = this.auth.getUser().uid;
    const documentReference = doc(
      this.firestore,
      `users/${userId}/party/${partyId}`
    );
    return deleteDoc(documentReference);
  }
}
