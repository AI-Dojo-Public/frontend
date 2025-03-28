import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualAgentsComponent } from './textual-agents.component';

describe('TextualAgentsComponent', () => {
  let component: TextualAgentsComponent;
  let fixture: ComponentFixture<TextualAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualAgentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextualAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
