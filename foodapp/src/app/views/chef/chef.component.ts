import { Component, ElementRef, OnInit ,ViewChild , Renderer2 } from '@angular/core';
// import jsPDF from 'jspdf';
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  @ViewChild('mySidebar') mySidebar:ElementRef;
  @ViewChild('closeMenu') closeMenu:ElementRef
  // @ViewChild('table_data') table_data:ElementRef;
  w3_close(){
    this.renderer.setStyle(this.mySidebar.nativeElement, 'display', `none`);
  }

  // generatePdf(){
  //   let  doc=new jsPDF();
  //   let data=this.table_data
  //   console.log(data)
  //   // doc.text(data,15,15);
  //   // doc.save('first.pdf');
  // }
  
  constructor( 
               private renderer:Renderer2,        
              ){}
  ngOnInit(): void {}

}
