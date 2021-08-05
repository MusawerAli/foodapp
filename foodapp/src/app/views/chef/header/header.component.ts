import { Component, OnInit,Renderer2,ViewChild,ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mySidebar') mySidebar:ElementRef;

  date=new Date().toJSON().slice(0,10);
  constructor(
              private renderer:Renderer2,
              private cookieService:CookieService,
              private router:Router,
  ) { }

  ngOnInit(): void {
  }
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
  }

  w3_open(){
    //this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `block`);
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

}
