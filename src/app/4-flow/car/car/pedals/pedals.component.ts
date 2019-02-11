import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pedals',
  templateUrl: './pedals.component.html',
  styles: []
})
export class PedalsComponent implements OnInit {
  @Output() public brake = new EventEmitter<number>();
  @Output() public throttle = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}
}
