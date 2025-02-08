import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrl: './team-modal.component.css'
})
export class TeamModalComponent implements OnInit {

  @Input() modalOpen!:boolean;
  @Output() closeModal = new EventEmitter<void>();

  modalClosed: boolean = false;
  teamList: {name: string, title: string, img: string, imgAvailable: boolean, linkedIn: string }[] = []

  ngOnInit(): void {
    this.teamList = [
      {
        name: 'Ahmet Kapici',
        title: 'Manager of quality improvement and special projects',
        img: 'team/Ahmet.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/ahmetkapici'
      },
      {
        name: 'Kaoutar Fairouzane',
        title: 'Data Analyst',
        img: '',
        imgAvailable: false,
        linkedIn: 'http://www.linkedin.com/in/kaoutar-fairouzane-6a149a37'
      },
      {
        name: 'Michel Hidalgo Delbeau',
        title: 'Project Manager',
        img: 'team/Michel.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/michel-hidalgo-delbeau/'
      },
      {
        name: 'Mariam El Haiba',
        title: 'Project Manager',
        img: 'team/Mariam_ElHaiba.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/mariamelhaiba'
      },
      {
        name: 'Amine Reguieg',
        title: 'Project Manager',
        img: 'team/Amine.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/amine-reguieg'
      },
      {
        name: 'Samia Bouhaddou',
        title: 'Data Engineer',
        img: 'team/Samia.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/samia-bouhaddou-9b7331176'
      },
      {
        name: 'Anastasia Zuikova',
        title: 'Data Scientist',
        img: 'team/Anastasiia.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/anastasiia-zuikova'
      },
      {
        name: 'MD OLI Ahad Khan',
        title: 'UI/UX Designer',
        img: 'team/Ahad.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/ahadkhan082'
      },
      {
        name: 'Sindhura Movva',
        title: 'Full Stack Web Developer',
        img: 'team/Sindhura.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/sindhura-movva-52012b2a8'
      },
      {
        name: 'Elo Idiodi',
        title: 'Full Stack Web Developer',
        img: 'team/Elo.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/elo-idiodi'
      },
      {
        name: 'Anthony Misse',
        title: 'Data Scientist',
        img: 'team/Anthony.jpg',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/anthony-misse-3044a11b1'
      },
      {
        name: 'Danyil Serhiienko',
        title: 'UI/UX Designer',
        img: 'team/Dan.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/danyil-serhiienko/'
      },
      {
        name: 'Ana Ramirez',
        title: 'Project Manager',
        img: 'team/Ana.jpg',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/anaramirezl'
      },
      {
        name: 'Mariam Jeda',
        title: 'UI/UX Designer',
        img: 'team/Mariam.png',
        imgAvailable: true,
        linkedIn: 'https://www.linkedin.com/in/mariam-o-sanni'
      },
      
    ]
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeTeamModal();
    }
  }

  closeTeamModal() {
    this.modalClosed = true;

    setTimeout(() => {
      this.modalClosed = false;
      this.closeModal.emit();
    }, 250)
  }

}
