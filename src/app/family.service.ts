import { Injectable } from '@angular/core';
import {
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface UserDetails { familyID: string; }

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(private afs: AngularFirestore) {
  }

  updateFamilyID(familyID: string, uid: string): Promise<void> {
    return this.afs.collection('users').doc(uid).set({
      familyID: familyID
    });
  }

  getUserDetails(uid): Observable<UserDetails> {
    return this.afs.doc<UserDetails>(`users/${uid}`).valueChanges();
  }
}
