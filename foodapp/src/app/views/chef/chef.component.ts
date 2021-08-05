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
  @ViewChild('closeMenu') closeMenu:ElementRef
  
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
  }

  
  constructor( 
               private renderer:Renderer2,
               private cookieService:CookieService,
               private router:Router,        
              ){}
  ngOnInit(): void {
    

  }
  
}
