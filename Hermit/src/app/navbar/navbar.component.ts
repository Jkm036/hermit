import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host:{
    "(window:click)" :  "closeSubMenu()"
  }
})
export class NavbarComponent {
 menuOpen:boolean=false;
  
  closeSubMenu(){
    this.menuOpen=false;
  }
 toggleSubMenu($event:any){
  $event.stopPropagation();
  this.menuOpen=!this.menuOpen;
  console.log(this.menuOpen);
 }
}
