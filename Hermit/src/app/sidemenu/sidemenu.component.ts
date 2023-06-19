import { Component ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  @Input('sideMenuOpen') sideMenuOpen:boolean=true;
  @Output('toggleHome') toggleH? = new EventEmitter
  toggleSideMenu(){
    this.sideMenuOpen=!this.sideMenuOpen;
   }
   
  toggleHEvent(){
    this.toggleH.emit();

   }
}
