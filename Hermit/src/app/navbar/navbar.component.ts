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
  @Output('toggleLeftSubMenu')     toggleLSM  = new EventEmitter();
  @Output('toggleCreateCommunity') toggleCC?  = new EventEmitter();
  @Output('toggleSettings')        toggleS?   = new EventEmitter();
  @Output('toggleHome')            toggleH?   = new EventEmitter();

 menuOpen:boolean=false;
 
  closeSubMenu(){
    this.menuOpen=false;
  }
 toggleSubMenu($event:any){
  $event.stopPropagation();
  this.menuOpen=!this.menuOpen;
  console.log(this.menuOpen);
 }

 toggleCCEvent(){
  this.toggleCC.emit();
 }

 toggleSEvent(){
  this.toggleS.emit();
 }
 toggleLeftSubMenu(){
this.toggleLSM.emit();
 }
 toggleHEvent(){
  this.toggleH.emit();
 }

}
