import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePartyComponent } from './create-party/create-party.component';
import { DetailPartyComponent } from './detail-party/detail-party.component';

import { PartyPage } from './party.page';

const routes: Routes = [
  {
    path: '',
    component: PartyPage,
  },
  {
    path: 'new',
    component: CreatePartyComponent,
  },
  {
    path: ':partyId',
    component: DetailPartyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyPageRoutingModule {}
