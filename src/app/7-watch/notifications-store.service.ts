import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsStoreService {
  private notifications = [];

  private notifications$ = new BehaviorSubject<any[]>(this.notifications);
  // private notifications$ = new Subject<any[]>();

  constructor() {}

  public select$ = () => this.notifications$.asObservable();

  public sendNotification(notification) {
    this.notifications = [...this.notifications, notification];
    this.notifications$.next(this.notifications);
  }
}
