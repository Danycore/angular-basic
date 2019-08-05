import { Component, OnInit } from '@angular/core';
import { NotificationsStoreService } from '../notifications-store.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styles: []
})
export class SenderComponent implements OnInit {
  public notification = { note: '' };

  constructor(private notificationsStoreService: NotificationsStoreService) {}

  ngOnInit() {}

  public send() {
    this.notificationsStoreService.dispatch(this.notification);
  }
}
