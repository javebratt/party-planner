import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-detail-party',
  templateUrl: './detail-party.component.html',
  styleUrls: ['./detail-party.component.scss'],
})
export class DetailPartyComponent implements OnInit {
  currentParty: Party;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly partyService: PartyService,
    private readonly loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    const partyId: string = this.route.snapshot.paramMap.get('partyId');
    this.initializeParty(partyId);
  }

  initializeParty(partyId: string): void {
    this.partyService.getPartyDetail(partyId).subscribe((party) => {
      this.currentParty = party;
      this.currentParty.id = partyId;
    });
  }

  async addTicketOperation(type: string) {
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();

      await this.partyService.addTicketOperation(
        this.currentParty.id,
        this.currentParty.ticketPrice,
        type
      );

      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      console.log(error);
    }
  }
}
