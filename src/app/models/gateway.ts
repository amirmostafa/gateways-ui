import {Device} from './device';

export class Gateway {
  serialNumber: string;
  name: string;
  ipv4: string;
  devices: Device[];
}
