import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

export interface UserDetails {
  familyID: string;
}

@Injectable({
  providedIn: "root"
})
export class FamilyService {
  constructor(private afs: AngularFirestore) {}

  updateFamilyID(familyID: string, uid: string): Promise<void> {
    return this.afs
      .collection("users")
      .doc(uid)
      .set({
        familyID: familyID
      });
  }
}
