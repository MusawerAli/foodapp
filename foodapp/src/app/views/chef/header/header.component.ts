import { Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/services/orders/orders.service';
import { MessageService } from 'src/services/message/message.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mySidebar') mySidebar:ElementRef;
  userProfileData:any;
  date=new Date().toJSON().slice(0,10);
  constructor(
              private renderer:Renderer2,
              private cookieService:CookieService,
              private router:Router,
              private orderService:OrdersService,
              private messageService:MessageService,
            ){
              this.userProfile();
            }

  ngOnInit(): void {}
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
  }

  w3_open(){
   let x=document.getElementById("mySidebar");
   if(x.style.display=='none'){
    x.style.display= "block";
   }
   else{
     x.style.display="none"
   }
 }
 logOut(){
  this.cookieService.deleteAll();
  this.router.navigate(["/auth"]);    
}
  userProfile(){
    this.orderService.userProfile().subscribe(
      (data)=>{
        if(data.code!=undefined && data.code==200){
          this.userProfileData=data.data;
        }
      },
      error=>{
        this.messageService.error('warning','Something went wrong error 256');
        this.messageService.cancelSound();
        this.cookieService.deleteAll();
        this.router.navigateByUrl[('/auth')];
      }
      )
  }
}
