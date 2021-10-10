import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Party } from './party.model';
import { PartyService } from './party.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage {
  readonly partyList$: Observable<Party[]> = this.partyService.getPartyList();
  constructor(private readonly partyService: PartyService, private readonly http: HttpClient) {}
  // http://localhost:5001/javebratt-examples/us-central1/helloWorld
  // https://us-central1-javebratt-examples.cloudfunctions.net/helloWorld

  callHTTPCloudFunction() {
    return this.http.get('http://localhost:5001/javebratt-examples/us-central1/helloWorld').subscribe((response) => {
      console.log(response);
    });
  }
}
