import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreHistorikComponent } from './ordre-historik.component';

describe('OrdreHistorikComponent', () => {
  let component: OrdreHistorikComponent;
  let fixture: ComponentFixture<OrdreHistorikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdreHistorikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreHistorikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
