import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../utils/currency.service';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyData {
  conversion_rates: ExchangeRates;
  time_last_update_utc: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  exchangeRates: { USD: number; EUR: number } = { USD: 0, EUR: 0 };
  lastUpdated: string = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.currencyService.getRates().subscribe((data: CurrencyData) => {
      const usdToUah = data.conversion_rates['UAH'];
      const eurToUah = data.conversion_rates['EUR'];

      this.exchangeRates = {
        USD: +(1 / usdToUah).toFixed(4),
        EUR: +(eurToUah / usdToUah).toFixed(4),
      };

      const date = new Date(data.time_last_update_utc);
      this.lastUpdated = date.toLocaleString();
    });
  }
}
