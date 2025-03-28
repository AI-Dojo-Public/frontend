import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrytonComponent } from './cryton.component';

describe('CrytonComponent', () => {
  let component: CrytonComponent;
  let fixture: ComponentFixture<CrytonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrytonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrytonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
