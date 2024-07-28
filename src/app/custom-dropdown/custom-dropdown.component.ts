import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { getCountryCode } from '../utils/currency-utils';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent implements OnInit {
  @Input() currencies!: string[];
  @Input() selectedCurrency!: string;
  @Output() currencyChange = new EventEmitter<string>();

  dropdownOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCurrency(currency: string): void {
    this.selectedCurrency = currency;
    this.currencyChange.emit(currency);
    this.dropdownOpen = false;
  }

  getCountryFlag(currency: string): string {
    const countryCode = getCountryCode(currency);
    return `https://flagcdn.com/${countryCode}.svg`;
  }

  flagError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://flagcdn.com/us.svg';
  }
}
