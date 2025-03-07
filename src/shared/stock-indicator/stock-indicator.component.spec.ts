import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockIndicatorComponent } from './stock-indicator.component';

describe('StockIndicatorComponent', () => {
  let component: StockIndicatorComponent;
  let fixture: ComponentFixture<StockIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
