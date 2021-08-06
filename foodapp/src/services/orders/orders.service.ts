import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthheadersService } from '../authheaders/authheaders.service';
import { ApiEndpoints } from 'src/emums/api-endpoints';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,
    private getHeader: AuthheadersService) { }

    bookOrder(data):Observable<any>{
    return this.http.post(environment.apiUrl + ApiEndpoints.bookOrder,data,{ headers: this.getHeader.createAuthHeader()});
    }

  getMenues():Observable<any>{
    return this.http.get(environment.apiUrl + 'getMenuesList',{ headers: this.getHeader.createAuthHeader()});
  }

  getMyOrder(data):Observable<any>{
    return this.http.post(environment.apiUrl + ApiEndpoints.getMyOrder,data,{ headers: this.getHeader.createAuthHeader()});
    }
}
