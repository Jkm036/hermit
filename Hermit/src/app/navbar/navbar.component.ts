import { Component,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host:{
    "(window:click)" :  "closeSubMenu()"
  }
})
export class NavbarComponent {
  @Output('toggleLeftSubMenu') toggleLSM = new EventEmitter();
 menuOpen:boolean=false;
 
  closeSubMenu(){
    this.menuOpen=false;
  }
 toggleSubMenu($event:any){
  $event.stopPropagation();
  this.menuOpen=!this.menuOpen;
  console.log(this.menuOpen);
 }
 toggleLeftSubMenu(){
this.toggleLSM.emit();
 }

}
