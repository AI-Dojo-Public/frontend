import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosComponent } from './scenarios.component';

describe('ScenariosComponent', () => {
  let component: ScenariosComponent;
  let fixture: ComponentFixture<ScenariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
