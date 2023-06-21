import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../services/community.service';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent {
  @Input('sideMenuOpen') sideMenuOpen: boolean = true;
  @Output('toggleHome') toggleH?= new EventEmitter
  @Input() name: string = ''
  status: string = '';

  constructor(private data: CommunityService) { }
  toggleSideMenu() {
    this.sideMenuOpen = !this.sideMenuOpen;
  }

  toggleHEvent() {
    this.toggleH.emit();

  }

  /**
   * Whenever the user clicks on a community on the sidemenu, it will trigger this 
   * init and read the name of the status. 
   */
  ngOnInit() {
    this.data.currentStatus.subscribe(status => this.status = status)
  }

  /**
   * This function will set the name of the community to the service.
   * 
   * @param guildName The name of the community 
   */
  changeStatus(guildName: string) {
    this.data.changeStatus(guildName)
  }

}
