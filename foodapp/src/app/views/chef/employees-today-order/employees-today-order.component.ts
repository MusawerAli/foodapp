import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MessageService } from 'src/services/message/message.service';
import { ChefService } from 'src/services/chef/chef.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-employees-today-order',
  templateUrl: './employees-today-order.component.html',
  styleUrls: ['./employees-today-order.component.css']
})
export class EmployeesTodayOrderComponent implements OnInit {
  todayDate:string="";
  myDate = new Date();
  checkOrdersLIst:any = [];
  @ViewChild('table') table:ElementRef;
   doc = new jsPDF();




  constructor(
              private ChefService:ChefService,
               private datePipe: DatePipe,
               private MessageService:MessageService,
               private cookieService:CookieService,
               private router:Router,
            ){
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.checkOrders();
   }

  ngOnInit(): void {
  }

  checkOrders(){    
    let  data = {"from_date":"2021-07-26","to_date":"2021-08-02","type":"A","status":"A"}
    this.ChefService.checkOrders(data).subscribe(
      (data) => {
        if(data.code==200){
          this.checkOrdersLIst=data.data;
        }else{
          this.MessageService.error('Warning','Something went wrong error 255');
          this.MessageService.cancelSound();
        }
      },
      () => {
        this.MessageService.error('Warning','Something went wrong error 256');
        this.MessageService.cancelSound();
        this.cookieService.deleteAll();
        this.router.navigateByUrl('/auth');
      }
    );
  }
  generatePdf(){
    const doc = new jsPDF();
    autoTable(doc,{ html: this.table.nativeElement });
    doc.save('table.pdf');
  }
  
}
