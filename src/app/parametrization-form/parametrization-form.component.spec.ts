import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrizationFormComponent } from './parametrization-form.component';

describe('ParametrizationFormComponent', () => {
  let component: ParametrizationFormComponent;
  let fixture: ComponentFixture<ParametrizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametrizationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametrizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
