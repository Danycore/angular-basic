import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExchangeRates } from './models/ExchangeRates';
import { MyRate } from './models/MyRate';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styles: []
})
export class RatesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';
  public currentEuroRates: ExchangeRates = null;
  public myRates: MyRate[] = null;

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

  public postRates() {
    const rates: MyRate[] = this.transformExchangeRates();
    rates.forEach(rate => this.httpClient.post<MyRate>(this.myRatesApi, rate).subscribe());
  }

  private transformExchangeRates() {
    const currentDate = this.currentEuroRates.date;
    const currentRates = this.currentEuroRates.rates;
    return Object.keys(currentRates).map((keyRate: string) => ({
      date: currentDate,
      currency: keyRate,
      euros: currentRates[keyRate]
    }));
  }

  public getMyRates() {
    this.httpClient
      .get<MyRate[]>(this.myRatesApi)
      .subscribe(apiResult => (this.myRates = apiResult));
  }

  public deleteMyRates() {
    this.httpClient.delete(this.myRatesApi).subscribe();
  }
}
