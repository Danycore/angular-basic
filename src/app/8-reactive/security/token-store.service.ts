import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  private token = '';
  private token$ = new BehaviorSubject<string>('');

  constructor() {}

  public select$ = () => this.token$.asObservable();

  public dispatch(token) {
    this.token = token;
    this.token$.next(this.token);
  }
}
