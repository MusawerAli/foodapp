import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { ReplaySubject , Observable } from 'rxjs';
import { AuthheadersService } from '../authheaders/authheaders.service';
import { ApiEndpoints } from 'src/emums/api-endpoints';

import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private http: HttpClient,private AuthheadersService:AuthheadersService,private socket: Socket) { }

  todayChildMyOrder = new Subject<any>();
  refreshFun = new Subject<any>();

  childMyOrder(value){
    this.todayChildMyOrder.next(value);
  }
  getRefresh(value){
    this.refreshFun.next(value);
  }


  getMyOrders(){
    let response =  this.http.get(environment.apiUrl+'getwaitingRooms',{ headers: this.AuthheadersService.createHeader()}).toPromise();
    return response;
  }


  myOrdersSockets() {
    return this.socket.fromEvent('myOrders').pipe(map((data: any) => data))
  }
  getListSocket(){
    return this.socket.fromEvent('getListSocket').pipe(map((data: any) => data))
  }
}
