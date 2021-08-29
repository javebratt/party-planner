import { Component, OnInit } from '@angular/core';
import { Party } from '../party.model';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss'],
})
export class CreatePartyComponent implements OnInit {
  public name: any;
  public ticketPrice: any;
  public cost: any;
  public date: any;
  constructor() {}

  ngOnInit() {}

  createEvent(party: Partial<Party>): void {
    console.log(party);
  }
}
