import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { AuthService } from '../../../@core/services/auth.service';
import { HttpService } from '../../../@core/services/http.service';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;

  user: any;
  userMenu: any;
  userId: string;
  instituteName: string;

  notifications: any = 'No Notification';
  notificationCount: number = 0;
  LoginId: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'material-dark',
      name: 'Dark+',
    },
  ];

  currentTheme = 'default';


  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private service: AuthService,
    private httpService: HttpService,
    private layoutService: LayoutService,
    private rippleService: RippleService,
  ) {
    this.LoginId = sessionStorage.getItem('id');

    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  ngOnInit() {
    this.userId = this.getLoggedInUserId();
    this.loadProfileImage();
    this.user = { name: this.getLoggedInUserFullName() };
    this.instituteName = this.service.getInstitutionDetails().instituteName;
    this.currentTheme = this.themeService.currentTheme;

    this.userMenu = [
      { title: 'View Profile', icon: 'person-outline', 
      // url: '/#/pages/users/user-profile?id=' + this.userId
     },
      { title: 'Profile Image', icon: 'image-outline',
      // url: '/#/pages/users/profile-image?id=' + this.userId
     }
      ,
      { title: 'Change Password', icon: 'edit-2-outline', link: '../auth/change-password' },
      { title: 'Log out', icon: 'power-outline', link: '../auth/login' },
    ];

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    this.httpService.post('users/Theme/' + this.userId + '?ThemeName=' + themeName, null, null).subscribe(response => {
    }, (error) => {});
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  getLoggedInUserId() {
    if (sessionStorage.getItem('id')) {
      return sessionStorage.getItem('id');
    }
  }

  getLoggedInUserFullName() {
    if (sessionStorage.getItem('userFullName')) {
      return sessionStorage.getItem('userFullName');
    }
  }

  loadProfileImage() {
    this.httpService.get('Users/Get/' + this.userId, null).subscribe((response) => {
      if (response.theme != null) {
        this.themeService.changeTheme(response.theme);
       }
      this.user.picture = this.httpService.mediaPath(response.profileImageUrl);
    }, (error) => {
      // this.toastr.error(error.error);
    });
  }

}
