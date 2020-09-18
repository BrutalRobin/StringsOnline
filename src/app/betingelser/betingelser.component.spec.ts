import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetingelserComponent } from './betingelser.component';

describe('BetingelserComponent', () => {
  let component: BetingelserComponent;
  let fixture: ComponentFixture<BetingelserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetingelserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetingelserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
