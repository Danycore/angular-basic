import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-obserates',
  templateUrl: './obserates.component.html',
  styles: []
})
export class ObseratesComponent implements OnInit {
  private ratesApi = 'https://api.exchangeratesapi.io/latest';
  private myRatesApi = 'https://api-base.herokuapp.com/api/pub/rates';
  public currentEuroRates$: Observable<any> = null;
  public myRates$: Observable<any[]> = null;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';
    const url = `${this.ratesApi}?symbols=${currencies}`;
    this.currentEuroRates$ = this.httpClient.get(url);
    //.pipe( shareReplay() );
  }

  public postRates() {
    this.myRates$ = this.currentEuroRates$
      .pipe(
        map(this.transformData),
        tap(rates =>
          rates.forEach(rate => {
            this.httpClient.post(this.myRatesApi, rate).subscribe();
            // To Do: wait for last
          })
        )
      )
      .pipe(switchMap(() => this.httpClient.get<any[]>(this.myRatesApi)));
  }
  private transformData(currentEuroRates) {
    const current = currentEuroRates.rates;
    return Object.keys(current).map(key => ({
      date: currentEuroRates.date,
      currency: key,
      euros: current[key]
    }));
  }

  public deleteMyRates() {
    this.myRates$ = this.httpClient.delete(this.myRatesApi).pipe(switchMap(() => this.httpClient.get<any[]>(this.myRatesApi)));
  }
}
