import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  exchangeRates: any = {
    USD: 0,
    EUR: 0,
  };
  lastUpdated: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExchangeRates();
  }

  getExchangeRates(): void {
    this.http
      .get(
        'https://v6.exchangerate-api.com/v6/06df6e021e939ba411baf94b/latest/USD'
      )
      .subscribe((data: any) => {
        const usdToUah = data.conversion_rates.UAH;
        const eurToUah = data.conversion_rates.EUR;

        this.exchangeRates = {
          USD: (1 / usdToUah).toFixed(4),
          EUR: (eurToUah / usdToUah).toFixed(4),
        };

        const date = new Date(data.time_last_update_utc);
        this.lastUpdated = date.toLocaleString();
      });
  }
}
