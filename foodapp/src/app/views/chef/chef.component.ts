import { Component, ElementRef, OnInit ,ViewChild , Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  

  @ViewChild('mySidebar') mySidebar:ElementRef;
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
  @ViewChild('closeMenu') closeMenu:ElementRef
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
  }
  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(["/auth"]);    
  }
  
  constructor( 
               private renderer:Renderer2,
               private cookieService:CookieService,
               private router:Router,        
              ){}
  ngOnInit(): void {
    

  }
  
}
