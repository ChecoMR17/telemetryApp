import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalData: any | undefined;

  constructor(public dialog: MatDialog) { }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '55%'
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

   cerrarModal(): void {
    this.dialog.closeAll();
  }

  setModalData(data: any): void {
    this.modalData = data;
  }

  getModalData(): any {
    return this.modalData;
  }
}
