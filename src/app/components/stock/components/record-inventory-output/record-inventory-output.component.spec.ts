import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordInventoryOutputComponent } from './record-inventory-output.component';

describe('RecordInventoryOutputComponent', () => {
  let component: RecordInventoryOutputComponent;
  let fixture: ComponentFixture<RecordInventoryOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordInventoryOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordInventoryOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
