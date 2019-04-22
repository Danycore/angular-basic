import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styles: []
})
export class SecretComponent implements OnInit {
  public secret$: Observable<any>;
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}
  public getSecret() {
    const protectedUrl = 'https://api-base.herokuapp.com/api/priv/operations';
    this.secret$ = this.httpClient.get(protectedUrl).pipe(map(res => 'Ok'));
  }
}
