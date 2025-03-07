import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

export interface StockData {
  currentStock: number;
  minStock: number;
  optimalStock: number;
  location: string;
  lastUpdated: string;
}

enum StockStatus {
  LOW = 'status-low',
  MEDIUM = 'status-medium',
  GOOD = 'status-good'
}


@Component({
  selector: 'app-stock-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-indicator.component.html',
  styleUrl: './stock-indicator.component.scss'
})
export class StockIndicatorComponent {

  @Input() stockData: StockData = {
    currentStock: 42,
    minStock: 10,
    optimalStock: 50,
    location: "Bodega Central - Estante A3",
    lastUpdated: "02/03/2025 - 15:30"
  };

  // Variables calculadas
  fillPercentage: number = 0;
  statusClass: StockStatus = StockStatus.GOOD;
  statusText: string = '';
  statusColor: string = '';

  // Constantes para mensajes de estado
  readonly STATUS_MESSAGES: Record<StockStatus, string> = {
    [StockStatus.LOW]: 'Stock Bajo',
    [StockStatus.MEDIUM]: 'Stock Medio',
    [StockStatus.GOOD]: 'Stock Adecuado'
  };

  // Constantes para colores de estado
  readonly STATUS_COLORS: Record<StockStatus, string> = {
    [StockStatus.LOW]: '#f44336',
    [StockStatus.MEDIUM]: '#ff9800',
    [StockStatus.GOOD]: '#4caf50'
  };

  constructor() {
    this.updateCalculatedValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stockData']) {
      this.updateCalculatedValues();
    }
  }

  private updateCalculatedValues(): void {
    // Calcular porcentaje de llenado (limitado a 100%)
    this.fillPercentage = Math.min(
      (this.stockData.currentStock / this.stockData.optimalStock) * 100,
      100
    );

    // Calcular estado
    this.statusClass = this.calculateStockStatus();
    this.statusText = this.STATUS_MESSAGES[this.statusClass];
    this.statusColor = this.STATUS_COLORS[this.statusClass];
  }

  private calculateStockStatus(): StockStatus {
    const stockPercentage = this.stockData.currentStock / this.stockData.optimalStock;

    if (this.stockData.currentStock < this.stockData.minStock) {
      return StockStatus.LOW;
    } else if (stockPercentage < 0.5) {
      return StockStatus.MEDIUM;
    } else {
      return StockStatus.GOOD;
    }
  }
}
