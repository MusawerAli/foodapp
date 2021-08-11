import { Component, OnInit,EventEmitter,Output,AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { OrdersService } from 'src/services/orders/orders.service';
import { MessageService } from 'src/services/message/message.service';
import { CommonserviceService } from 'src/services/commonservice/commonservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-today-order',
  templateUrl: './today-order.component.html',
  styleUrls: ['./today-order.component.css']
})
export class TodayOrderComponent implements OnInit {
  @Output() todayOrderData= new EventEmitter<any>();

  todayDate:string="";
  myDate = new Date();
  myOrders:any = []

  constructor(private CookieService:CookieService,private OrdersService:OrdersService,private datePipe: DatePipe,private MessageService:MessageService,private commonService:CommonserviceService,private router:Router) {
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.myOrder();
  }

  ngOnInit(): void {
    this.commonService.refreshFun.subscribe((data)=>{
      if(data==true){
        console.log('asdfasfdsadfa',data)
        this.myOrder();
      }

    })
  }

  myOrder(){
    let  data = {"type":"T","from_date":this.todayDate,"to_date":this.todayDate}
    this.OrdersService.getMyOrder(data).subscribe(
      (data) => {
      //  this.menues=
        if(data.code==200){
          this.myOrders=data.data[0];
          this.commonService.childMyOrder(data.data[0])
          // this.todayOrderData.emit(data.data[0]);
        }else{
          this.MessageService.error('Warning','Something went wrong error 255');
          this.MessageService.cancelSound();
        }
      },
      error => {
        this.MessageService.error('Warning','Something went wrong error 256');
        this.MessageService.cancelSound();
        this.CookieService.deleteAll();
        this.router.navigateByUrl('/auth');

      }
    );
  }

}
