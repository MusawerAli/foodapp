import { Component, OnInit } from '@angular/core';
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
  userProfileData:any;
  date=new Date().toJSON().slice(0,10);





  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(["/auth"]);    
  }
  constructor(private cookieService:CookieService,
              private router:Router,
              private orderService:OrdersService,
              private messageService:MessageService,
            ){ 
              this.userProfile();
              
            }

  ngOnInit(): void {
    
  }
  userProfile(){
    this.orderService.userProfile().subscribe(
      (data)=>{
        if(data.code!=undefined && data.code==200){
          this.userProfileData = data.data;
        }        
      },
      error => {
        this.messageService.error('Warning','Something went wrong error 256');
        this.messageService.cancelSound();
        // this.cookieService.deleteAll();
        // this.router.navigateByUrl[('/auth')];
      }
    )
  } 
  

}
