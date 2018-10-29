import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsContainerComponent } from './records-container.component';

describe('RecordsContainerComponent', () => {
  let component: RecordsContainerComponent;
  let fixture: ComponentFixture<RecordsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
