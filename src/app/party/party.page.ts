import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from './party.model';
import { PartyService } from './party.service';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage {
  readonly partyList$: Observable<Party[]> = this.partyService.getPartyList();
  constructor(private readonly partyService: PartyService) {}
}
