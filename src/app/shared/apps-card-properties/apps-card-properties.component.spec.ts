import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsCardPropertiesComponent } from './apps-card-properties.component';

describe('AppsCardPropertiesComponent', () => {
  let component: AppsCardPropertiesComponent;
  let fixture: ComponentFixture<AppsCardPropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppsCardPropertiesComponent]
    });
    fixture = TestBed.createComponent(AppsCardPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
