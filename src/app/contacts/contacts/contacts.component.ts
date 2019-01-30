import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import { Option } from './models/option.model';

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

  public workStatuses: Option[] = [
    { id: 0, description: 'unknow' },
    { id: 1, description: 'student' },
    { id: 2, description: 'unemployed' },
    { id: 3, description: 'employed' }
  ];
  public contact: Contact = {
    name: '',
    isVIP: false,
    gender: '',
    workStatus: 0,
    companyName: '',
    education: ''
  };
  public contacts: Contact[] = [];

  constructor() {}

  ngOnInit() {}

  public saveContact() {
    this.contacts.push({ ...this.contact });
    this.numContacts = this.contacts.length;
  }
}
