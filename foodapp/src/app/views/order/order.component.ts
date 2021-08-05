import { Component, Input, OnInit,AfterViewInit, Renderer2,TemplateRef, ViewChild } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonserviceService } from 'src/services/commonservice/commonservice.service';
import { MessageService } from 'src/services/message/message.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { OrdersService } from 'src/services/orders/orders.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

import { ChefService } from 'src/services/chef/chef.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [DatePipe]
})
export class OrderComponent implements OnInit,AfterViewInit {

  date=new Date().toJSON().slice(0,10);


  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  // @Input('childtodayOrderData') childtodayOrderData:any;

  modalRef: BsModalRef | null;
  menues:any = [];
  orderForm:FormGroup;
  myOrders:any=[];
  local_cart:any = [];
  value:any;
  qty=0;
  todayDate:string="";
  myDate = new Date();
  total=0;
  initialAmount = 0;
  form:FormGroup;
  childtodayData:any=[];
  orderListDatails:any=[];
  config: any = { backdrop: "static", keyboard: false,};
  //total calculation of order function
  reducer = (acc, cur) => {
    return acc + (Number(cur.qty) * Number(cur.price));
   };

//create form
createForm() {
  this.form = this.fb.group({
  initialAmount :new FormControl('', [Validators.required,Validators.min(this.total)]),
  })
}

  order() {
    this.orderForm = this.fb.group({
    order :new FormControl('', Validators.required),
    givenPayment :new FormControl('', Validators.required),

    })
  }
  constructor(
              private spinnerService: NgxSpinnerService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private CookieService:CookieService,
              private OrdersService:OrdersService,
              private router:Router,
              private MessageService:MessageService,
              private datePipe: DatePipe,
              private CommonService:CommonserviceService,
              private ChefService:ChefService
  ) {
    this.local_cart = JSON.parse(localStorage.getItem('cart'));
    
    this.total = (this.local_cart!=null)?this.local_cart.reduce(this.reducer,0):0;
    console.log(this.total)
    this.CommonService.todayChildMyOrder.subscribe((data) => {
      this.childtodayData = data;
      console.warn('childtodayOrderData',data)
    })
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.createForm();
    this.order();
    this.menues = JSON.parse(localStorage.getItem('list_of_menues'));
     this.getMenue();
     console.warn('this.childtodayData',this.childtodayData)
  }
  ngAfterViewInit(): void {

  }
  getMenue(){
    this.OrdersService.getMenues().subscribe(
      (data) => {
       console.log(data)
        this.menues=data.list_of_menues;
        localStorage.setItem('list_of_menues',JSON.stringify(this.menues));
                console.log(localStorage.getItem('list_of_menues'))
      },
      error => {
        this.MessageService.error('Warning','Session Expired');
        this.MessageService.cancelSound();
        this.router.navigate(["/auth"]);

      }
    );
  }
  ngOnInit(): void {




    this.CommonService.myOrdersSockets().subscribe((data)=>{

       this.myOrders = data.myOrders
       this.getSum(this.myOrders);

     })
  }

  checkout(){



    this.modalRef = this.modalService.show(this.template,this.config)




  }

  sendOrder(form_value){
    let cart =  localStorage.getItem('cart');
    let cart_data = {
      'initialAmount':form_value.initialAmount,
      'cart':cart,
      'date':this.todayDate,
      'total':this.total
    }
    this.spinnerService.show();
  this.OrdersService.bookOrder(cart_data).subscribe((data)=>{
   if(data.code==200){
     this.CommonService.getRefresh(true);
    this.spinnerService.hide();
    this.modalRef.hide();
    this.MessageService.successSound();
    this.MessageService.success('Success','Order Created Successfully.');
   }
   },
   
   error => {
     if(error.status==401){
      this.CookieService.delete('token');
      this.CookieService.delete('user_token');
      this.MessageService.cancelSound();
      this.MessageService.error('Error','Session Expired');
      this.router.navigateByUrl('auth/login');
     }



  },
  )
  }


