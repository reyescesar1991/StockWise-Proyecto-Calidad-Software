import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustProductStockComponent } from './adjust-product-stock.component';

describe('AdjustProductStockComponent', () => {
  let component: AdjustProductStockComponent;
  let fixture: ComponentFixture<AdjustProductStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustProductStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdjustProductStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
