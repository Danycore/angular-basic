import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: []
})
export class ContactsComponent implements OnInit {
  public header = 'Contacts';
  public description = 'Manage your contact list';
  public numContacts = 0;
  public counterClass = 'tag secondary';
  public formHidden = false;

  public workStatuses = [
    { id: 0, description: 'unknow' },
    { id: 1, description: 'student' },
    { id: 2, description: 'unemployed' },
    { id: 3, description: 'employed' }
  ];
  public contact = {
    name: '',
    isVIP: false,
    gender: '',
    workStatus: '0',
    companyName: '',
    education: ''
  };

  constructor() {}

  ngOnInit() {}
}
