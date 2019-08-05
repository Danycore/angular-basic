import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationsStoreService } from '../notifications-store.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styles: []
})
export class ReceiverComponent implements OnInit {
  public notifications$;

  constructor(
    private notificationsStoreService: NotificationsStoreService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.notifications$ = this.notificationsStoreService.select$();
  }
  public forceError() {
    const protectedUrl = 'https://api-base.herokuapp.com/api/priv/operations';
    this.httpClient.get(protectedUrl).subscribe();
    const notFoundUrl = 'https://api-base.herokuapp.com/api/pub/items/9';
    this.httpClient.get(notFoundUrl).subscribe();
  }
}
