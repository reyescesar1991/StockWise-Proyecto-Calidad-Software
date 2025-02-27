import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryUserComponent } from './recovery-user.component';

describe('RecoveryUserComponent', () => {
  let component: RecoveryUserComponent;
  let fixture: ComponentFixture<RecoveryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoveryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
