import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GatewayService} from '../../services/gateway.service';
import {Gateway} from '../../models/gateway';

@Component({
  selector: 'app-gateway-details',
  templateUrl: './gateway-details.component.html',
  styleUrls: ['./gateway-details.component.css']
})
export class GatewayDetailsComponent implements OnInit {
  serialNumber: string;
  gateway: Gateway;
  constructor(private route: ActivatedRoute,
              private gatewayService: GatewayService) { }

  ngOnInit(): void {
    this.serialNumber = this.route.snapshot.paramMap.get('serialNumber');
    this.gatewayService.getGatewayDetails(this.serialNumber).subscribe(data => {
      this.gateway = data;
    });
  }

  back() {
    history.back();
  }
}
