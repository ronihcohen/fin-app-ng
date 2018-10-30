import { TestBed } from '@angular/core/testing';

import { FamilyService } from './family.service';
import {
  AngularFirestore,
} from '@angular/fire/firestore';

describe('FamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: AngularFirestore }]
  }));

  it('should be created', () => {
    const service: FamilyService = TestBed.get(FamilyService);
    expect(service).toBeTruthy();
  });
});
