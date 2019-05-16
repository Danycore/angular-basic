import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { ExchangeRates } from '../models/ExchangeRates';
import { MyRate } from '../models/MyRate';

@Component({
  selector: 'app-obserates',
  templateUrl: './obserates.component.html',
  styles: []
})
export class ObseratesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  public currentEuroRates$: Observable<ExchangeRates> = null;
  public myRates$: Observable<MyRate[]> = null;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
    this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url).pipe(share());
    this.myRates$ = this.currentEuroRates$.pipe(map(this.transformData));
  }

  private transformData(exchangeRates) {
    const currentDate = exchangeRates.date;
    const currentRates = exchangeRates.rates;
    return Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
  }
}
