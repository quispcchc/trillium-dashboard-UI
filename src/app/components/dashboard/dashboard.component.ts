import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedTab!: string;
  tabList!: { name: string, label: string, img: string, action: () => void }[] | undefined;
  accessibleTabs: string  | null | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadTabs();
  }

  loadTabs(): void {
    const tabs = [
      {
        name: 'eo',
        label: 'Executive Overview',
        img: 'eo-icon.svg',
        action: () => {
          this.changeTab('eo');
        }
      },
      {
        name: 'phc',
        label: 'PHC',
        img: 'qca-icon.svg',
        action: () => {
          this.changeTab('phc');
        }
      },
      {
        name: 'qca',
        label: 'QCA',
        img: 'qca-icon.svg',
        action: () => {
          this.changeTab('qca');
        }
      },
      {
        name: 'op',
        label: 'Operational Plan',
        img: 'op-icon.svg',
        action: () => {
          this.changeTab('op');
        }
      },
      {
        name: 'ib',
        label: 'Impact Blueprint',
        img: 'impact-icon.svg',
        action: () => {
          this.changeTab('ib');
        }
      },
      {
        name: 'dataentry',
        label: 'Data Entry',
        img: 'data-entry-icon.svg',
        action: () => {
          this.changeTab('dataentry');
        }
      },
      {
        name: 'admin',
        label: 'Admin',
        img: 'admin-icon.svg',
        action: () => {
          this.changeTab('admin');
        }
      }
    ];
    this.accessibleTabs = localStorage.getItem('accessible_tabs');
    const accessibleTabsArray: string[] = this.accessibleTabs ? this.accessibleTabs.split(',') : [];

    const accessibleTabsObj: {[index: string]:any} = {};

    accessibleTabsArray.forEach((tab) => {
      accessibleTabsObj[tab] = tab;
    })

    this.tabList = tabs.filter((tab) => {
      if (tab.label === 'Executive Overview') {
        return 'Executive Overview' in accessibleTabsObj;
      }
      return tab.label in accessibleTabsObj;
    });

    this.selectedTab = this.tabList[0]?.name || '';

  }

  changeTab(tab: string): void {
    this.selectedTab = tab;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
