//#region Imports

import { Component } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';

//#endregion

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  //#region Constructor

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
  ) {
  }

  //#endregion

  //#region Public Properties

  public user = {
    name: 'Admin',
    imageUrl: 'assets/images/user-image.png',
  };

  //#endregion

  //#region Public Methods

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  public navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }

  //#endregion

}
