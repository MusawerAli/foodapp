import { Component, OnInit, Renderer2,TemplateRef, ViewChild } from '@angular/core';
import {FormControl, Validators,FormGroup,FormBuilder} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonserviceService } from 'src/services/commonservice/commonservice.service';
import { MessageService } from 'src/services/message/message.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { OrdersService } from 'src/services/orders/orders.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [DatePipe]
})
export class OrderComponent implements OnInit {
  @ViewChild('template', { static: false }) template: TemplateRef<any>;


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
    private fb: FormBuilder,private CookieService:CookieService,private OrdersService:OrdersService,private router:Router,private renderer: Renderer2,private MessageService:MessageService,private datePipe: DatePipe,private CommonService:CommonserviceService
  ) {

    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.createForm();
    this.order();
    this.menues = JSON.parse(localStorage.getItem('list_of_menues'));
     this.getMenue();

  }
  getMenue(){
    this.OrdersService.getMenues().subscribe(
      (data) => {
       console.log(data)
      //  this.menues=
        this.menues=data.list_of_menues;
        // localStorage.setItem('list_of_menues',JSON.stringify(this.menues));
        localStorage.setItem('list_of_menues',JSON.stringify(this.menues));
                console.log(localStorage.getItem('list_of_menues'))
      },
      error => {
        debugger;
        this.MessageService.error('Warning','Session Expired');
        this.MessageService.cancelSound();
        this.router.navigate(["/auth"]);

      }
    );
  }
  ngOnInit(): void {
    this.local_cart = JSON.parse(localStorage.getItem('cart'));
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
      'date':this.todayDate
    }
    debugger;
    this.spinnerService.show();
  this.OrdersService.bookOrder(cart_data).subscribe((data)=>{
   if(data.code==200){
    this.MessageService.successSound();
    this.MessageService.success('Success','Order Created Successfully.');
   }
   },
   error => {
     if(error.status==401){
      debugger;
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
     debugger
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
        // this.local_cart = dat;

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



  }

  decreaseCount(menue) {
    if(menue.qty<=0){
      menue.qty;
      let ss =  JSON.parse(localStorage.getItem('list_of_menues'));
      let data = ss.filter(x => x.id== menue.id);
      data[0].qty = menue.qty;
      localStorage.setItem('cart',menue.qty)
    }
    else{
    menue.qty -=1;
    let ss =  JSON.parse(localStorage.getItem('list_of_menues'));
    let data = ss.filter(x => x.id== menue.id);
    data[0].qty = menue.qty;
    localStorage.setItem('value',menue.qty)
    }
  }
  getSum(array){
    return array.reduce((accum,item) => accum + item.price, 0);
  }
}
// function price(price: any, arg1: string) {
//   throw new Error('Function not implemented.');
// }
