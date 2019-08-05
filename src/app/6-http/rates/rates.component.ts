import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExchangeRates } from './models/ExchangeRates';
import { RateByDate } from './models/RateByDate';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styles: []
})
export class RatesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  private ratesByDateApi = 'https://api-base.herokuapp.com/api/pub/rates';
  public currentEuroRates: ExchangeRates = null;
  public ratesByDate: RateByDate[] = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
    this.httpClient
      .get<ExchangeRates>(url)
      .subscribe(apiResult => (this.currentEuroRates = apiResult));
  }

  public postRatesByDate() {
    const ratesByDate: RateByDate[] = this.transformExchangeRates();
    ratesByDate.forEach(rate =>
      this.httpClient.post<RateByDate>(this.ratesByDateApi, rate).subscribe()
    );
  }

  private transformExchangeRates(): RateByDate[] {
    const currentDate = this.currentEuroRates.date;
    const currentRates = this.currentEuroRates.rates;
    const ratesByDate = Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
    return ratesByDate;
  }

  public getRatesByDate() {
    this.httpClient
      .get<RateByDate[]>(this.ratesByDateApi)
      .subscribe(apiResult => (this.ratesByDate = apiResult));
  }

  public deleteRatesByDate() {
    this.httpClient.delete(this.ratesByDateApi).subscribe();
  }
}
