import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRssComponent } from './section-rss.component';

describe('SectionRssComponent', () => {
  let component: SectionRssComponent;
  let fixture: ComponentFixture<SectionRssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionRssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
