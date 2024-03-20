import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCardComponent } from './apps-card.component';

describe('AppsCardComponent', () => {
  let component: AppsCardComponent;
  let fixture: ComponentFixture<AppsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsCardComponent]
    });
    fixture = TestBed.createComponent(AppsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
