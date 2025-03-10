import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionQuickButtonComponent } from './action-quick-button.component';

describe('ActionQuickButtonComponent', () => {
  let component: ActionQuickButtonComponent;
  let fixture: ComponentFixture<ActionQuickButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionQuickButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionQuickButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
