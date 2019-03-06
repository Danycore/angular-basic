import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsStoreService {
  private notifications = [];

  private notifications$ = new BehaviorSubject<any[]>([]);
  // private notifications$ = new Subject<any[]>();

  constructor() {}

  public select$ = () => this.notifications$.asObservable();

  public dispatchNotification(notification) {
    this.notifications.push(notification);
    this.notifications$.next([...this.notifications]);
  }
}
