import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  date=new Date().toJSON().slice(0,10);

  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(["/auth"]);    
  }
  constructor(private cookieService:CookieService,
              private router:Router,
            ) { }

  ngOnInit(): void {
  }

}
