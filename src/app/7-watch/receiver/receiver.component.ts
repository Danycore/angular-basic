import { Component, OnInit } from '@angular/core';
import { NotificationsStoreService } from '../notifications-store.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styles: []
})
export class ReceiverComponent implements OnInit {
  public notes$;

  constructor(private notificationsStoreService: NotificationsStoreService) {}

  ngOnInit() {
    this.notes$ = this.notificationsStoreService.select$();
  }
}
