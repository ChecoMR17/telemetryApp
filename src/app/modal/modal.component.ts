import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  datosDelModal: any;
  constructor(private modal: ModalService) { }
  ngOnInit(): void {
    this.datosDelModal = this.modal.getModalData();
  }
  cerrarM(){
    this.modal.cerrarModal();
  }
}
