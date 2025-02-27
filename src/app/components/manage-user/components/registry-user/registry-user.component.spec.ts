import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryUserComponent } from './registry-user.component';

describe('RegistryUserComponent', () => {
  let component: RegistryUserComponent;
  let fixture: ComponentFixture<RegistryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
