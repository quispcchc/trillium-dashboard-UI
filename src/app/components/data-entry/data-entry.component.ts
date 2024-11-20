import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.css'
})
export class DataEntryComponent implements OnInit {
  currentFormAction: string = '';
  isSidebarCollapsed: boolean = false;
  accessibleForms: string  | null | undefined;
  formList!: { name: string, label: string, action: () => void, url?: SafeUrl }[];

  constructor(private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.accessibleForms = localStorage.getItem('accessible_forms');
    this.formList = this.filteredFormList();
    this.currentFormAction = this.formList[0]?.name || '';
  }

  filteredFormList() {
    const forms = [
      // {
      //   name: 'aphca',
      //   label: 'Access to Primary Health Care - ACT',
      //   url: 'https://forms.office.com/r/XH1tTmBwhA',
      //   action: () => {
      //     this.setCurrentForm('aphca');
      //   }
      // },
      // {
      //   name: 'aphcp',
      //   label: 'Access to Primary Health Care - PHC',
      //   url: 'https://forms.office.com/r/DDMDyGv9xm',
      //   action: () => {
      //     this.setCurrentForm('aphcp');
      //   }
      // },
      // {
      //   name: 'aphcpc',
      //   label: 'Access to Primary Health Care - PHC (by clinician/provider)',
      //   url: 'https://forms.office.com/r/Ms250Li0Fd',
      //   action: () => {
      //     this.setCurrentForm('aphcpc');
      //   }
      // },
      // {
      //   name: 'aa',
      //   label: "Accreditation - Ahmet",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('aa');
      //   }
      // },
      // {
      //   name: 'ap',
      //   label: "Accreditation - PCYS",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('ap');
      //   }
      // },
      // {
      //   name: 'aph',
      //   label: "Accreditation - PHC",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('aph');
      //   }
      // },
      {
        name: 'cd',
        label: "Community Development",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/Dgk3akZDkY'),
        action: () => {
          this.setCurrentForm('cd');
        }
      },
      {
        name: 'cssp',
        label: "Comprehensive Support System - Parent Child and Youth Services",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/Jjnfpjm6R6'),
        action: () => {
          this.setCurrentForm('cssp');
        }
      },
      {
        name: 'cssc',
        label: "Comprehensive Support System - Client Feedback Surveys",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/Y3U54w8ZQh'),
        action: () => {
          this.setCurrentForm('cssc');
        }
      },
      {
        name: 'cssa',
        label: "Comprehensive Support System - Assertive Community Treatment",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/8iZqUVmm5B'),
        action: () => {
          this.setCurrentForm('cssa');
        }
      },
      {
        name: 'csshpca',
        label: "Comprehensive Support System - Health Promotion and Counselling (Ahmet)",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/JVic9c6HPL'),
        action: () => {
          this.setCurrentForm('csshpca');
        }
      },
      {
        name: 'csshpco',
        label: "Comprehensive Support System - Health Promotion and Counselling (Omar)",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/mSHF3TjCP6'),
        action: () => {
          this.setCurrentForm('csshpco');
        }
      },
      {
        name: 'fa',
        label: "Finance & Administration",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/rsve1Haswt'),
        action: () => {
          this.setCurrentForm('fa');
        }
      },
      {
        name: 'fas',
        label: "Finance Annual Statement",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/cS1KxmxM92'),
        action: () => {
          this.setCurrentForm('fas');
        }
      },
      {
        name: 'fs',
        label: "Food Security",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/dbDmRZC2Sb'),
        action: () => {
          this.setCurrentForm('fs');
        }
      },
      {
        name: 'efc',
        label: "Emergency Food Cupboard",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/WJ2uWVBXMc'),
        action: () => {
          this.setCurrentForm('efc');
        }
      },
      {
        name: 'hpc',
        label: "Healthy Parenting and Childhood",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/STFWTnfmEA'),
        action: () => {
          this.setCurrentForm('hpc');
        }
      },
      {
        name: 'cchpc',
        label: "Cross-Cutting (Healthy Parenting and Childhood)",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/rmdHyyMuht'),
        action: () => {
          this.setCurrentForm('cchpc');
        }
      },
      // {
      //   name: 'hr1',
      //   label: "Human Resources (1)",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('hr1');
      //   }
      // },
      // {
      //   name: 'hr2',
      //   label: "Human Resources (2)",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('hr2');
      //   }
      // },
      // {
      //   name: 'hr3',
      //   label: "Human Resources (3)",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('hr3');
      //   }
      // },
      // {
      //   name: 'hr4',
      //   label: "Human Resources (4)",
      //   url: this.sanitizer.bypassSecurityTrustResourceUrl(''),
      //   action: () => {
      //     this.setCurrentForm('hr4');
      //   }
      // },
      {
        name: 'yee',
        label: "Youth Education & Empowerment",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/UmddC1r87Z'),
        action: () => {
          this.setCurrentForm('yee');
        }
      },
      {
        name: 'spsm',
        label: "Subcontracting for the Provision of Services - MSAA",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/ZhSE3vJACU'),
        action: () => {
          this.setCurrentForm('spsm');
        }
      },
      {
        name: 'msaa',
        label: "MSAA",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/H57KJ5f1Xq'),
        action: () => {
          this.setCurrentForm('msaa');
        }
      },
      {
        name: 'qi',
        label: "Quality Improvement",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/Vs9kuYR8Z3'),
        action: () => {
          this.setCurrentForm('qi');
        }
      },
      {
        name: 'ces',
        label: "Client Experience Survey",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/fH5aKs4Z8C'),
        action: () => {
          this.setCurrentForm('ces');
        }
      },
      {
        name: 'cr',
        label: "Complaints Report",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/LnLup411XP'),
        action: () => {
          this.setCurrentForm('cr');
        }
      },
      {
        name: 'fls',
        label: "French Language Services",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/ikX1u534Jw'),
        action: () => {
          this.setCurrentForm('fls');
        }
      },
      {
        name: 'hr',
        label: "Human Resources",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/XWqfydG816'),
        action: () => {
          this.setCurrentForm('hr');
        }
      },
      {
        name: 'inmr',
        label: "Incident & Near Miss Reports",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/rVZFYtLJ44'),
        action: () => {
          this.setCurrentForm('inmr');
        }
      },
      {
        name: 'por',
        label: "Privacy Officer's Report",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/sUtPtPUUPK'),
        action: () => {
          this.setCurrentForm('por');
        }
      },
      {
        name: 'sp',
        label: "Strategic Plans",
        url: this.sanitizer.bypassSecurityTrustResourceUrl('https://forms.office.com/r/NLfsK7TRw5'),
        action: () => {
          this.setCurrentForm('sp');
        }
      }
    ]

    return forms.filter(form => this.isFormAccessible(form.label));
  }

  isFormAccessible(form: string): boolean {
    const accessibleFormsArray = this.accessibleForms ? this.accessibleForms.split(',').map(form => form.trim()) : [];
    return accessibleFormsArray.includes(form.trim());
  }  

  setCurrentForm(action: string): void {
    this.currentFormAction = action;
  }
}
