import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";

export interface UserDetails {
  familyID: string;
  uid: string;
}

@Injectable({
  providedIn: "root"
})
export class UserDetailsService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}
  uid: string;
  userDetails$: Observable<UserDetails> = this.afAuth.user.pipe(
    switchMap(user => {
      this.uid = user.uid;
      return this.afs.doc<UserDetails>(`users/${this.uid}`).valueChanges();
    }),
    map(userDetails => ({ ...userDetails, uid: this.uid }))
  );

  getUserDetails(): Observable<UserDetails> {
    return this.userDetails$;
  }
}
