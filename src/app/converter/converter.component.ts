import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  currencies: string[] = ['UAH', 'USD', 'EUR', 'GBP', 'CAD', 'JPY'];
  fromCurrency: string = 'USD';
  toCurrency: string = 'UAH';
  fromAmount: number = 1;
  toAmount: number = 0;
  rates: any = {};
  isRotating: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRates();
  }

  loadRates(): void {
    this.http
      .get(
        'https://v6.exchangerate-api.com/v6/06df6e021e939ba411baf94b/latest/USD'
      )
      .subscribe((data: any) => {
        this.rates = data.conversion_rates;
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

  onFromAmountChange(): void {
    this.convert();
  }

  onToAmountChange(): void {
    const rate = this.rates[this.fromCurrency] / this.rates[this.toCurrency];
    this.fromAmount = this.toAmount * rate;
  }

  onCurrencyChange(): void {
    this.convert();
  }

  reverseCurrencies(): void {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.convert();
  }

  onReverseButtonClick(): void {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
      this.reverseCurrencies();
    }, 600);
  }

  getCountryCode(currency: string): string {
    const currencyCountryMap: { [key: string]: string } = {
      USD: 'us',
      UAH: 'ua',
      EUR: 'eu',
      GBP: 'gb',
      CAD: 'ca',
      JPY: 'jp',
    };
    return currencyCountryMap[currency] || 'us';
  }
}
