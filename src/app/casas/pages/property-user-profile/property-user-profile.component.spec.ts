import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUserProfileComponent } from './property-user-profile.component';

describe('PropertyUserProfileComponent', () => {
  let component: PropertyUserProfileComponent;
  let fixture: ComponentFixture<PropertyUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyUserProfileComponent]
    });
    fixture = TestBed.createComponent(PropertyUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
