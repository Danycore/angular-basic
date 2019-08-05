import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { ExchangeRates } from '../models/ExchangeRates';
import { RateByDate } from '../models/RateByDate';

@Component({
  selector: 'app-obserates',
  templateUrl: './obserates.component.html',
  styles: []
})
export class ObseratesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  public currentEuroRates$: Observable<ExchangeRates> = null;
  public ratesByDate$: Observable<RateByDate[]> = null;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
    this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url).pipe(share());
    this.ratesByDate$ = this.currentEuroRates$.pipe(map(this.transformData));
  }

  private transformData(exchangeRates: ExchangeRates): RateByDate[] {
    const currentDate = exchangeRates.date;
    const currentRates = exchangeRates.rates;
    const ratesByDate = Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
    return ratesByDate;
  }

  private getEuroRatesPlus() {
    const url = `${this.ratesApi}?symbols=USD,GBP,CHF,JPY`;
    this.currentEuroRates$ = this.httpClient.get<ExchangeRates>(url).pipe(share());
    this.ratesByDate$ = this.currentEuroRates$.pipe(
      tap(d => console.log(d)),
      map(this.transformData),
      tap(t => console.log(t))
    );
  }
}
