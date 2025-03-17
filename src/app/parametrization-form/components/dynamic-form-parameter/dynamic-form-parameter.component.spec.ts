import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormParameterComponent } from './dynamic-form-parameter.component';

describe('DynamicFormParameterComponent', () => {
  let component: DynamicFormParameterComponent;
  let fixture: ComponentFixture<DynamicFormParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormParameterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
