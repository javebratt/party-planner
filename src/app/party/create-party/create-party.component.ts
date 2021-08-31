import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Party } from '../party.model';
import { PartyService } from '../party.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss'],
})
export class CreatePartyComponent implements OnInit {
  name: string;
  ticketPrice: number;
  cost: number;
  date: any;

  constructor(
    private readonly partyService: PartyService,
    private readonly router: Router,
    private readonly loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async createEvent(party: Partial<Party>): Promise<void> {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    party.revenue = 0;
    await this.partyService.createParty(party);

    await loading.dismiss();

    await this.router.navigateByUrl('party');
  }

  isValidForm(): boolean {
    return this.name && this.ticketPrice && this.cost && this.date;
  }
}
