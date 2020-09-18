import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KviteringComponent } from './kvitering.component';

describe('KviteringComponent', () => {
  let component: KviteringComponent;
  let fixture: ComponentFixture<KviteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KviteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KviteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
