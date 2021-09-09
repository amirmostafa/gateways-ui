import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gateway} from '../models/gateway';
import {Pagination} from '../models/pagination';
import {ResultSet} from '../models/resultSet';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  url = 'gateways';

  constructor(private http: HttpClient) {
  }

  listGateways(pagniation: Pagination) {
    const params = new HttpParams()
      .append('page', pagniation.page.toString())
      .append('size', pagniation.size.toString());

    return this.http.get<ResultSet<Gateway>>(this.url, {params});
  }

  getGatewayDetails(serialNumber: string) {
    return this.http.get<Gateway>(`${this.url}/${serialNumber}`);
  }

  createGateway(gateway: Gateway) {
    return this.http.post(this.url, gateway);
  }

  updateGateway(gateway: Gateway) {
    return this.http.put(this.url, gateway);
  }

  deleteGateway(serialNumber: string) {
    return this.http.delete(`${this.url}/${serialNumber}`);
  }
}
