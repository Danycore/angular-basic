import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-obserates',
  templateUrl: './obserates.component.html',
  styles: []
})
export class ObseratesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  public currentEuroRates$: Observable<any> = null;
  public myRates$: Observable<any[]> = null;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
    this.currentEuroRates$ = this.httpClient.get(url).pipe(share());
    this.myRates$ = this.currentEuroRates$.pipe(map(this.transformData));
  }

  private transformData(currentRates) {
    const current = currentRates.rates;
    return Object.keys(current).map(key => ({
      date: currentRates.date,
      currency: key,
      euros: current[key]
    }));
  }
}
