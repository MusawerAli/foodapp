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
     this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `block`);
  }
  @ViewChild('closeMenu') closeMenu:ElementRef
  @ViewChild('timesCancel') timesCancel:ElementRef
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
    this.renderer.setStyle(this.mySidebar.nativeElement,'display','none')
  }
  logOut(){
    
    this.cookieService.deleteAll();
    this.router.navigate(["/auth"]);
    
  }
  goToMenue(){
    this.router.navigate(['/chef/chef'])
  }
  constructor(private renderer:Renderer2, private cookieService:CookieService,private router:Router ) { }

  ngOnInit(): void {
    

  }

}
