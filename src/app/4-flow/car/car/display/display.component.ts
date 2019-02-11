import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styles: []
})
export class DisplayComponent implements OnInit {
  @Input() public currentSpeed: number;
  @Input() public topSpeed: number;
  @Input() public units: string;

  constructor() {}

  ngOnInit() {}
}
