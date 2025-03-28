import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfAgentsComponent } from './conf-agents.component';

describe('ConfAgentsComponent', () => {
  let component: ConfAgentsComponent;
  let fixture: ComponentFixture<ConfAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
