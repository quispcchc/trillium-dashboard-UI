import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent implements OnInit {
  currentFormAction: string = 'accreditation';
  isSidebarCollapsed: boolean = false;
  accessibleForms: string  | null | undefined;
  navList!: { name: string, label: string, action: () => void }[];

  ngOnInit(): void {

    this.accessibleForms = localStorage.getItem('accessible_forms');

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
        name: 'msaa',
        label: 'MSAA',
        action: () => {
          this.setCurrentForm('msaa');
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
      },
      {
        name: 'fs',
        label: 'Food Security',
        action: () => {
          this.setCurrentForm('fs');
        }
      },
      {
        name: 'aasss',
        label: 'Annual All Staff Satisfaction Survey',
        action: () => {
          this.setCurrentForm('aasss');
        }
      },
      {
        name: 'cd',
        label: 'Community Development',
        action: () => {
          this.setCurrentForm('cd');
        }
      },
      {
        name:'ces',
        label:'Client Experience Survey',
        action:() => {
          this.setCurrentForm('ces');
        }
      },
      {
        name:'cr',
        label:'Complaints Report',
        action:() => {
          this.setCurrentForm('cr');
        }
      },
      {
        name:'fls',
        label:'French Language Services',
        action:() => {
          this.setCurrentForm('fls');
        }
      },
      {
        name:'hr',
        label:'Human Resources',
        action:() => {
          this.setCurrentForm('hr');
        }
      },
      {
        name:'inmr',
        label:'Incident & Near Miss Reports',
        action:() => {
          this.setCurrentForm('inmr');
        }
      },
      {
        name:'por',
        label:'Privacy Officers Report',
        action:() => {
          this.setCurrentForm('por');
        }
      },
      {
        name:'sp',
        label:'Strategic Plans',
        action:() => {
          this.setCurrentForm('sp');
        }
      }
      
    ]
  }

  isFormAccessible(form: string): boolean {
    const accessibleFormsArray = this.accessibleForms ? this.accessibleForms.split(',').map(form => form.trim()) : [];
    return accessibleFormsArray.includes(form.trim());
  }  

  setCurrentForm(action: string): void {
    this.currentFormAction = action;
  }
}
