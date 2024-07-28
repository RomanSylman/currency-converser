import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../utils/currency.service';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyData {
  conversion_rates: ExchangeRates;
}

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  currencies: string[] = [];
  fromAmount: number = 1;
  fromCurrency: string = 'USD';
  toAmount: number = 0;
  toCurrency: string = 'UAH';
  rates: ExchangeRates = {};
  isRotating: boolean = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.currencyService.getRates().subscribe((data: CurrencyData) => {
      this.rates = data.conversion_rates;
      this.currencies = Object.keys(this.rates);
      this.convert();
    });
  }

  convert(): void {
    if (this.fromCurrency === this.toCurrency) {
      this.toAmount = this.fromAmount;
    } else {
      const rate = this.rates[this.toCurrency] / this.rates[this.fromCurrency];
      this.toAmount = this.fromAmount * rate;
    }
  }

  onFromAmountChange(amount: number): void {
    this.fromAmount = amount;
    this.convert();
  }

  onFromCurrencyChange(currency: string): void {
    this.fromCurrency = currency;
    this.convert();
  }

  onToAmountChange(amount: number): void {
    this.toAmount = amount;
    this.convert();
  }

  onToCurrencyChange(currency: string): void {
    this.toCurrency = currency;
    this.convert();
  }

  reverseCurrencies(): void {
    const tempCurrency = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = tempCurrency;
    this.convert();
  }

  onReverseButtonClick(): void {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
      this.reverseCurrencies();
    }, 600);
  }
}
