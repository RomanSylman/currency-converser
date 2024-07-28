import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent implements OnInit {
  @Input() amount: number = 0;
  @Input() currency: string = '';
  @Input() currencies: string[] = [];
  @Output() amountChange = new EventEmitter<number>();
  @Output() currencyChange = new EventEmitter<string>();

  @Input() disabledCurrencies: string[] = [];

  ngOnInit(): void {}

  onAmountChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.amountChange.emit(value);
  }

  onCurrencyChange(currency: string): void {
    this.currencyChange.emit(currency);
  }
}
