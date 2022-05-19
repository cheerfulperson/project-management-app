import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBenefitsComponent } from './section-benefits.component';

describe('SectionBenefitsComponent', () => {
  let component: SectionBenefitsComponent;
  let fixture: ComponentFixture<SectionBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
