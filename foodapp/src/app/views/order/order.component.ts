import { Component, OnInit, Renderer2 } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonserviceService } from 'src/services/commonservice/commonservice.service';
import { MessageService } from 'src/services/message/message.service';

import { Router } from "@angular/router";
import { OrdersService } from 'src/services/orders/orders.service';

// import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import {  Observable } from 'rxjs';
// import { AuthheadersService } from 'src/services/authheaders/authheaders.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  menues:any = [];
  orderForm:FormGroup;
  myOrders:any=[];
  value:any;
  qty=0;
  


  order() {
    this.orderForm = this.fb.group({
    order :new FormControl('', Validators.required),
    givenPayment :new FormControl('', Validators.required),
    
    })
  }
  constructor(
    private fb: FormBuilder,private CookieService:CookieService,private OrdersService:OrdersService,private router:Router,private renderer: Renderer2,private MessageService:MessageService,private CommonService:CommonserviceService
  ) {

    this.order();
    // debugger;
    this.menues = JSON.parse(localStorage.getItem('list_of_menues'));
    // this.getMenue();
    
  }
  getMenue(){
    // this.OrdersService.getMenues().subscribe(
    //   (data) => {
    //    console.log(data)
    //   //  this.menues=
    //     this.menues=data.list_of_menues;
    //     // localStorage.setItem('list_of_menues',JSON.stringify(this.menues));
    //     localStorage.setItem('list_of_menues',JSON.stringify(this.menues));
    //             console.log(localStorage.getItem('list_of_menues'))
    //   },
    //   error => {
    //     this.MessageService.error('Warning','Session Expired');
    //     this.MessageService.cancelSound();
    //     this.router.navigate(["/auth"]);
       
    //   }
    // );
  }
  ngOnInit(): void {
    this.CommonService.myOrdersSockets().subscribe((data)=>{

       this.myOrders = data.myOrders
     })
  }


  createOrder(value: { order: any; givenPayment: any; }){
    let data = {
      'email':value.order,
      'givenPayment':value.givenPayment,
    }


    this.OrdersService.orderBook(data).subscribe((data)=>{

      console.log('dasda',data);
      debugger;
      if(data.code==200){
        this.MessageService.successSound();
        this.MessageService.success('Success','Login Successfully.');
       if(data.user_token=='chef'){
        this.CookieService.set('user_token',data.user_token);
        this.CookieService.set('token',data.token);
        this.router.navigateByUrl("/chef");
       }else if(data.user_token=='user'){
        this.CookieService.set('user_token',data.user_token);
        this.CookieService.set('token',data.token);
        this.router.navigateByUrl("/order");
       }
      }
      // this.CookieService.set('role', 'Hello World' );
      // this.CookieService.set('token', 'Hello World' );
      // if(data.success==true){
      //   this.ToastMessageService.success('Success','Category Added Successfully');
      //   this.ToastMessageService.successSound();
      //   this.getCategory();
      //   this.table.renderRows();
      // }else{
      //   this.ToastMessageService.error('Error','Something went wrong.');
      // }

    },
    error => {
      this.MessageService.cancelSound();
      this.MessageService.error('Error','Email Already Exist.');
      // if(error.status==422){
      //   console.log('errr',error);
      //   this.ToastMessageService.error(error.error.errors.category_name,'Error');
      // }else{
      //   this.ToastMessageService.error('Some Server Error!','Error!');
      // }
    },
    );
  }
  
   increaseCount(menue) {
    //  debugger
    menue.value += 1;
    let ss =  JSON.parse(localStorage.getItem('list_of_menues'));
      let data = ss.filter(x => x.id== menue.id);

      data[0].value = menue.value
      localStorage.setItem('value',this.menues.value)
      

    
  }
  
   decreaseCount(menue) {
      if(menue.value<=0){
        menue.value;

        
      }  
      else{
        menue.value -=1;
      }
    
  }   
  
}