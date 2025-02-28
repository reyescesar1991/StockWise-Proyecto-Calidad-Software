import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentAppComponent } from './main-content-app.component';

describe('MainContentAppComponent', () => {
  let component: MainContentAppComponent;
  let fixture: ComponentFixture<MainContentAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainContentAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
