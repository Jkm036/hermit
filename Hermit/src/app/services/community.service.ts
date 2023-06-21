import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// export interface Guild {
//   guildName: string;
//   guildImage: string;
//   guildIcon: string;
// }

@Injectable()
export class CommunityService {

  private statusSource = new BehaviorSubject(''); // set default status
  currentStatus = this.statusSource.asObservable();

  constructor() { }

  /**
   * This will set the current name of the community serivice to status.
   * 
   * @param status The name of the community 
   */
  changeStatus(status: string) {
    this.statusSource.next(status)
  }
}
