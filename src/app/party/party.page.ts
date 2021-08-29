import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Party } from './party.model';
import { PartyService } from './party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage implements OnInit {
  partyList: Observable<Party[]> = of([]);
  constructor(private readonly partyService: PartyService) {}

  ngOnInit() {
    this.partyList = this.partyService.getPartyList();
  }
}
