import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktsideComponent } from './produktside.component';

describe('ProduktsideComponent', () => {
  let component: ProduktsideComponent;
  let fixture: ComponentFixture<ProduktsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
