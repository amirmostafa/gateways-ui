import {DeviceStatus} from '../enums/device-status.enum';

export class Device {
  uid: number;
  vendor: string;
  creationDate: Date;
  status: DeviceStatus;
  gatewaySerialNumber: string;

  constructor(gatewaySerialNumber: string) {
    this.gatewaySerialNumber = gatewaySerialNumber;
  }
}
