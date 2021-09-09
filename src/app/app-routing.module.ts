import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GatewaysComponent} from './components/gateways/gateways.component';
import {AddEditGatewayComponent} from './components/add-edit-gateway/add-edit-gateway.component';
import {GatewayDetailsComponent} from './components/gateway-details/gateway-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'gateways',
    pathMatch: 'full'
  },
  {
    path: 'gateways',
    component: GatewaysComponent
  },
  {
    path: 'gateways/:serialNumber',
    component: GatewayDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
