import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent implements OnInit {
  currentFormAction: string = 'accreditation';
  isSidebarCollapsed: boolean = false;
  navList!: { name: string, label: string, action: () => void }[];

  ngOnInit(): void {
    this.navList = [
      {
        name: 'accreditation',
        label: 'Accreditation',
        action: () => {
          this.setCurrentForm('accreditation');
        }
      },
      {
        name: 'css',
        label: 'Comprehensive Support System',
        action: () => {
          this.setCurrentForm('css');
        }
      },
      {
        name: 'sftpos',
        label: 'Subcontracting for the Provision of Services - MSAA',
        action: () => {
          this.setCurrentForm('sftpos');
        }
      }, 
      {
        name: 'qi',
        label: 'Quality Improvement',
        action: () => {
          this.setCurrentForm('qi');
        }
      },
      {
        name: 'faa',
        label: 'Finance & Administration',
        action: () => {
          this.setCurrentForm('faa');
        }
      },
      {
        name: 'hpac',
        label: 'Healthy Parenting and Childhood',
        action: () => {
          this.setCurrentForm('hpac');
        }
      },
      {
        name: 'atphc',
        label: 'Access to Primary Health Care',
        action: () => {
          this.setCurrentForm('atphc');
        }
      },
      {
        name: 'yeae',
        label: 'Youth Education & Empowerment',
        action: () => {
          this.setCurrentForm('yeae');
        }
      },
      {
        name: 'cc',
        label: 'Cross-Cutting',
        action: () => {
          this.setCurrentForm('cc');
        }
      },
      {
        name: 'dcr',
        label: 'Department/Category Restructure',
        action: () => {
          this.setCurrentForm('dcr');
        }
      }
    ]
  }

  setCurrentForm(action: string): void {
    this.currentFormAction = action;
  }
}
