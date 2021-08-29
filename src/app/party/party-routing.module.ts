import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartyPage } from './party.page';

const routes: Routes = [
  {
    path: '',
    component: PartyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartyPageRoutingModule {}
