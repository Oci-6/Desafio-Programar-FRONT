import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPersonComponent } from './business-person.component';

describe('BusinessPersonComponent', () => {
  let component: BusinessPersonComponent;
  let fixture: ComponentFixture<BusinessPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
