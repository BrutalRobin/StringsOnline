import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarekurvComponent } from './varekurv.component';

describe('VarekurvComponent', () => {
  let component: VarekurvComponent;
  let fixture: ComponentFixture<VarekurvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarekurvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarekurvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
