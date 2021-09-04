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
  runTransaction,
} from '@angular/fire/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Party } from './party.model';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(private readonly auth: AuthenticationService, private readonly firestore: Firestore) {}

  getPartyList(): Observable<Party[]> {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: User) => collection(this.firestore, `users/${userId}/party`)),
      switchMap((partyCollection: CollectionReference<Party>) =>
        collectionData<Party>(partyCollection, { idField: 'id' })
      )
    );
  }

  getPartyDetail(partyId: string): Observable<Party> {
    return this.auth.getUser$().pipe(
      map(({ uid: userId }: User) => doc(this.firestore, `users/${userId}/party/${partyId}`)),
      switchMap((partyDocument: DocumentReference<Party>) => docData<Party>(partyDocument))
    );
  }

  createParty(party: Partial<Party>): Promise<DocumentReference<Partial<Party>>> {
    const userId: string = this.auth.getUser().uid;
    const partyCollection = collection(this.firestore, `users/${userId}/party/`) as CollectionReference<Partial<Party>>;
    return addDoc<Partial<Party>>(partyCollection, party);
  }

  deleteParty(partyId: string): Promise<void> {
    const userId: string = this.auth.getUser().uid;
    const documentReference = doc(this.firestore, `users/${userId}/party/${partyId}`);
    return deleteDoc(documentReference);
  }

  async addTicketOperation(partyId: string, ticketCost: number, type: string = 'add') {
    const userId: string = this.auth.getUser().uid;
    const partyDocRef = doc(this.firestore, `users/${userId}/party/${partyId}`);
    try {
      await runTransaction(this.firestore, async (transaction) => {
        const partyDoc = await transaction.get(partyDocRef);

        const newRevenue = type === 'add' ? partyDoc.data().revenue + ticketCost : partyDoc.data().revenue - ticketCost;
        transaction.update(partyDocRef, { revenue: newRevenue });
      });
    } catch (error) {
      console.log('Transaction failed: ', error);
      throw error;
    }
  }
}
