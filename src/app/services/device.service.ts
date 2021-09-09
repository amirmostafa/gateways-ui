import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Device} from '../models/device';
import {DeviceStatus} from '../enums/device-status.enum';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  url = 'devices';

  constructor(private http: HttpClient) {
  }

  listDevices(serialNumber: string) {
    const params = new HttpParams().append('gatewaySerialNumber', serialNumber);
    return this.http.get<Device[]>(this.url, {params});
  }

  createDevice(device: Device) {
    return this.http.post(this.url, device);
  }

  updateDevice(device: Device) {
    return this.http.put(this.url, device);
  }

  updateDeviceStatus(uuid: number, deviceStatus: DeviceStatus) {
    return this.http.put(`${this.url}/${uuid}/${deviceStatus}`, {});
  }

  deleteDevice(uuid: number) {
    return this.http.delete(`${this.url}/${uuid}`);
  }
}