   increaseCount(menue) {
     if(this.childtodayData==undefined){
        let dat = JSON.parse(localStorage.getItem('cart'));
        let obj:any=  {};
        let cart:any=[];
        let qty = menue.qty+1;
        obj['description'] = menue.description;
        obj['id'] = menue.id;
        obj['menue'] = menue.menue;
        obj['price'] = menue.price;
        obj['total'] = menue.price*qty;
        obj['qty'] = qty;
        if(dat==null){
        cart.push(obj)

        localStorage.setItem('cart',JSON.stringify(cart))
        this.local_cart = cart;

      }else{
        let chk_if = dat.filter(a=>a.id===menue.id);
      if(chk_if.length==0){
          dat.push(obj);
      }else{

        let qty = menue.qty+1;
        chk_if[0].qty = qty;
        chk_if[0].price = menue.price;
        chk_if[0].total = qty*menue.price;

        localStorage.setItem('cart',JSON.stringify(chk_if))

      }


    localStorage.setItem('cart',JSON.stringify(dat))
    this.total = dat.reduce(this.reducer,0);
    this.local_cart = dat;
  }

    menue.qty += 1;
    let ss =  JSON.parse(localStorage.getItem('list_of_menues'));
      let data = ss.filter(x => x.id== menue.id);

      data[0].qty = menue.qty;
      localStorage.setItem('value',menue.qty)

     }else{
      this.MessageService.cancelSound();
      this.MessageService.error('Error','your Today order are placed');
     }

  }

  decreaseCount(menue) {
    if(menue.qty>0){
      if(this.childtodayData==undefined){
        let dat = JSON.parse(localStorage.getItem('cart'));
        let obj:any=  {};
        let cart:any=[];
        let qty = menue.qty+1;
        obj['description'] = menue.description;
        obj['id'] = menue.id;
        obj['menue'] = menue.menue;
        obj['price'] = menue.price;
        obj['total'] = menue.price*qty;
        obj['qty'] = qty;
      if(dat==null){
        cart.push(obj)
  
        localStorage.setItem('cart',JSON.stringify(cart))
        this.local_cart = cart;
  
      }else{
        let chk_if = dat.filter(a=>a.id===menue.id);
      if(chk_if.length==0){
          dat.push(obj);
      }else{
  
        let qty = menue.qty-1;
        
        chk_if[0].qty = qty;
        chk_if[0].price = menue.price;
        chk_if[0].total = qty*menue.price;
  
        localStorage.setItem('cart',JSON.stringify(chk_if))
  
      }
  
  
    localStorage.setItem('cart',JSON.stringify(dat))
    this.total = dat.reduce(this.reducer,0);
    this.local_cart = dat;
  }
  
    menue.qty -= 1;
    let ss =  JSON.parse(localStorage.getItem('list_of_menues'));
      let data = ss.filter(x => x.id== menue.id);
  
      data[0].qty = menue.qty;
      localStorage.setItem('value',menue.qty)
  
     }
    else{
      this.MessageService.cancelSound();
      this.MessageService.error('Error','your Today order are placed');
     }
    }else{
      this.MessageService.cancelSound();
      this.MessageService.error('Error','Minimum qty is 1');
    }
  }
  getSum(array){
    return array.reduce((accum,item) => accum + item.price, 0);
  }

  // todayOrderData($event){
  //  this.childtodayData = $event;
  //  console.warn('childtodayData',this.childtodayData)
  // }


  checkOrders(){    
    let  data = {"from_date":"2021-07-26","to_date":"2021-08-02","type":"A","status":"A"}
    this.ChefService.checkOrders(data).subscribe(
      (data) => {
       console.log(data.code)
        if(data.code==200){
          this.orderListDatails=data.data;
        }else{
          this.MessageService.error('Warning','Something went wrong error 255');
          this.MessageService.cancelSound();
          // this.CookieService.deleteAll();
          // this.router.navigateByUrl('/auth');
        }
      },
      error => {
        this.MessageService.error('Warning','Something went wrong error 256');
        this.MessageService.cancelSound();
        // this.CookieService.deleteAll();
        // this.router.navigateByUrl('/auth');
      }
    );
  }

}
