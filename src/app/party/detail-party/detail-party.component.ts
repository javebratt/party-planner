import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const partyId: string = this.route.snapshot.paramMap.get('partyId');
    this.initializeParty(partyId);
  }

  initializeParty(partyId: string): void {
    this.partyService.getPartyDetail(partyId).subscribe((party) => {
      this.currentParty = party;
      if (this.currentParty) {
        this.currentParty.id = partyId;
      }
    });
  }

  async addTicketOperation(type: string) {
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();

      await this.partyService.addTicketOperation(this.currentParty.id, this.currentParty.ticketPrice, type);

      await loading.dismiss();
    } catch (error) {
      await loading.dismiss();
      console.log(error);
    }
  }

  async removeParty() {
    const loading = await this.loadingCtrl.create();
    try {
      await loading.present();

      await this.partyService.deleteParty(this.currentParty.id);

      await loading.dismiss();

      this.router.navigateByUrl('party');
    } catch (error) {
      await loading.dismiss();
      console.log(error);
    }
  }

  async removePartyAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to delete ${this.currentParty.name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete Party',
          handler: () => this.removeParty(),
        },
      ],
    });
    await alert.present();

    await alert.onDidDismiss();
  }
}
