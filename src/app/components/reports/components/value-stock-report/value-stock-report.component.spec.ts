import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueStockReportComponent } from './value-stock-report.component';

describe('ValueStockReportComponent', () => {
  let component: ValueStockReportComponent;
  let fixture: ComponentFixture<ValueStockReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueStockReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValueStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
