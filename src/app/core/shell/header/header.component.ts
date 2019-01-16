import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: []
})
export class HeaderComponent implements OnInit {
    public title = environment.appName + ' hello world ;-) ';
    constructor() {}

    ngOnInit() {}
}
