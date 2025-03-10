import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockItemStatusDashboardComponent } from './stock-item-status-dashboard.component';

describe('StockItemStatusDashboardComponent', () => {
  let component: StockItemStatusDashboardComponent;
  let fixture: ComponentFixture<StockItemStatusDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockItemStatusDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockItemStatusDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
