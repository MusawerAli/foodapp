import { Component, OnInit,ViewChild,Renderer2  } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { ChefService } from 'src/services/chef/chef.service';
import { AddComponent } from './dialog/add/add.component';
import { MessageService } from 'src/services/message/message.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
export interface MenueData {
  id:any,
  menue:any,
  description:any,
  price:any,
  qty:any,
  preview:any,
}

@Component({
  selector: 'app-menue',
  templateUrl: './menue.component.html',
  styleUrls: ['./menue.component.css']
})

export class MenueComponent implements OnInit {
  
  menues:any = [];
  displayedColumns: string[] = ['id','menue','description','price','action','image'];
  dataSource: MatTableDataSource<MenueData>;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
              public dialog: MatDialog,
              private ChefService:ChefService,
              private MessageService:MessageService, 
              private router:Router,
              private renderer:Renderer2,
              private cookieService:CookieService
              ) { }
  ngOnInit(){
  }

  
  getMenue(){
    this.ChefService.getMenues().subscribe(
      (data) => {
      
        this.menues=data.list_of_menues;
        this.dataSource = new MatTableDataSource(this.menues);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.dataSource);
          console.log(this.menues)
      },
      error => {
        this.MessageService.error('Warning','Session Expired');
        this.MessageService.cancelSound();
        this.router.navigate(["/auth"]);
       
      }
      
    );
  }
  ngAfterViewInit(){
    this.getMenue();
  }
  openDialog(action,obj) {
    console.log(action,obj);
    obj.action = action;
    const dialogRef = this.dialog.open(AddComponent, {
      width: '550px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result!=undefined && result.action == 'Add'){
       
        this.addRowData(result.data);
      }
    });


  }
  // deleteDialog(action,obj){
  //   debugger;
  //   console.log("this is working");
  // }

  addRowData(row_obj){
    let form_data = {
      "menue":row_obj.menue,
      "description":row_obj.description,
      "qty":row_obj.qty,
      "price":row_obj.price,
  }
    this.ChefService.createMenue(form_data).subscribe((data)=>{
      console.log('dasda',data);
      // if(data.success==true){
      //   this.ToastMessageService.success('Success','Size Added Successfully');
      //   this.ToastMessageService.successSound();
      //   this.getSize();
      //   this.table.renderRows();
      // }else{
      //   this.ToastMessageService.cancelSound();
      //   this.ToastMessageService.error('Error','Something went wrong.');
      // }

    },
    error => {
      // this.MessageService.cancelSound();

    //   if(error.status==422){
    //     console.log('errr',error);
    //     this.ToastMessageService.cancelSound();
    //     this.ToastMessageService.error(error.error.errors.name,'Error');
    //   }else{
    //     this.ToastMessageService.cancelSound();
    //     this.ToastMessageService.error('Some Server Error!','Error!');
    //   }

    },

    );
    

    

  
}
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    
     
}
