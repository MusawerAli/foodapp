import { Component, ElementRef, OnInit ,ViewChild , Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  @ViewChild('mySidebar') mySidebar:ElementRef;
//  @ViewChild('myOverlay') myOverlay:ElementRef;
  w3_open(){
     this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `block`);
  }
  @ViewChild('closeMenu') closeMenu:ElementRef
  @ViewChild('timesCancel') timesCancel:ElementRef
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
    this.renderer.setStyle(this.mySidebar.nativeElement,'display','none')
  }
   

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    

  }

}
