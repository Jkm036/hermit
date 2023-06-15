import { Component ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  @Input('sideMenuOpen') sideMenuOpen:boolean=true;
  toggleSideMenu(){
    this.sideMenuOpen=!this.sideMenuOpen;
   }
}
