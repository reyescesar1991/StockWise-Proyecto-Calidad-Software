import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStatusComponent } from './general-status.component';

describe('GeneralStatusComponent', () => {
  let component: GeneralStatusComponent;
  let fixture: ComponentFixture<GeneralStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
